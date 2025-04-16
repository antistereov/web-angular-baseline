import {Component, computed, inject, Input, OnInit} from '@angular/core';
import {UserService} from "@baseline/shared/data-access/user.service";
import {TwoFactorService} from "@baseline/auth/data-access/two-factor.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CardComponent} from "@baseline/shared/ui/component/card/card.component";
import {tap} from "rxjs";
import {FormsModule} from "@angular/forms";
import {AvatarSettingsComponent} from "@baseline/settings/feature/avatar-settings/avatar-settings.component";
import {TwoFactorSettingsComponent} from "@baseline/settings/feature/two-factor-settings/two-factor-settings.component";
import {ChangePasswordComponent} from "@baseline/settings/feature/change-password/change-password.component";
import {ChangeEmailComponent} from "@baseline/settings/feature/change-email/change-email.component";
import {DividerComponent} from "@baseline/shared/ui/component/divider/divider.component";

@Component({
  selector: 'base-user-settings-card',
    imports: [
        CardComponent,
        FormsModule,
        AvatarSettingsComponent,
        TwoFactorSettingsComponent,
        ChangePasswordComponent,
        ChangeEmailComponent,
        DividerComponent
    ],
  templateUrl: './user-settings-card.component.html'
})
export class UserSettingsCard implements OnInit {
    @Input() class?: string;
    @Input() path: string = '/me';

    private userService = inject(UserService);
    private twoFactorService = inject(TwoFactorService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    changeEnabled = false;
    statusLoading = false;
    expandedSetting?: 'password' | 'email' | '2fa';

    user = this.userService.user
    avatar = this.userService.avatar;

    twoFactorEnabled = computed(() => {
        return this.user()?.twoFactorAuthEnabled === true;
    })

    constructor() {
        this.twoFactorService.getStatus('step-up').subscribe();
    }

    ngOnInit() {
        const stepUp = this.route.snapshot.queryParamMap.get('step-up');

        if (stepUp) {
            this.changeEnabled = true;
        }
    }

    toggleChange() {
        if (this.changeEnabled) {
            this.changeEnabled = false;

            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: {},
                queryParamsHandling: 'replace'
            }).then()
            return;
        }

        this.statusLoading = true;

        this.twoFactorService.getStatus('step-up').pipe(
            tap(res => {

                if (res.twoFactorRequired) {
                    this.router.navigate(['/auth/2fa/verify'], {queryParams: {
                            context: 'step-up', redirect: '/me'
                        }}).then();
                    this.statusLoading = false;
                    return;
                }

                this.statusLoading = false;
                this.changeEnabled = true;
            })
        ).subscribe()
    }

    setupTwoFactor() {
        this.router.navigate(['auth/2fa/setup']).then();
    }

}
