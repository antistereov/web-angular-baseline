import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {initializeBaseline} from '@baseline/core/config/base.config';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Toast, ConfirmDialog],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'test-app';

    constructor() {
        initializeBaseline();
    }
}
