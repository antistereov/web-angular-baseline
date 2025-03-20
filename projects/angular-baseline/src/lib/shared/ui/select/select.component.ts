import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgSelectComponent} from '@ng-select/ng-select';

@Component({
  selector: 'base-selector',
    imports: [
        NgSelectComponent,
    ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent<T> {
    @Input() options: { label: string, value: T }[] = [];
    @Input() placeholder: string = '';
    @Input() disabled: boolean = false;
    @Output() valueChange = new EventEmitter<T>();

    selected: T | null = null

    onSelect(value: T) {
        this.selected = value;
        this.valueChange.emit(value);
    }
}
