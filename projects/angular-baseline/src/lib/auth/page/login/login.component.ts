import {Component, effect, inject} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '@baseline/auth/data-access/auth.service';
import {Router} from '@angular/router';
import {catchError, of, switchMap} from 'rxjs';
import {InputComponent} from '@baseline/shared/ui/input/input.component';
import {ButtonComponent} from '@baseline/shared/ui/button/button.component';
import {NgIf} from '@angular/common';
import {AuthCardComponent} from '@baseline/auth/ui/auth-card/auth-card.component';
import {BASELINE_CONFIG} from '@baseline/core/config/base.config';
import {SkeletonComponent} from '@baseline/shared/ui/skeleton/skeleton.component';
import {UserService} from '@baseline/shared/data-access/user.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'base-login',
    imports: [
        ReactiveFormsModule,
        InputComponent,
        ButtonComponent,
        NgIf,
        AuthCardComponent,
        SkeletonComponent,
        TranslatePipe
    ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
    private fb = inject(NonNullableFormBuilder);
    private authService = inject(AuthService);
    private userService = inject(UserService);
    private router = inject(Router);
    private appConfig = inject(BASELINE_CONFIG);

    userLoaded = this.userService.userLoaded;
    user = this.userService.user;

    form: FormGroup;
    loading: boolean = false;

    constructor() {
        effect(() => {
            if (this.user()) {
                this.router.navigate([this.appConfig.auth.redirect.login]).then();
            }
        })

        this.form = this.fb.group<LoginCredentialsForm>({
            email: this.fb.control('', [Validators.required, Validators.email]),
            password: this.fb.control('', [Validators.required])
        })
    }

    get email() {
        return this.form.controls['email'];
    }

    get password() {
        return this.form.controls['password'];
    }

    get invalidAndTouched() {
        return (this.password.invalid && this.password.touched) || (this.email.invalid && this.email.touched);
    }

    login() {
        if (!this.form.valid) {
            return;
        }

        this.loading = true;
        this.authService.login(this.form.value)
            .pipe(
                switchMap(() => {
                    this.router.navigate([this.appConfig.auth.redirect.login]).then();
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
