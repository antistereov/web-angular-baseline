import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {Drawer} from 'primeng/drawer';
import {NgIf, NgTemplateOutlet} from '@angular/common';

@Component({
    selector: 'base-drawer',
    imports: [
        Drawer,
        NgTemplateOutlet,
        NgIf
    ],
    templateUrl: './drawer.component.html'
})
export class DrawerComponent {
    @Input() visible: boolean = false;
    @Input() position: 'left' | 'right' | 'top' | 'bottom' = 'left';
    @Input() title?: string;
    @Input() class?: string;
    @Input() closable: boolean = true;

    @Output() onShow = new EventEmitter<any>();
    @Output() onHide = new EventEmitter<any>();
    @Output() visibleChange = new EventEmitter<boolean>();

    @ContentChild('header', { static: false }) headerTemplate!: TemplateRef<any>;
    @ContentChild('content', { static: false }) contentTemplate!: TemplateRef<any>;
    @ContentChild('footer', { static: false }) footerTemplate!: TemplateRef<any>;
    @ContentChild('headless', { static: false }) headlessTemplate: TemplateRef<any> | undefined;

    hide(event: Event) {
        this.visible = false;
        this.visibleChange.emit(false);
        this.onHide.emit(event);
    }

    show(event: Event) {
        this.visible = true;
        this.visibleChange.emit(true);
        this.onShow.emit(event);
    }
}
