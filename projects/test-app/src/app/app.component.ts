import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {initializeBaseline} from '@baseline/core/config/base.config';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'test-app';

    constructor() {
        initializeBaseline();
    }
}
