import {Component, inject} from '@angular/core';
import {TwoFactorService} from "@baseline/auth/data-access/two-factor.service";
import {UserSettingsCard} from "@baseline/settings/feature/user-settings-card/user-settings-card.component";

@Component({
  selector: 'app-me',
    imports: [
        UserSettingsCard
    ],
  templateUrl: './me.component.html'
})
export class MeComponent {
    private twoFactorService = inject(TwoFactorService);
}
