import {Component, inject} from '@angular/core';
import {SelectComponent} from '@baseline/shared/ui/select/select.component';
import {FormsModule} from '@angular/forms';
import {LanguageService} from '@baseline/settings/utils/language.service';

@Component({
  selector: 'base-language-select',
    imports: [
        SelectComponent,
        FormsModule
    ],
  templateUrl: './language-select.component.html'
})
export class LanguageSelectComponent {
    private languageService = inject(LanguageService);

    selectedLanguage = this.languageService.selectedLanguage;
    languages = this.languageService.languages;

    setLanguage(lang: string) {
        this.languageService.setLanguage(lang);
    }
}
