import {Component, effect, inject} from '@angular/core';
import {TwoFactorService} from "@baseline/auth/data-access/two-factor.service";
import {UserService} from "@baseline/shared/data-access/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TwoFactorSetupResponse} from "@baseline/auth/model/two-factor.model";
import {toSignal} from "@angular/core/rxjs-interop";
import {catchError, Observable, tap, throwError} from "rxjs";
import {AuthCardComponent} from "@baseline/auth/ui/auth-card/auth-card.component";
import {TranslatePipe} from "@ngx-translate/core";
import {NgForOf, NgIf} from "@angular/common";
import {QrCodeComponent} from "ng-qrcode";
import {InputOtpComponent} from "@baseline/shared/ui/component/input-otp/input-otp.component";
import {FormsModule} from "@angular/forms";
import {CheckboxComponent} from "@baseline/shared/ui/component/checkbox/checkbox.component";
import {ButtonComponent} from "@baseline/shared/ui/component/button/button.component";
import {DividerComponent} from "@baseline/shared/ui/component/divider/divider.component";

@Component({
  selector: 'base-two-factor-setup',
    imports: [
        AuthCardComponent,
        TranslatePipe,
        NgIf,
        QrCodeComponent,
        InputOtpComponent,
        FormsModule,
        NgForOf,
        CheckboxComponent,
        ButtonComponent,
        DividerComponent,
    ],
  templateUrl: './two-factor-setup.component.html',
})
export class TwoFactorSetupComponent {
    private userService = inject(UserService);
    private twoFactorService = inject(TwoFactorService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    private redirectTo: string;

    code: string = '';
    setupLoaded: boolean = false;
    userLoaded = this.userService.userLoaded;
    twoFactorInfo = toSignal(this.setup());

    agreed: boolean = false;

    constructor() {
        this.redirectTo = this.route.snapshot.queryParamMap.get('redirect') || '/';

        effect(() => {
            if (this.userService.userLoaded() && this.userService.user()?.twoFactorEnabled) {
                this.router.navigate([this.redirectTo]).then()
            }
        })
    }

    setup(): Observable<TwoFactorSetupResponse | undefined> {
        this.setupLoaded = false;

        return this.twoFactorService.getTwoFactorInfo().pipe(
            tap(() => this.setupLoaded = true),
            catchError((err) => {
                this.setupLoaded = true;
                return throwError(() => err);
            })
        );
    }
}
