import {Component, inject, OnInit} from '@angular/core';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TwoFactorService} from "@baseline/auth/data-access/two-factor.service";
import {catchError, tap, throwError} from "rxjs";
import {AuthCardComponent} from "@baseline/auth/ui/auth-card/auth-card.component";
import {TranslatePipe} from "@ngx-translate/core";
import {ButtonComponent} from "@baseline/shared/ui/component/button/button.component";
import {InputOtpComponent} from "@baseline/shared/ui/component/input-otp/input-otp.component";

@Component({
    selector: 'base-two-factor',
    imports: [
        AuthCardComponent,
        TranslatePipe,
        ReactiveFormsModule,
        ButtonComponent,
        InputOtpComponent,
        FormsModule
    ],
    templateUrl: './two-factor.component.html',
})
export class TwoFactorComponent implements OnInit {
    context: 'login' | 'step-up' = 'login';
    redirectTo: string = '/';
    code: string = '';
    loading: boolean = false;
    isValid: boolean = false;

    private route = inject(ActivatedRoute);
    private router = inject(Router)
    private twoFactorService = inject(TwoFactorService);

    constructor() {
        this.redirectTo = this.route.snapshot.queryParamMap.get('redirect') || '/';
    }

    ngOnInit() {
        this.context = this.route.snapshot.paramMap.get('context') as 'login' | 'step-up';
    }

    onChange(event: any) {
        console.log(event.value.length);
        console.log(this.code);
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
                this.router.navigate([this.redirectTo]).then();
                this.loading = false;
            }),
            catchError((err) => {
                this.loading = false;
                return throwError(() => err)
            })
        ).subscribe();
    }
}

export interface TwoFactorForm {
    code: FormControl<string>;
}
