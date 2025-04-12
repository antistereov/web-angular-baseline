import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {initializeBaseline} from '@baseline/core/config/base.config';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {HeaderComponent} from "./shared/ui/header/header.component";
import {AppDrawerComponent} from "./drawer/drawer.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Toast, ConfirmDialog, HeaderComponent, AppDrawerComponent],
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'demo';

    constructor() {
        initializeBaseline();
    }
}
