import {Directive, ElementRef, inject, Input, OnChanges, Renderer2, TemplateRef} from '@angular/core';
import {Tooltip, TooltipModule, TooltipStyle} from 'primeng/tooltip';

@Directive({
    selector: '[baseTooltip]',
    providers: [TooltipModule, Tooltip, TooltipStyle],
})
export class TooltipDirective implements OnChanges {
    @Input('baseTooltip') text: string | TemplateRef<any> = '';
    @Input('tooltipPosition') position: 'top' | 'bottom' | 'right' | 'left' = 'right';

    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    ngOnChanges() {
        this.renderer.setProperty(this.el.nativeElement, 'pTooltip', this.text)
        this.renderer.setProperty(this.el.nativeElement, 'tooltipPosition', this.position)
        this.renderer.addClass(this.el.nativeElement, 'p-component');
    }
}
