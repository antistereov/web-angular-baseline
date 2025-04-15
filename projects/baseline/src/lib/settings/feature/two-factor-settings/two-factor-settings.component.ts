import {Component, computed, inject, Input} from '@angular/core';
import {ButtonComponent} from "@baseline/shared/ui/component/button/button.component";
import {TagComponent} from "@baseline/shared/ui/component/tag/tag.component";
import {TwoFactorService} from "@baseline/auth/data-access/two-factor.service";
import {UserService} from "@baseline/shared/data-access/user.service";
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {AuthRouterService} from "@baseline/auth/util/auth-router.service";
import {NgIf} from "@angular/common";
import {InputComponent} from "@baseline/shared/ui/component/input/input.component";
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {TwoFactorStatusResponse} from "@baseline/auth/model/two-factor.model";
import {DividerComponent} from "@baseline/shared/ui/component/divider/divider.component";

@Component({
  selector: 'base-two-factor-settings',
    imports: [
        ButtonComponent,
        TagComponent,
        InputComponent,
        ReactiveFormsModule,
        NgIf,
        DividerComponent
    ],
  templateUrl: './two-factor-settings.component.html',
})
export class TwoFactorSettingsComponent {
    @Input() path: string = '';
    @Input() expanded = false;

    private twoFactorService = inject(TwoFactorService);
    private userService = inject(UserService);
    private router = inject(Router);
    private authRouter = inject(AuthRouterService);

    private fb = inject(NonNullableFormBuilder);
    form : FormGroup;
    updateLoading = false;
    editLoading = false

    constructor() {
        this.form = this.fb.group({
            currentPassword: this.fb.control<string>('', [Validators.required]),
        })
    }

    get password() {
        return this.form.controls['currentPassword'];
    }

    twoFactorEnabled = computed(() => this.userService.user()?.twoFactorAuthEnabled)

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
                this.expanded = true;
                this.editLoading = false;
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

        if (this.twoFactorEnabled()) {
            this.disable();
        } else {
            this.enable();
        }
    }

    private disable() {
        this.twoFactorService.disable({ password: this.password.value }).pipe(
            tap(() => {
                this.updateLoading = false;
                this.expanded = false;
                this.password.setValue('');
            }),
            catchError((err: HttpErrorResponse) => {
                this.updateLoading = false;

                if (err.status === 401) {
                    this.updateStepUpStatus();
                    this.password.setErrors({ 'wrong': true });
                    return of();
                }

                return throwError(() => err);
            })
        ).subscribe()
    }

    private enable() {
        this.authRouter.setup2fa(this.path);
    }
}
