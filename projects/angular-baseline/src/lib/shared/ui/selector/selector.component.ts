import {Component, computed, EventEmitter, HostListener, Input, Output, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {filter} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {NgSelectComponent} from '@ng-select/ng-select';

@Component({
  selector: 'base-selector',
    imports: [
        CommonModule,
        FormsModule,
        NgSelectComponent,
    ],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss'
})
export class SelectorComponent<T> {
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
