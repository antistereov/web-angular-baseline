import {Component, inject} from '@angular/core';
import {InputComponent} from '@baseline/shared/ui/component/input/input.component';
import {SelectComponent} from '@baseline/shared/ui/component/select/select.component';
import {
    ColorSchemeSelectButtonComponent
} from '@baseline/settings/feature/color-scheme-select-button/color-scheme-select-button.component';
import {ButtonComponent} from '@baseline/shared/ui/component/button/button.component';
import {CardComponent} from '@baseline/shared/ui/component/card/card.component';
import {LanguageSelectComponent} from '@baseline/settings/feature/language-select/language-select.component';
import {TranslatePipe} from '@ngx-translate/core';
import {DrawerComponent} from '@baseline/shared/ui/component/drawer/drawer.component';
import {Router} from '@angular/router';
import {UserService} from '@baseline/shared/data-access/user.service';
import {NgIf} from '@angular/common';
import {TooltipDirective} from '@baseline/shared/ui/directive/tooltip.directive';

@Component({
  selector: 'base-demo',
    imports: [
        InputComponent,
        SelectComponent,
        ColorSchemeSelectButtonComponent,
        ButtonComponent,
        CardComponent,
        LanguageSelectComponent,
        TranslatePipe,
        DrawerComponent,
        TooltipDirective,
        NgIf,
    ],
  templateUrl: './demo.component.html'
})
export class DemoComponent {
    protected router = inject(Router);
    protected userService = inject(UserService);

    drawerVisible: boolean = false;

    toggleDrawer() {
        this.drawerVisible = !this.drawerVisible;
    }
}
