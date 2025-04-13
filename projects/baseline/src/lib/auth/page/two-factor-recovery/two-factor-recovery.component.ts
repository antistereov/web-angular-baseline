import {Component, inject, OnInit} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {TwoFactorService} from "@baseline/auth/data-access/two-factor.service";
import {catchError, of, tap, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {BASELINE_CONFIG} from "@baseline/core/config/base.config";
import {AuthCardComponent} from "@baseline/auth/ui/auth-card/auth-card.component";
import {InputComponent} from "@baseline/shared/ui/component/input/input.component";
import {ButtonComponent} from "@baseline/shared/ui/component/button/button.component";

@Component({
    selector: 'base-two-factor-recovery',
    imports: [
        AuthCardComponent,
        InputComponent,
        ReactiveFormsModule,
        ButtonComponent
    ],
    templateUrl: './two-factor-recovery.component.html',
})
export class TwoFactorRecoveryComponent implements OnInit {
    private fb = inject(NonNullableFormBuilder);
    private twoFactorService = inject(TwoFactorService);
    private router = inject(Router);
    private config = inject(BASELINE_CONFIG);
    private redirect = this.config.auth.redirect.login;
    private route = inject(ActivatedRoute);

    form: FormGroup;
    loading = false;
    context: 'step-up' | 'login' = 'login';

    constructor() {
        this.form = this.fb.group({
            recoveryCode: this.fb.control('', [Validators.required])
        });
    }

    ngOnInit() {
        this.context = this.route.snapshot.queryParamMap.get('context') as 'step-up' | 'login' || 'login';
    }

    get recoveryCode() {
        return this.form.controls['recoveryCode'];
    }

    recover() {
        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        this.twoFactorService.recover(this.recoveryCode.value, this.context).pipe(
            tap(() => {
                this.loading = false;
                this.router.navigate([this.redirect]).then()
            }),
            catchError((err: HttpErrorResponse) => {
                this.loading = false;

                if (err.status === 401) {
                    this.form.setErrors({'wrongCode': true});
                    return of();
                }

                return throwError(() => err);
            })
        ).subscribe()
    }

    exit() {
        this.router.navigate([this.redirect]).then();
    }
}
