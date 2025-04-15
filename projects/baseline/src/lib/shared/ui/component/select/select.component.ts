import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {Select, SelectChangeEvent, SelectModule} from 'primeng/select';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgIf} from "@angular/common";

@Component({
    selector: 'base-select',
    imports: [
        Select,
        SelectModule,
        FormsModule,
        NgIf
    ],
    templateUrl: './select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ]
})
export class SelectComponent implements ControlValueAccessor {
    @Input() options: any[] = [];
    @Input() placeholder: string = '';
    @Input() disabled: boolean = false;
    @Input() class?: string;
    @Input() optionLabel?: string;
    @Input() size?: 'small' | 'large';

    @Output() onChange = new EventEmitter<SelectChangeEvent>();

    value: any;

    onSelect(event: SelectChangeEvent) {
        this.value = event.value;
        this.onChange.emit(event);
    }

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
