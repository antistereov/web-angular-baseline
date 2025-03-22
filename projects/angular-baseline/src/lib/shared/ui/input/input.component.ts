import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {InputText} from 'primeng/inputtext';

@Component({
    selector: 'base-input',
    imports: [
        CommonModule,
        FormsModule,
        InputText,
    ],
    templateUrl: './input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ]
})
export class InputComponent implements ControlValueAccessor {
    @Input() type: string = 'text';
    @Input() placeholder: string = '';
    @Input() disabled: boolean = false;
    @Input() readonly: boolean = false;
    @Input() class?: string;
    @Input() invalid: boolean = false;

    value: string = '';

    isFocused = false;
    onChange = (_: any) => {};
    onTouched = () => {};

    writeValue(value: any): void {
        this.value = value || '';
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onInput(event: Event) {
        const input = event.target as HTMLInputElement;
        this.value = input.value;
        this.onChange(input.value);
    }

}
