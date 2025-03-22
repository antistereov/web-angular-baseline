import Aura from '@primeng/themes/aura';
import {ThemeConfigType} from 'primeng/config';
import {definePreset} from '@primeng/themes';

const BasePreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{indigo.50}',
            100: '{indigo.100}',
            200: '{indigo.200}',
            300: '{indigo.300}',
            400: '{indigo.400}',
            500: '{indigo.500}',
            600: '{indigo.600}',
            700: '{indigo.700}',
            800: '{indigo.800}',
            900: '{indigo.900}',
            950: '{indigo.950}'
        }
    }
});

export const primeConfig: ThemeConfigType = {
    theme: {
        preset: BasePreset,
        options: {
            darkModeSelector: '.dark-mode',
            cssLayer: {
                name: 'primeng',
                order: 'theme, base, primeng'
            }
        }
    }
}
