import {Component, ContentChild, Input, TemplateRef} from '@angular/core';
import {Card} from 'primeng/card';
import {NgTemplateOutlet} from '@angular/common';

@Component({
    selector: 'base-card',
    imports: [
        Card,
        NgTemplateOutlet
    ],
    templateUrl: './card.component.html'
})
export class CardComponent {
    @Input() subheader?: string;
    @Input() style?: {[p: string]: any};
    @Input() class?: string;

    @ContentChild('header', { static: false}) headerTemplate!: TemplateRef<any>;
    @ContentChild('title', { static: false }) titleTemplate!: TemplateRef<any>;
    @ContentChild('subtitle', { static: false }) subtitleTemplate!: TemplateRef<any>;
    @ContentChild('content', { static: false }) contentTemplate!: TemplateRef<any>;
    @ContentChild('footer', { static: false }) footerTemplate!: TemplateRef<any>;
}
