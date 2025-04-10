import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Checkbox, CheckboxChangeEvent} from "primeng/checkbox";

@Component({
    selector: 'base-checkbox',
    imports: [
        Checkbox,
        FormsModule
    ],
    templateUrl: './checkbox.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        }
    ]
})
export class CheckboxComponent implements ControlValueAccessor {
    @Input() disabled: boolean = false;
    @Input() class: string = '';
    @Input() trueValue: any = true;
    @Input() falseValue: any = false;
    @Input() inputId?: string;
    @Input() binary: boolean = true;

    @Output() onChange = new EventEmitter<CheckboxChangeEvent>();
    @Output() onFocus = new EventEmitter<any>();
    @Output() onBlur = new EventEmitter<any>();

    value: any;

    onChangeFn: (_: any) => void = () => {};
    onTouchedFn: () => void = () => {};

    handleChange(event: CheckboxChangeEvent) {
        this.value = event.checked;
        this.onChange.emit(event);
    }

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
}
