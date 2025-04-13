import {Component, computed, inject, OnInit} from '@angular/core';
import {UserService} from "@baseline/shared/data-access/user.service";
import {NgIf} from "@angular/common";
import {TwoFactorService} from "@baseline/auth/data-access/two-factor.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CardComponent} from "@baseline/shared/ui/component/card/card.component";
import {ButtonComponent} from "@baseline/shared/ui/component/button/button.component";
import {tap} from "rxjs";
import {InputComponent} from "@baseline/shared/ui/component/input/input.component";
import {DividerComponent} from "@baseline/shared/ui/component/divider/divider.component";
import {FormsModule} from "@angular/forms";
import {AvatarComponent} from "@baseline/shared/ui/component/avatar/avatar.component";
import {FileUploadComponent} from "@baseline/shared/ui/component/file-upload/file-upload.component";
import {FileUploadHandlerEvent} from "primeng/fileupload";
import {UserSettingsService} from "@baseline/settings/data-access/user-settings.service";
import {AvatarSettingsComponent} from "@baseline/settings/feature/avatar-settings/avatar-settings.component";

@Component({
  selector: 'base-user-settings-card',
    imports: [
        NgIf,
        CardComponent,
        ButtonComponent,
        InputComponent,
        FormsModule,
        AvatarComponent,
        FileUploadComponent,
        AvatarSettingsComponent
    ],
  templateUrl: './user-settings-card.component.html'
})
export class UserSettingsCard implements OnInit {
    private userService = inject(UserService);
    private twoFactorService = inject(TwoFactorService);
    private userSettingsService = inject(UserSettingsService);
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

    disableTwoFactor() {
        this.twoFactorService.disable().subscribe();
    }

    setupTwoFactor() {
        this.router.navigate(['auth/2fa/setup']).then();
    }

}
