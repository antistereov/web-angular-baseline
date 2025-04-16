import {Component, computed, effect, inject, Input} from '@angular/core';
import {ButtonComponent} from "@baseline/shared/ui/component/button/button.component";
import {InputComponent} from "@baseline/shared/ui/component/input/input.component";
import {NgIf} from "@angular/common";
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserSettingsService} from "@baseline/settings/data-access/user-settings.service";
import {ChangeEmailRequest} from "@baseline/settings/model/user-security.model";
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {AlertService} from "@baseline/shared/util/alert.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "@baseline/shared/data-access/user.service";
import {AuthRouterService} from "@baseline/auth/util/auth-router.service";
import {TwoFactorStatusResponse} from "@baseline/auth/model/two-factor.model";
import {TwoFactorService} from "@baseline/auth/data-access/two-factor.service";

@Component({
    selector: 'base-change-email',
    imports: [
        ButtonComponent,
        InputComponent,
        NgIf,
        ReactiveFormsModule
    ],
    templateUrl: './change-email.component.html',
})
export class ChangeEmailComponent {
    @Input() path: string = '';

    private fb = inject(NonNullableFormBuilder);
    private userSettingsService = inject(UserSettingsService);
    private alertService = inject(AlertService);
    private userService = inject(UserService);
    private authRouter = inject(AuthRouterService);
    private twoFactorService = inject(TwoFactorService);

    expanded = false;
    form: FormGroup;
    updateLoading = false;
    editLoading = false;

    currentEmail = computed(() => this.userService.user()?.email);

    constructor() {
        this.form = this.fb.group({
            newEmail: this.fb.control<string>('', [Validators.required, Validators.email]),
            password: this.fb.control<string>('', [Validators.required])
        });
        effect(() => this.newEmail.setValue(this.currentEmail()));
        this.newEmail.disable();
    }

    get newEmail() {
        return this.form.controls['newEmail'];
    }

    get password() {
        return this.form.controls['password'];
    }

    private updateStepUpStatus(): Observable<TwoFactorStatusResponse> {
        return this.twoFactorService.getStatus('step-up').pipe(
            tap((res) => {
                if (res.twoFactorRequired) {
                    this.authRouter.verify2fa('step-up', this.path);
                }
            })
        )
    }

    toggle() {
        if (this.expanded) {
            this.expanded = false;
            this.newEmail.disable();
            return;
        }

        this.editLoading = true;
        this.updateStepUpStatus().pipe(
            tap(() => {
                this.newEmail.enable();
                this.editLoading = false;
                this.expanded = true;
            }),
            catchError((err) => {
                this.editLoading = false;
                return throwError(() => err);
            })
        ).subscribe();
    }

    submit() {
        if (this.form.invalid) {
            return;
        }

        this.updateLoading = true;

        const req: ChangeEmailRequest = {
            newEmail: this.newEmail.value,
            password: this.password.value
        }

        this.userSettingsService.changeEmail(req).pipe(
            tap(() => {
                this.updateLoading = false;
                this.password.setValue('');
                this.expanded = false;
                this.alertService.showSuccess('Success!', 'You changed your email');

                this.authRouter.verifyEmail();
            }),
            catchError((err: HttpErrorResponse) => {
                this.updateLoading = false

                if (err.status === 401) {
                    this.updateStepUpStatus();
                    this.password.setErrors({ 'wrong': true });
                    return of();
                }

                if (err.status === 409) {
                    this.newEmail.setErrors({ 'exists': true });
                    return of();
                }

                return throwError(() => err);
            })
        ).subscribe()
    }

    emailChange(event: any) {
        if (event.value === this.currentEmail()) {
            this.newEmail.setErrors({'same': true })
            return;
        }

        const errors = this.newEmail.errors;
        if (errors) {
            delete errors['same'];
            this.newEmail.setErrors(Object.keys(errors).length ? errors : null);
        }
    }
}
