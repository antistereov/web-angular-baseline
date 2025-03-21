import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {SelectButton, SelectButtonChangeEvent, SelectButtonOptionClickEvent} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {NgIf} from '@angular/common';

@Component({
  selector: 'base-select-button',
    imports: [
        SelectButton,
        FormsModule,
        LucideAngularModule,
        NgIf,
    ],
  templateUrl: './select-button.component.html',
  styleUrl: './select-button.component.css'
})
export class SelectButtonComponent {
  @Input() options: any[] | undefined = undefined;
  @Input() optionLabel: string | undefined = undefined;
  @Input() optionValue: string | undefined = undefined;
  @Input() optionDisabled: string | undefined = undefined;
  @Input() unselectable: boolean = false;
  @Input() tabindex: number = 0;
  @Input() multiple: boolean = false;
  @Input() allowEmpty: boolean = true;
  @Input() style: any = undefined;
  @Input() styleClass: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input() disabled: boolean = false;
  @Input() dataKey: string | undefined = undefined;
  @Input() autofocus: boolean = false;
  @Input() useIcons: boolean = false;

  @Output() onOptionClick = new EventEmitter<SelectButtonOptionClickEvent>();
  @Output() onChange = new EventEmitter<SelectButtonChangeEvent>();

  @ContentChild('item', { static: false }) itemTemplate!: TemplateRef<any>;
}
