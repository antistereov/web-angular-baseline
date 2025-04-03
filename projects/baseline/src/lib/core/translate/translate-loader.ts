import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslationObject} from '@ngx-translate/core';
import {inject} from '@angular/core';
import {catchError, forkJoin, map, Observable, of} from 'rxjs';
import en from './translations/en.json'
import de from './translations/de.json'

export function HttpLoaderFactory() {
    return new MergedTranslateLoader()
}

export class MergedTranslateLoader implements TranslateLoader {
    private http = inject(HttpClient);
    private baseTranslations: Record<string, any> = {
        en: en,
        de: de,
    }

    getTranslation(lang: string): Observable<TranslationObject> {
        return forkJoin({
            base: of(this.baseTranslations[lang]),
            app: this.http.get(`/assets/i18n/${lang}.json`).pipe(
                catchError(() => of({}))
            )
        }).pipe(
            map(translations => ({
                ...translations.base,
                ...translations.app
            }))
        );
    }
}
