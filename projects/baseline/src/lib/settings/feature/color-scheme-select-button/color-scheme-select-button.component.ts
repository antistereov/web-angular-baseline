import {Component, computed, inject} from '@angular/core';
import {ColorSchemeService} from '@baseline/settings/util/color-scheme.service';
import {FormsModule} from '@angular/forms';
import {SelectButtonChangeEvent} from 'primeng/selectbutton';
import {SelectButtonComponent} from "@baseline/shared/ui/component/select-button/select-button.component";

@Component({
    selector: 'base-color-scheme-select-button',
    imports: [
        FormsModule,
        SelectButtonComponent,
    ],
    templateUrl: './color-scheme-select-button.component.html'
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

export interface ColorSchemeOption {
    colorScheme: 'light' | 'dark' | 'system';
    icon: string;
}
