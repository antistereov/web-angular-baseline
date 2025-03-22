import { Component } from '@angular/core';
import {InputComponent} from '@baseline/shared/ui/input/input.component';
import {SelectComponent} from '@baseline/shared/ui/select/select.component';
import {
    ColorSchemeSelectButtonComponent
} from '@baseline/settings/feature/color-scheme-select-button/color-scheme-select-button.component';
import {ButtonComponent} from '@baseline/shared/ui/button/button.component';
import {CardComponent} from '@baseline/shared/ui/card/card.component';

@Component({
  selector: 'base-demo',
    imports: [
        InputComponent,
        SelectComponent,
        ColorSchemeSelectButtonComponent,
        ButtonComponent,
        CardComponent,
    ],
  templateUrl: './demo.component.html'
})
export class DemoComponent {

}
