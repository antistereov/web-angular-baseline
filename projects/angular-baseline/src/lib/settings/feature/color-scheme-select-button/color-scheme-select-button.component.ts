import {Component, computed, inject} from '@angular/core';
import {ColorSchemeService} from '@baseline/settings/utils/color-scheme.service';
import {FormsModule} from '@angular/forms';
import {SelectButtonChangeEvent} from 'primeng/selectbutton';
import {SelectButtonComponent} from '@baseline/shared/ui/select-button/select-button.component';
import {
    ColorSchemeOption
} from '@baseline/settings/feature/color-scheme-select-button/color-scheme-select-button.model';

@Component({
    selector: 'base-color-scheme-select-button',
    imports: [
        FormsModule,
        SelectButtonComponent,
    ],
    templateUrl: './color-scheme-select-button.component.html',
    styleUrl: './color-scheme-select-button.component.css'
})
export class ColorSchemeSelectButtonComponent {
    colorSchemes: ColorSchemeOption[] = [
        { icon: 'pi pi-sun', colorScheme: 'light' },
        { icon: 'pi pi-moon', colorScheme: 'dark' },
        { icon: 'pi pi-desktop', colorScheme: 'system' }
    ]

    private colorSchemeService = inject(ColorSchemeService);
    private colorScheme = this.colorSchemeService.getTheme();

    value = computed(() => {
        return this.colorSchemes.find(scheme => scheme.colorScheme === this.colorScheme());
    });

    onChange(event: SelectButtonChangeEvent) {
        this.colorSchemeService.setColorScheme(event.value.colorScheme);
    }
}
