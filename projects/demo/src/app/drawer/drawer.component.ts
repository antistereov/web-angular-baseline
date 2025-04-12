import {Component, inject} from '@angular/core';
import {ButtonComponent} from "@baseline/shared/ui/component/button/button.component";
import {DrawerComponent} from "@baseline/shared/ui/component/drawer/drawer.component";
import {NgIf} from "@angular/common";
import {TooltipDirective} from "@baseline/shared/ui/directive/tooltip/tooltip.directive";
import {DrawerService} from "./drawer.service";
import {UserService} from "@baseline/shared/data-access/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-drawer',
    imports: [
        ButtonComponent,
        DrawerComponent,
        NgIf,
        TooltipDirective
    ],
  templateUrl: './drawer.component.html'
})
export class AppDrawerComponent {
    private drawerService = inject(DrawerService);

    userService = inject(UserService);
    router = inject(Router);

    user = this.userService.user;

    visible = this.drawerService.visible;

    setVisibility(visible: boolean){
        this.drawerService.setVisible(visible);
    }

    navigateToSettings() {
        this.router.navigate(['me']).then()

        this.setVisibility(false);
    }
}
