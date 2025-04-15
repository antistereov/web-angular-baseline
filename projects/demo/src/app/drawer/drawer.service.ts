import {Injectable, Signal, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
    private _visible = signal<boolean>(false);

    get visible(): Signal<boolean> {
        return this._visible;
    }

    setVisible(visible: boolean) {
        this._visible.set(visible);
    }

    toggle() {
        this._visible.set(!this._visible())
    }
}
