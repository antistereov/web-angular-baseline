import {Component, inject} from '@angular/core';
import {InputComponent} from '@baseline/shared/ui/component/input/input.component';
import {SelectComponent} from '@baseline/shared/ui/component/select/select.component';
import {ButtonComponent} from '@baseline/shared/ui/component/button/button.component';
import {CardComponent} from '@baseline/shared/ui/component/card/card.component';
import {TranslatePipe} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {UserService} from '@baseline/shared/data-access/user.service';
import {InfoPanelComponent} from "@baseline/shared/ui/component/info-panel/info-panel.component";

@Component({
  selector: 'base-demo',
    imports: [
        InputComponent,
        SelectComponent,
        ButtonComponent,
        CardComponent,
        TranslatePipe,
        InfoPanelComponent,
    ],
  templateUrl: './demo.component.html'
})
export class DemoComponent {
    protected router = inject(Router);
    protected userService = inject(UserService);
}
