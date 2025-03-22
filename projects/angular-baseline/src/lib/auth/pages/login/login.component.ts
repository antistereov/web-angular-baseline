import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserSessionService} from '@baseline/auth/data-access/user-session.service';
import {Router} from '@angular/router';
import {catchError, of, switchMap} from 'rxjs';
import {InputComponent} from '@baseline/shared/ui/input/input.component';
import {CardComponent} from '@baseline/shared/ui/card/card.component';
import {ButtonComponent} from '@baseline/shared/ui/button/button.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'base-login',
    imports: [
        ReactiveFormsModule,
        InputComponent,
        CardComponent,
        ButtonComponent,
        NgIf
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    private fb = inject(NonNullableFormBuilder);
    private userSessionService = inject(UserSessionService);
    private router = inject(Router);

    form: FormGroup;
    loading: boolean = false;

    constructor() {
        this.form = this.fb.group<LoginCredentialsForm>({
            email: this.fb.control('', [Validators.required, Validators.email]),
            password: this.fb.control('', [Validators.required])
        })
    }

    login() {
        if (!this.form.valid) {
            return;
        }

        this.loading = true;
        this.userSessionService.login(this.form.value)
            .pipe(
                switchMap(() => {
                    this.router.navigate(['/']).then();
                    return of(true);
                }),
                catchError(() => {
                    this.form.setErrors({'invalid': true});
                    this.loading = false;
                    return of(false)
                })
            )
            .subscribe()
    }

}

export interface LoginCredentialsForm {
    email: FormControl<string>;
    password: FormControl<string>;
}
