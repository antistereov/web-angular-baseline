import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormsModule} from "@angular/forms";
import {Checkbox} from "primeng/checkbox";

@Component({
    selector: 'base-checkbox',
    imports: [
        Checkbox,
        FormsModule
    ],
    templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements ControlValueAccessor {
    @Input() disabled: boolean = false;
    @Input() class: string = '';
    @Input() trueValue: any;
    @Input() falseValue: any;
    @Input() inputId?: string;

    @Output() onChange = new EventEmitter<any>();
    @Output() onFocus = new EventEmitter<any>();
    @Output() onBlur = new EventEmitter<any>();

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
}
