import {Component, effect, inject} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '@baseline/shared/data-access/user.service';
import {Router} from '@angular/router';
import {catchError, of, switchMap, tap} from 'rxjs';
import {InputComponent} from '@baseline/shared/ui/component/input/input.component';
import {ButtonComponent} from '@baseline/shared/ui/component/button/button.component';
import {NgIf} from '@angular/common';
import {AuthCardComponent} from '@baseline/auth/ui/auth-card/auth-card.component';
import {BASELINE_CONFIG} from '@baseline/core/config/base.config';
import {TranslatePipe} from '@ngx-translate/core';
import {SkeletonComponent} from "@baseline/shared/ui/component/skeleton/skeleton.component";

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
    private userService = inject(UserService);
    private router = inject(Router);
    private appConfig = inject(BASELINE_CONFIG);

    userLoaded = this.userService.userLoaded;
    user = this.userService.user;
    loggedIn = this.userService.loggedIn;

    form: FormGroup;
    loading: boolean = false;

    constructor() {
        effect(() => {
            if (this.loggedIn()) {
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

        this.userService.login(this.form.value).pipe(
            tap(() => {
                this.loading = false;
            }),
            catchError(() => {
                this.form.setErrors({'invalid': true});
                this.loading = false;
                return of(false)
            })
        ).subscribe()
    }
}

export interface LoginCredentialsForm {
    email: FormControl<string>;
    password: FormControl<string>;
}
