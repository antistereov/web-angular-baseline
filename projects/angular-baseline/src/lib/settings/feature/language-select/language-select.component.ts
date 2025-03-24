import {Component, inject, Input} from '@angular/core';
import {SelectComponent} from '@baseline/shared/ui/component/select/select.component';
import {FormsModule} from '@angular/forms';
import {Language, LanguageService} from '@baseline/settings/util/language.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'base-language-select',
    imports: [
        SelectComponent,
        FormsModule,
        NgClass
    ],
  templateUrl: './language-select.component.html'
})
export class LanguageSelectComponent {
    @Input() class?: string;

    private languageService = inject(LanguageService);

    selectedLanguage = this.languageService.selectedLanguage;
    languages = this.languageService.languages;

    setLanguage(lang: Language) {
        this.languageService.setLanguage(lang);
    }
}
