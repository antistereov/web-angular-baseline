import {Component, Input} from '@angular/core';
import {Tag} from "primeng/tag";

@Component({
    selector: 'base-tag',
    imports: [
        Tag
    ],
    templateUrl: './tag.component.html',
})
export class TagComponent {
    @Input() class?: string;
    @Input() severity?: 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast';
    @Input() value?: string;
    @Input() rounded = false;
    @Input() icon?: string;
}
