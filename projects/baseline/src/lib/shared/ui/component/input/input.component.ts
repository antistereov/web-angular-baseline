import {booleanAttribute, Component, EventEmitter, forwardRef, input, Input, Output} from '@angular/core';
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
    @Input() displayWarning: boolean = false;
    @Input() warning?: string;
    @Input({transform: booleanAttribute}) autofocus = false;

    @Output() onChange = new EventEmitter<any>();

    value: string = '';

    isFocused = false;
    onChangeFn = (_: any) => {};
    onTouchedFn = () => {};

    writeValue(value: any): void {
        this.value = value || '';
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

    onInput(event: Event) {
        const input = event.target as HTMLInputElement;
        this.value = input.value;
        this.onChangeFn(input.value);
        this.onChange.emit(input);
    }

    protected readonly input = input;
}
