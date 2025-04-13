import {Component, Input} from '@angular/core';
import {Avatar} from "primeng/avatar";

@Component({
    selector: 'base-avatar',
    imports: [
        Avatar
    ],
    templateUrl: './avatar.component.html',
})
export class AvatarComponent {
    @Input() image?: string;
    @Input() class?: string;
    @Input() label?: string;
    @Input() size?: 'normal' | 'large' | 'xlarge' = 'normal';
    @Input() icon?: string;
    @Input() shape: 'circle' | 'square' = 'circle';
}
