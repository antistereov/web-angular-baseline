import {Component, inject} from '@angular/core';
import {ButtonComponent} from "@baseline/shared/ui/component/button/button.component";
import {DrawerComponent} from "@baseline/shared/ui/component/drawer/drawer.component";
import {NgIf} from "@angular/common";
import {TooltipDirective} from "@baseline/shared/ui/directive/tooltip/tooltip.directive";
import {DrawerService} from "./drawer.service";
import {UserService} from "@baseline/shared/data-access/user.service";
import {Router} from "@angular/router";
import {catchError, tap, throwError} from "rxjs";
import {AvatarComponent} from "@baseline/shared/ui/component/avatar/avatar.component";

@Component({
  selector: 'app-drawer',
    imports: [
        ButtonComponent,
        DrawerComponent,
        NgIf,
        TooltipDirective,
        AvatarComponent
    ],
  templateUrl: './drawer.component.html'
})
export class AppDrawerComponent {
    private drawerService = inject(DrawerService);

    userService = inject(UserService);
    router = inject(Router);

    logoutLoading = false;

    user = this.userService.user;

    visible = this.drawerService.visible;

    setVisibility(visible: boolean){
        this.drawerService.setVisible(visible);
    }

    navigateToSettings() {
        this.router.navigate(['me']).then()

        this.setVisibility(false);
    }

    navigateToLogin() {
        this.router.navigate(['/auth/login']).then();
        this.setVisibility(false);
    }

    navigateToRegister() {
        this.router.navigate(['/auth/register']).then();
        this.setVisibility(false);
    }

    logout() {
        this.logoutLoading = true;

        this.userService.logout().pipe(
            tap(() => {
                this.logoutLoading = false;
            }),
            catchError((err) => {
                this.logoutLoading = false;
                return throwError(() => err);
            })
        ).subscribe()
    }
}
