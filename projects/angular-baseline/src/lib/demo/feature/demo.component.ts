import { Component } from '@angular/core';
import {InputComponent} from '@baseline/shared/ui/input/input.component';
import {SelectorComponent} from '@baseline/shared/ui/selector/selector.component';

@Component({
  selector: 'base-demo',
    imports: [
        InputComponent,
        SelectorComponent
    ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {

}
