import {Component, inject} from '@angular/core';
import {TwoFactorService} from "@baseline/auth/data-access/two-factor.service";
import {
    UserSecuritySettings
} from "@baseline/settings/feature/advanced-user-settings/user-security-settings.component";

@Component({
  selector: 'app-me',
    imports: [
        UserSecuritySettings
    ],
  templateUrl: './me.component.html'
})
export class MeComponent {
    private twoFactorService = inject(TwoFactorService);

    disable2fa() {
        this.twoFactorService.disable();
    }
}
