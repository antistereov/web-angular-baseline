import {Component, Input} from '@angular/core';
import {CardComponent} from '@baseline/shared/ui/component/card/card.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {SkeletonComponent} from '@baseline/shared/ui/component/skeleton/skeleton.component';

@Component({
  selector: 'base-auth-card',
    imports: [
        CardComponent,
        ReactiveFormsModule,
        NgIf,
        SkeletonComponent
    ],
  templateUrl: './auth-card.component.html'
})
export class AuthCardComponent {
    @Input() cardTitle: string = '';
    @Input() loaded?: boolean = false;

}
