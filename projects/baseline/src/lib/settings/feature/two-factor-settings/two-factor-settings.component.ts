import { Component } from '@angular/core';
import {ButtonComponent} from "@baseline/shared/ui/component/button/button.component";
import {TagComponent} from "@baseline/shared/ui/component/tag/tag.component";

@Component({
  selector: 'base-two-factor-settings',
    imports: [
        ButtonComponent,
        TagComponent
    ],
  templateUrl: './two-factor-settings.component.html',
})
export class TwoFactorSettingsComponent {

}
