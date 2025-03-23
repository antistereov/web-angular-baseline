import {inject, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private translateService = inject(TranslateService);

    languages: Language[] = [
        { code: 'en', name: 'English' },
        { code: 'de', name: 'Deutsch' }
    ];
    selectedLanguage: Language = this.languages[0];

    setLanguage(lang: string) {
        this.translateService.use(lang);
    }

    constructor() {
        const browserLang = this.languages.find(lang => lang.code === this.translateService.getBrowserLang())

        if (browserLang) {
            this.selectedLanguage = browserLang;
        }

        this.translateService.setDefaultLang(this.selectedLanguage.code);
    }
}

export interface Language {
    code: string;
    name: string;
}
