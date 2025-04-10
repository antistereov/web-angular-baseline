import {Component, Input} from '@angular/core';
import {Panel} from "primeng/panel";

@Component({
  selector: 'base-panel',
    imports: [
        Panel
    ],
  templateUrl: './panel.component.html',
})
export class PanelComponent {
    @Input() header?: string;
}
