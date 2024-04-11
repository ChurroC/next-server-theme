import { type ThemeConfig } from '@/index.d';

export const config: ThemeConfig<'dark' | 'system' | 'light'> = {
    defaultTheme: 'system',
    systemLightTheme: 'light',
    systemDarkTheme: 'dark',
    modifyTheme: theme => {
        return theme;
    },
};
