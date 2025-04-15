import {Component, ContentChild, EventEmitter, forwardRef, Input, Output, TemplateRef} from '@angular/core';
import {
    SelectButton,
    SelectButtonChangeEvent,
    SelectButtonModule,
    SelectButtonOptionClickEvent
} from 'primeng/selectbutton';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgIf, NgTemplateOutlet} from '@angular/common';

@Component({
    selector: 'base-select-button',
    imports: [
        SelectButton,
        SelectButtonModule,
        FormsModule,
        NgTemplateOutlet,
        NgIf,
    ],
    templateUrl: './select-button.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectButtonComponent),
            multi: true
        }
    ]
})
export class SelectButtonComponent implements ControlValueAccessor {
    @Input() options?: any[];
    @Input() optionLabel?: string;
    @Input() optionValue?: string;
    @Input() optionDisabled?: string;
    @Input() unselectable: boolean = false;
    @Input() tabindex: number = 0;
    @Input() multiple: boolean = false;
    @Input() allowEmpty: boolean = false;
    @Input() style?: any;
    @Input() styleClass?: string;
    @Input() ariaLabelledBy?: string;
    @Input() disabled: boolean = false;
    @Input() dataKey?: string;
    @Input() autofocus: boolean = false;
    @Input() size?: 'small' | 'large'

    @Output() onOptionClick = new EventEmitter<SelectButtonOptionClickEvent>();
    @Output() onChange = new EventEmitter<SelectButtonChangeEvent>();

    @ContentChild('item', { static: false }) itemTemplate!: TemplateRef<any>;

    value: any;
    onChangeFn: (_: any) => void = () => {};
    onTouchedFn: () => void = () => {};

    writeValue(value: any) {
        this.value = value;
    }

    registerOnChange(fn: any) {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedFn = fn;
    }

    setDisabledState?(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    handleChange(event: SelectButtonChangeEvent) {
        this.value = event.value;
        this.onChangeFn(this.value);
        this.onChange.emit(event);
    }
}
