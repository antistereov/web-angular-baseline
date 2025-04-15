import {Component, inject} from '@angular/core';
import {ButtonComponent} from "@baseline/shared/ui/component/button/button.component";
import {DrawerService} from "../../../drawer/drawer.service";
import {
    ColorSchemeSelectButtonComponent
} from "@baseline/settings/feature/color-scheme-select-button/color-scheme-select-button.component";
import {LanguageSelectComponent} from "@baseline/settings/feature/language-select/language-select.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
    imports: [
        ButtonComponent,
        ColorSchemeSelectButtonComponent,
        LanguageSelectComponent
    ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
    private drawerService = inject(DrawerService);
    private router = inject(Router)

    toggleDrawer() {
        this.drawerService.toggle();
    }

    navigateHome() {
        this.router.navigate(['']).then();
    }
}
