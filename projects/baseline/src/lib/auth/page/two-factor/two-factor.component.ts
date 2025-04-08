import {Component, inject} from '@angular/core';
import {NonNullableFormBuilder} from "@angular/forms";

@Component({
    selector: 'base-two-factor',
    imports: [],
    templateUrl: './two-factor.component.html',
    styleUrl: './two-factor.component.css'
})
export class TwoFactorComponent {
    private fb = inject(NonNullableFormBuilder);
}
