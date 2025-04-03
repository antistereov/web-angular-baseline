import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {HttpLoaderFactory} from '@baseline/core/translate/translate-loader';

export function provideTranslateService() {
    return [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }).providers
    ]
}
