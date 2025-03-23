import {Component, effect, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '@baseline/shared/data-access/user.service';
import {BASELINE_CONFIG} from '@baseline/core/config/base.config';
import {catchError, of, tap} from 'rxjs';
import {MailVerificationService} from '@baseline/auth/data-access/mail-verification.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthCardComponent} from '@baseline/auth/ui/auth-card/auth-card.component';
import {ButtonComponent} from '@baseline/shared/ui/button/button.component';
import {NgIf} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'base-verify-email',
    imports: [
        AuthCardComponent,
        ButtonComponent,
        NgIf,
    ],
  templateUrl: './verify-email.component.html'
})
export class VerifyEmailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private userService = inject(UserService);
    private mailVerificationService = inject(MailVerificationService);
    private baselineConfig = inject(BASELINE_CONFIG);

    user = this.userService.user;
    userLoaded = this.userService.userLoaded;

    resendLoading: boolean = false;
    cooldownActive: boolean = false;
    cooldownRemaining: number = 0;

    constructor() {
        effect(() => {
            if (this.user()?.emailVerified) {
                this.router.navigate([this.baselineConfig.auth.redirect.verifyMail]).then()
            }
        })

    }

    ngOnInit() {
        this.verifyEmail();
    }

    get verifyEmail() {
        return toSignal(this.route.queryParams.pipe(
            tap(params => {
                const token = params['token'];

                if (token) {
                    toSignal(this.mailVerificationService.verifyEmail(token).pipe(
                        tap(() => this.router.navigate(['/']).then())
                    ));
                }
            })
        ));
    }

    resend() {
        this.resendLoading = true;
        toSignal(this.mailVerificationService.resendVerificationEmail().pipe(
            tap(() => {
                this.resendLoading = false;
                this.remainingCooldown();
            }),
            catchError((err: HttpErrorResponse) => {
                if (err.status === 429) {
                    this.remainingCooldown();
                }
                return of();
            })
        ));
    }

    private get remainingCooldown() {
        return toSignal(this.mailVerificationService.getRemainingCooldown().pipe(
            tap(remaining => {
                if (remaining > 0) {
                    this.setCooldown(remaining);
                }
            })
        ))
    }

    private setCooldown(seconds: number) {
        this.cooldownActive = true;
        this.cooldownRemaining = seconds;

        const interval = setInterval(() => {
            this.cooldownRemaining--;
            if (this.cooldownRemaining <= 0) {
                clearInterval(interval);
                this.cooldownActive = false;
            }
        }, 1000)
    }

    deleteUserAndNavigateToLogin() {

    }

}
