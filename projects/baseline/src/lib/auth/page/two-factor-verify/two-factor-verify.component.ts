import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule,} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TwoFactorService} from "@baseline/auth/data-access/two-factor.service";
import {catchError, tap, throwError} from "rxjs";
import {AuthCardComponent} from "@baseline/auth/ui/auth-card/auth-card.component";
import {TranslatePipe} from "@ngx-translate/core";
import {ButtonComponent} from "@baseline/shared/ui/component/button/button.component";
import {InputOtpComponent} from "@baseline/shared/ui/component/input-otp/input-otp.component";
import {UserService} from "@baseline/shared/data-access/user.service";

@Component({
    selector: 'base-two-factor',
    imports: [
        AuthCardComponent,
        TranslatePipe,
        ReactiveFormsModule,
        ButtonComponent,
        InputOtpComponent,
        FormsModule,
    ],
    templateUrl: './two-factor-verify.component.html',
})
export class TwoFactorVerifyComponent {
    context: 'login' | 'step-up' = 'login';
    redirectTo: string = '/';
    code: string = '';
    loading: boolean = false;
    isValid: boolean = false;

    private route = inject(ActivatedRoute);
    private router = inject(Router)
    private twoFactorService = inject(TwoFactorService);
    private userService = inject(UserService);

    userLoaded = this.userService.userLoaded;

    constructor() {
        this.redirectTo = this.route.snapshot.queryParamMap.get('redirect') || '/';
        this.context = this.route.snapshot.queryParamMap.get('context') as 'login' | 'step-up';

        if (this.context === 'login') {
            this.twoFactorService.getStatus(this.context).pipe(
                tap((res) => {
                    if (!res.twoFactorRequired) {
                        this.router.navigate(['auth/login']).then()
                    }
                })
            ).subscribe();
        }

        if (this.context === 'step-up') {
            this.twoFactorService.getStatus('step-up').pipe(
                tap((res) => {
                    if (!res.twoFactorRequired) {
                        this.router.navigate([this.redirectTo], { queryParams: { 'step-up': 'true' } }).then();
                    }
                })
            ).subscribe();
        }
    }

    onChange() {
        if (this.code?.length === 6) {
            this.isValid = true;
            this.submit();
        }
    }

    submit() {
        if (!this.isValid || !this.code) {
            return;
        }

        this.loading = true;

        this.twoFactorService.verify(parseInt(this.code), this.context).pipe(
            tap(() => {
                this.router.navigate([this.redirectTo], { queryParams: { 'step-up': true } }).then();
                this.loading = false;
            }),
            catchError((err) => {
                this.loading = false;
                return throwError(() => err)
            })
        ).subscribe();
    }

    recover() {
        this.router.navigate(['/auth/2fa/recovery'], { queryParams: { 'context': this.context }}).then()
    }
}
