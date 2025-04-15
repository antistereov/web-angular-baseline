import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthRouterService {
    private router = inject(Router);

    login() {
        this.router.navigate(['/auth/login']).then();
    }

    register() {
        this.router.navigate(['/auth/register']).then();
    }

    verify2fa(context: 'step-up' | 'login', redirect: string) {
        this.router.navigate(['/auth/2fa/verify'], { queryParams: { context: context, redirect: redirect }}).then();
    }

    verifyEmail() {
        this.router.navigate(['/auth/verify-email']).then();
    }

    recover2fa() {
        this.router.navigate(['/auth/2fa/recovery']).then();
    }

    setup2fa(redirect: string) {
        this.router.navigate(['/auth/2fa/setup'], { queryParams: { redirect: redirect } }).then();
    }


}
