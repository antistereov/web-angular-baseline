import { Component } from '@angular/core';
import {InputComponent} from '@baseline/shared/ui/input/input.component';
import {SelectComponent} from '@baseline/shared/ui/select/select.component';

@Component({
  selector: 'base-demo',
    imports: [
        InputComponent,
        SelectComponent
    ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {

}
