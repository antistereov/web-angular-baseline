import {Injectable, Signal, signal} from '@angular/core';
import {User} from '@baseline/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private user = signal<User | undefined>(undefined);

    setUser(user: User | undefined): void {
        this.user.set(user);
    }

    getUser(): Signal<User | undefined> {
        return this.user;
    }

    clearUser(): void {
        this.user.set(undefined);
    }
}
