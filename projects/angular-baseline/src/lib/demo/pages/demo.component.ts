import { Component } from '@angular/core';
import {InputComponent} from '@baseline/shared/ui/input/input.component';
import {SelectComponent} from '@baseline/shared/ui/select/select.component';
import {
    ColorSchemeSelectButtonComponent
} from '@baseline/settings/feature/color-scheme-select-button/color-scheme-select-button.component';

@Component({
  selector: 'base-demo',
    imports: [
        InputComponent,
        SelectComponent,
        ColorSchemeSelectButtonComponent
    ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {

}
