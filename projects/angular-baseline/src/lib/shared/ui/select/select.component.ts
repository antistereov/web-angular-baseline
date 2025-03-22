import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Select} from 'primeng/select';

@Component({
  selector: 'base-select',
    imports: [
        Select
    ],
  templateUrl: './select.component.html',
})
export class SelectComponent<T> {
    @Input() options: { label: string, value: T }[] = [];
    @Input() placeholder: string = '';
    @Input() disabled: boolean = false;
    @Input() class?: string;

    @Output() valueChange = new EventEmitter<T>();

    selected: T | null = null

    onSelect(value: T) {
        this.selected = value;
        this.valueChange.emit(value);
    }
}
