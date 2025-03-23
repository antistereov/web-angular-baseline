import {Component, Input} from '@angular/core';
import {Skeleton} from 'primeng/skeleton';

@Component({
  selector: 'base-skeleton',
    imports: [
        Skeleton
    ],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css'
})
export class SkeletonComponent {
    @Input() shape: 'circle' | 'rectangle' = 'rectangle';
    @Input() size?: string;
    @Input() width: string = '100%';
    @Input() height: string = '1rem';
    @Input() class?: string;
}
