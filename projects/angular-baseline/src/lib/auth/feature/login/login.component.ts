import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserSessionService} from '@baseline/auth/data-access/user-session.service';
import {Router} from '@angular/router';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {InputComponent} from '@baseline/shared/ui/input/input.component';

@Component({
  selector: 'base-login',
    imports: [
        ReactiveFormsModule,
        InputComponent
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

    login(): Observable<boolean> {
        if (!this.form.valid) {
            return of(true)
        }

        this.loading = true;
        return this.userSessionService.login(this.form.value)
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
    }

}

export interface LoginCredentialsForm {
    email: FormControl<string>;
    password: FormControl<string>;
}
