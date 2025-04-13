import {Component, inject} from '@angular/core';
import {UserService} from "@baseline/shared/data-access/user.service";
import {FileUploadHandlerEvent} from "primeng/fileupload";
import {UserSettingsService} from "@baseline/settings/data-access/user-settings.service";
import {AvatarComponent} from "@baseline/shared/ui/component/avatar/avatar.component";
import {FileUploadComponent} from "@baseline/shared/ui/component/file-upload/file-upload.component";
import {ButtonComponent} from "@baseline/shared/ui/component/button/button.component";
import {catchError, tap, throwError} from "rxjs";

@Component({
    selector: 'base-avatar-settings',
    imports: [
        AvatarComponent,
        FileUploadComponent,
        ButtonComponent
    ],
    templateUrl: './avatar-settings.component.html',
})
export class AvatarSettingsComponent {
    private userService = inject(UserService);
    private userSettingsService = inject(UserSettingsService);

    user = this.userService.user;
    avatar = this.userService.avatar;

    uploading = false;
    deleting = false;


    setAvatar(event: FileUploadHandlerEvent) {
        this.uploading = true;
        const file = event.files.at(0)

        console.log(file);

        this.userSettingsService.setAvatar(file!!).pipe(
            tap(() => this.uploading = false),
            catchError((err) => {
                this.uploading = false;
                return throwError(() => err);
            })
        ).subscribe()
    }

    deleteAvatar() {
        this.deleting = true;
        this.userSettingsService.deleteAvatar().pipe(
            tap(() => this.deleting = false),
            catchError((err) => {
                this.deleting = false;
                return throwError(() => err);
            })
        ).subscribe();
    }
}
