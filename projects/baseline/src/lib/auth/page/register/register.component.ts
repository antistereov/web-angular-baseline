import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '@baseline/shared/data-access/user.service';
import {BASELINE_CONFIG} from '@baseline/core/config/base.config';
import {catchError, of, switchMap} from 'rxjs';
import {ButtonComponent} from '@baseline/shared/ui/component/button/button.component';
import {InputComponent} from '@baseline/shared/ui/component/input/input.component';
import {NgIf} from '@angular/common';
import {AuthCardComponent} from '@baseline/auth/ui/auth-card/auth-card.component';
import {TranslatePipe} from '@ngx-translate/core';
import {AuthRouterService} from "@baseline/auth/util/auth-router.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'base-register',
    imports: [
        ButtonComponent,
        InputComponent,
        NgIf,
        ReactiveFormsModule,
        AuthCardComponent,
        TranslatePipe
    ],
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    private fb = inject(NonNullableFormBuilder);
    private userService = inject(UserService);
    private authRouter = inject(AuthRouterService);
    private appConfig = inject(BASELINE_CONFIG);

    form: FormGroup;
    loading: boolean = false;
    requireName = this.appConfig.auth.requireName;

    constructor() {
        this.form = this.fb.group<RegisterForm>({
            email: this.fb.control('', [Validators.required, Validators.email]),
            password: this.fb.control('', [Validators.required, Validators.min(8)]),
            name: this.fb.control('', this.requireName ? [Validators.required] : [])
        });
    }

    get email() {
        return this.form.controls['email'];
    }

    get password() {
        return this.form.controls['password'];
    }

    get nameOfUser() {
        return this.form.controls['name'];
    }

    get invalidAndTouched() {
        const emailAndPasswordInvalid = (this.password.invalid && this.password.touched) || (this.email.invalid && this.email.touched);

        if (this.requireName) {
            return emailAndPasswordInvalid || (this.nameOfUser.invalid && this.nameOfUser.touched);
        }

        return emailAndPasswordInvalid;
    }

    register() {
        if (!this.form.valid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.form.value)
            .pipe(
                switchMap(() => {
                    this.authRouter.verifyEmail();
                    return of(true);
                }),
                catchError((err: HttpErrorResponse) => {
                    if (err.status === 409) {
                        this.email.setErrors({'exists': true})
                    }
                    this.form.setErrors({'invalid': true});
                    this.loading = false;
                    return of(false)
                })
            )
            .subscribe()
    }
}

export interface RegisterForm {
    email: FormControl<string>;
    password: FormControl<string>;
    name?: FormControl<string>;
}
