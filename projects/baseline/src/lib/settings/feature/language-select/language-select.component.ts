import {Component, inject, Input} from '@angular/core';
import {SelectComponent} from '@baseline/shared/ui/component/select/select.component';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Language, LanguageService} from "@baseline/core/translate/language.service";

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
    @Input() size?: 'small' | 'large';

    private languageService = inject(LanguageService);

    selectedLanguage = this.languageService.selectedLanguage;
    languages = this.languageService.languages;

    setLanguage(lang: Language) {
        this.languageService.setLanguage(lang);
    }
}
