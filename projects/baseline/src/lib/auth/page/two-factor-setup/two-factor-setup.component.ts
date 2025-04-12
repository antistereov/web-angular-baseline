import {Component, effect, inject} from '@angular/core';
import {TwoFactorService} from "@baseline/auth/data-access/two-factor.service";
import {UserService} from "@baseline/shared/data-access/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TwoFactorSetupResponse} from "@baseline/auth/model/two-factor.model";
import {toSignal} from "@angular/core/rxjs-interop";
import {catchError, Observable, of, switchMap, tap, throwError} from "rxjs";
import {AuthCardComponent} from "@baseline/auth/ui/auth-card/auth-card.component";
import {TranslatePipe} from "@ngx-translate/core";
import {NgForOf, NgIf} from "@angular/common";
import {QrCodeComponent} from "ng-qrcode";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CheckboxComponent} from "@baseline/shared/ui/component/checkbox/checkbox.component";
import {ButtonComponent} from "@baseline/shared/ui/component/button/button.component";
import {InfoPanelComponent} from "@baseline/shared/ui/component/info-panel/info-panel.component";
import {HttpErrorResponse} from "@angular/common/http";
import {InputComponent} from "@baseline/shared/ui/component/input/input.component";

@Component({
  selector: 'base-two-factor-setup',
    imports: [
        AuthCardComponent,
        TranslatePipe,
        NgIf,
        QrCodeComponent,
        FormsModule,
        NgForOf,
        CheckboxComponent,
        ButtonComponent,
        InfoPanelComponent,
        ReactiveFormsModule,
        InputComponent,
    ],
  templateUrl: './two-factor-setup.component.html',
})
export class TwoFactorSetupComponent {
    private userService = inject(UserService);
    private twoFactorService = inject(TwoFactorService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    private readonly redirectTo: string;

    code: string = '';
    wrongCode = false;
    codeInvalid = true;
    step: 'setup' | 'recover' | 'verify' = 'setup';

    infoLoaded: boolean = false;
    loading: boolean = false;
    userLoaded = this.userService.userLoaded;
    twoFactorInfo = toSignal(this.getInfo());

    agreed: boolean = false;

    constructor() {
        this.redirectTo = this.route.snapshot.queryParamMap.get('redirect') || '/';

        effect(() => {
            if (this.userService.userLoaded() && this.userService.user()?.twoFactorAuthEnabled) {
                this.router.navigate([this.redirectTo]).then()
            }
        })
    }

    getInfo(): Observable<TwoFactorSetupResponse | undefined> {
        this.infoLoaded = false;

        return this.twoFactorService.getTwoFactorInfo().pipe(
            tap(() => this.infoLoaded = true),
            catchError((err) => {
                this.infoLoaded = true;
                return throwError(() => err);
            })
        );
    }

    onCodeChange() {
        if (this.code?.length === 6) {
            this.codeInvalid = false;
            this.submit();
        }
    }

    submit() {
        const token = this.twoFactorInfo()?.token!!

        this.wrongCode = false;
        this.loading = true;

        this.twoFactorService.setup(parseInt(this.code), token).pipe(
            switchMap(() => {
                this.loading = false;
                this.userService.setUser(undefined);
                this.router.navigate(['']).then();
                return of(true);
            }),
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    this.wrongCode = true;
                    this.loading = false;
                    return of(false);
                }

                return throwError(() => err);
            })
        ).subscribe()
    }

    next() {
        if (this.step === 'setup') {
            this.step = 'recover';
            return;
        }

        if (this.step === 'recover') {
            this.step = 'verify';
            return;
        }
    }

    back() {
        if (this.step === 'recover') {
            this.step = 'setup';
            return;
        }

        if (this.step === 'verify') {
            this.step = 'recover';
            return;
        }
    }
}
