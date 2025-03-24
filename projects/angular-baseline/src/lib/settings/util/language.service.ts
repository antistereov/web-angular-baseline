import {effect, inject, Injectable, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private translateService = inject(TranslateService);
    private localStorageKey = 'lang';

    languages: Language[] = [
        { code: 'en', name: 'English' },
        { code: 'de', name: 'Deutsch' }
    ];
    selectedLanguage = signal<Language>(this.languages[0]);

    setLanguage(lang: Language) {
        this.setStoredLanguage(lang);
        this.translateService.use(lang.code);
        this.selectedLanguage.set(lang);
    }

    constructor() {
        effect(() => {
            this.translateService.use(this.selectedLanguage().code);
        })

        this.initialize()
    }

    private initialize() {
        const storedLang = this.getStoredLanguage();

        if (storedLang) {
            this.selectedLanguage.set(storedLang);
            return;
        }

        const browserLang = this.languages.find(lang => lang.code === this.translateService.getBrowserLang())

        if (browserLang) {
            this.selectedLanguage.set(browserLang);
            return;
        }
    }

    getStoredLanguage(): Language | undefined {
        const code = localStorage.getItem(this.localStorageKey);

        if (!code) {
            return undefined;
        }

        return this.languages.find(lang => lang.code === code);
    }

    setStoredLanguage(lang: Language) {
        localStorage.setItem(this.localStorageKey, lang.code);
    }
}

export interface Language {
    code: string;
    name: string;
}
