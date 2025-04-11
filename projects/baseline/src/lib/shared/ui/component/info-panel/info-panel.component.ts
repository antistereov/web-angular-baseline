import {Component, inject, Input} from '@angular/core';
import {ButtonComponent} from "@baseline/shared/ui/component/button/button.component";
import {NgIf} from "@angular/common";
import {Clipboard} from "@angular/cdk/clipboard";

@Component({
  selector: 'base-info-panel',
    imports: [
        ButtonComponent,
        NgIf
    ],
  templateUrl: './info-panel.component.html'
})
export class InfoPanelComponent {
    @Input() copyEnabled: boolean = false;
    @Input() copyText: string = '';
    @Input() copiedTimeout: number = 2000;

    hover: boolean = false;
    copied: boolean = false;

    private clipboard = inject(Clipboard)

    copyContent() {
        this.copied = this.clipboard.copy(this.copyText);

        setTimeout(() => {
            this.copied = false;
        }, this.copiedTimeout)
    }
}
