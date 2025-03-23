import { Component } from '@angular/core';
import {InputComponent} from '@baseline/shared/ui/input/input.component';
import {SelectComponent} from '@baseline/shared/ui/select/select.component';
import {
    ColorSchemeSelectButtonComponent
} from '@baseline/settings/feature/color-scheme-select-button/color-scheme-select-button.component';
import {ButtonComponent} from '@baseline/shared/ui/button/button.component';
import {CardComponent} from '@baseline/shared/ui/card/card.component';
import {LanguageSelectComponent} from '@baseline/settings/feature/language-select/language-select.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'base-demo',
    imports: [
        InputComponent,
        SelectComponent,
        ColorSchemeSelectButtonComponent,
        ButtonComponent,
        CardComponent,
        LanguageSelectComponent,
        TranslatePipe,
    ],
  templateUrl: './demo.component.html'
})
export class DemoComponent {

}
