import {TooltipDirective} from './tooltip.directive';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Component} from "@angular/core";
import {By} from "@angular/platform-browser";

@Component({
    imports: [
        TooltipDirective
    ],
    template: `
        <div baseTooltip="Test Tooltip">Test</div>`
})
class TestComponent {}

describe('TooltipDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent, TooltipDirective]
        });

        fixture = TestBed.createComponent(TestComponent);
        element = fixture.nativeElement.querySelector('div');
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        const directive = fixture.debugElement.query(By.directive(TooltipDirective)).injector.get(TooltipDirective);
        expect(directive).toBeTruthy();
    });
});
