import {booleanAttribute, Component, EventEmitter, Input, Output} from '@angular/core';
import {Button, ButtonProps} from 'primeng/button';

@Component({
    selector: 'base-button',
    imports: [
        Button
    ],
    templateUrl: './button.component.html'
})
export class ButtonComponent {
    @Input() type: string = 'button';
    @Input() icon?: string;
    @Input() badge?: string;
    @Input() label?: string;
    @Input({transform: booleanAttribute}) disabled = false;
    @Input({transform: booleanAttribute}) loading: boolean = false;
    @Input() loadingIcon?: string;
    @Input({transform: booleanAttribute}) raised: boolean = false;
    @Input({transform: booleanAttribute}) rounded: boolean = false;
    @Input({transform: booleanAttribute}) text: boolean = false;
    @Input() severity?: 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast' | 'help' | 'primary';
    @Input() outlined: boolean = false;
    @Input() link: boolean = false;
    @Input() tabindex?: number;
    @Input() size?: 'small' | 'large'
    @Input() variant?: 'text' | 'outlined'
    @Input() style?: {[p: string]: any}
    @Input() class?: string;
    @Input() badgeSeverity: 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast' | 'help' | 'primary' = 'secondary';
    @Input() ariaLabel?: string;
    @Input() autofocus: boolean = false;
    @Input() fluid: boolean = false;
    @Input() buttonProps?: ButtonProps;

    @Output() onClick = new EventEmitter<MouseEvent>();
    @Output() onFocus = new EventEmitter<FocusEvent>();
    @Output() onBlur = new EventEmitter<FocusEvent>();
}
