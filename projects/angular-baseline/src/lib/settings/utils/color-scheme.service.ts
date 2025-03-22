import {Injectable, OnDestroy, Signal, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorSchemeService implements OnDestroy {
    private colorScheme = signal<'light' | 'dark' | 'system'>(this.loadColorScheme());

    private darkSchemeMq = window.matchMedia('(prefers-color-scheme: dark');
    private colorSchemeListener = (e: MediaQueryListEvent)=> {
        if (this.colorScheme() === 'system') {
            this.applyColorScheme(e.matches ? 'dark' : 'light');
        }
    }

    constructor() {
        this.darkSchemeMq.addEventListener('change', this.colorSchemeListener);
        this.applyColorScheme(this.colorScheme());
    }

    ngOnDestroy() {
        this.darkSchemeMq.removeEventListener('change', this.colorSchemeListener);
    }

    getTheme(): Signal<'light' | 'dark' | 'system'> {
        return this.colorScheme;
    }

    setColorScheme(mode: 'light' | 'dark' | 'system') {
        this.colorScheme.set(mode);
        localStorage.setItem('color-scheme', mode);
        this.applyColorScheme(mode);
    }

    private loadColorScheme(): 'light' | 'dark' | 'system' {
        const savedColorScheme = localStorage.getItem('color-scheme');

        if (savedColorScheme !== 'light' && savedColorScheme !== 'dark' && savedColorScheme !== 'system') {
            localStorage.removeItem('color-scheme');
            return 'system'
        }

        return savedColorScheme;
    }

    private getSystemColorScheme(): 'light' | 'dark' {
        return this.darkSchemeMq.matches ? 'dark' : 'light';
    }

    private applyColorScheme(mode: 'light' | 'dark' | 'system') {
        const prefersDark = this.getSystemColorScheme() === 'dark';
        const isDark = mode === 'dark' || (mode === 'system' && prefersDark);

        document.querySelector('html')?.classList.toggle('dark-mode', isDark);
        document.body.classList.toggle('dark-mode', isDark);
    }
}
