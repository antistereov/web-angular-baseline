import {Component, inject, Input} from '@angular/core';
import {ButtonComponent} from "@baseline/shared/ui/component/button/button.component";
import {DividerComponent} from "@baseline/shared/ui/component/divider/divider.component";
import {InputComponent} from "@baseline/shared/ui/component/input/input.component";
import {NgIf} from "@angular/common";
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserSettingsService} from "@baseline/settings/data-access/user-settings.service";
import {ChangePasswordRequest} from "@baseline/settings/model/user-security.model";
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "@baseline/shared/util/alert.service";
import {TwoFactorStatusResponse} from "@baseline/auth/model/two-factor.model";
import {TwoFactorService} from "@baseline/auth/data-access/two-factor.service";
import {AuthRouterService} from "@baseline/auth/util/auth-router.service";

@Component({
    selector: 'base-change-password',
    imports: [
        ButtonComponent,
        DividerComponent,
        InputComponent,
        NgIf,
        ReactiveFormsModule
    ],
    templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
    @Input() path: string = '';

    private fb = inject(NonNullableFormBuilder);
    private userSettingsService = inject(UserSettingsService);
    private alertService = inject(AlertService);
    private twoFactorService = inject(TwoFactorService);
    private authRouter = inject(AuthRouterService);

    form: FormGroup;
    expanded = false;
    editLoading = false;
    updateLoading = false;

    constructor() {
        this.form = this.fb.group({
            oldPassword: this.fb.control<string>('', [Validators.required]),
            newPassword: this.fb.control<string>('', [Validators.required, Validators.min(8)])
        });
    }

    get oldPassword() {
        return this.form.controls['oldPassword'];
    }

    get newPassword() {
        return this.form.controls['newPassword'];
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
            return;
        }

        this.editLoading = true;
        this.updateStepUpStatus().pipe(
            tap(() => {
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

        const req: ChangePasswordRequest = {
            oldPassword: this.oldPassword.value,
            newPassword: this.newPassword.value
        }

        this.userSettingsService.changePassword(req).pipe(
            tap(() => {
                this.updateLoading = false;
                this.oldPassword.setValue('');
                this.newPassword.setValue('');
                this.expanded = false;

                this.alertService.showSuccess('Success!', 'Password changed');
            }),
            catchError((err: HttpErrorResponse) => {
                this.updateLoading = false;
                if (err.status === 401) {
                    this.updateStepUpStatus();
                    this.oldPassword.setErrors({ 'wrong': true });
                    return of()
                }

                return throwError(() => err);
            })
        ).subscribe()
    }
}
