import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {InputOtpModule} from "primeng/inputotp";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
    selector: 'base-input-otp',
    imports: [InputOtpModule, FormsModule, NgIf],
    templateUrl: './input-otp.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputOtpComponent),
            multi: true
        }
    ]
})
export class InputOtpComponent implements ControlValueAccessor {
    value: any;

    @Input() disabled: boolean = false;
    @Input() length: number = 6;
    @Input() autofocus: boolean = false;
    @Input() invalid: boolean = false;
    @Input() displayWarning: boolean = false;
    @Input() warning?: string;
    @Input() class?: string;
    @Input() integerOnly: boolean = true;

    @Output() onChange = new EventEmitter<any>();
    @Output() onFocus = new EventEmitter<any>();
    @Output() onBlur = new EventEmitter<any>();

    onChangeFn: (_: any) => void = () => {};
    onTouchedFn: () => void = () => {};

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedFn = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    change(event: any) {
        this.onChangeFn(this.value);
        this.onChange.emit(event)
    }
}
