import {Injectable, Signal, signal} from '@angular/core';
import {User} from '@baseline/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private userSignal = signal<User | undefined>(undefined);
    private userLoadedSignal = signal<boolean>(false);

    setUser(user: User | undefined): void {
        this.userSignal.set(user);
    }

    get user(): Signal<User | undefined> {
        return this.userSignal;
    }

    clearUser(): void {
        this.userSignal.set(undefined);
    }

    setUserLoaded(userLoaded: boolean) {
        this.userLoadedSignal.set(userLoaded);
    }

    get userLoaded(): Signal<boolean> {
        return this.userLoadedSignal;
    }
}
