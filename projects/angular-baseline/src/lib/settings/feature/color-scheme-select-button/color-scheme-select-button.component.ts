import {Component, computed, inject, OnInit} from '@angular/core';
import {ColorSchemeService} from '@baseline/settings/utils/color-scheme.service';
import {LucideAngularModule, SunIcon, MoonIcon, LaptopMinimalIcon} from 'lucide-angular';
import {FormsModule} from '@angular/forms';
import {SelectButton, SelectButtonChangeEvent} from 'primeng/selectbutton';
import {SelectButtonComponent} from '@baseline/shared/ui/select-button/select-button.component';

@Component({
  selector: 'base-color-scheme-select-button',
    imports: [
        LucideAngularModule,
        FormsModule,
        SelectButtonComponent,
    ],
  templateUrl: './color-scheme-select-button.component.html',
  styleUrl: './color-scheme-select-button.component.css'
})
export class ColorSchemeSelectButtonComponent implements OnInit {
    colorSchemes = [
        { icon: SunIcon, colorScheme: 'light' },
        { icon: MoonIcon, colorScheme: 'dark' },
        { icon: LaptopMinimalIcon, colorScheme: 'system' }
    ]

    private colorSchemeService = inject(ColorSchemeService);
    private colorScheme = this.colorSchemeService.getTheme();

    value = computed(() => {
        return this.colorSchemes.find(scheme => scheme.colorScheme === this.colorScheme());
    });

    ngOnInit() {
        console.log(this.value);
    }
    onChange(event: SelectButtonChangeEvent) {
        this.colorSchemeService.setColorScheme(event.value.colorScheme);
    }
}
