import {Component, effect, inject} from '@angular/core';
import {ButtonComponent} from "@baseline/shared/ui/component/button/button.component";
import {InputComponent} from "@baseline/shared/ui/component/input/input.component";
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserSettingsService} from "@baseline/settings/data-access/user-settings.service";
import {UserService} from "@baseline/shared/data-access/user.service";
import {ChangeUserRequest} from "@baseline/settings/model/user-security.model";
import {tap} from "rxjs";

@Component({
  selector: 'base-generic-user-settings',
    imports: [
        ButtonComponent,
        InputComponent,
        ReactiveFormsModule
    ],
  templateUrl: './generic-user-settings.component.html'
})
export class GenericUserSettingsComponent {
    private fb = inject(NonNullableFormBuilder);
    private userSettingsService = inject(UserSettingsService);
    private userService = inject(UserService);

    form: FormGroup;
    updateLoading = false;

    constructor() {
        this.form = this.fb.group({
            name: this.fb.control<string>('', [Validators.required])
        })

        effect(() => this.name.setValue(this.userService.user()?.name))
    }

    get name() {
        return this.form.controls['name'];
    }

    submit() {
        if (this.form.invalid) {
            return;
        }

        this.updateLoading = true;

        const req: ChangeUserRequest = { name: this.name.value }
        this.userSettingsService.changeUser(req).pipe(
            tap(() => this.updateLoading = false)
        ).subscribe()
    }


}
