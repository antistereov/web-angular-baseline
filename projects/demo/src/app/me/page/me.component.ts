import {Component, inject} from '@angular/core';
import {TwoFactorService} from "@baseline/auth/data-access/two-factor.service";
import {
    AdvancedUserSettingsComponent
} from "@baseline/settings/feature/advanced-user-settings/advanced-user-settings.component";

@Component({
  selector: 'app-me',
    imports: [
        AdvancedUserSettingsComponent
    ],
  templateUrl: './me.component.html'
})
export class MeComponent {
    private twoFactorService = inject(TwoFactorService);

    disable2fa() {
        this.twoFactorService.disable();
    }
}
