# Rahatla — Personal Stress Relief App

A React Native mobile application designed to reduce users' daily stress with personalized breathing exercises, sound therapies, and AI-powered chat.

## Features

- **Breathing Exercises**: Guided breathing exercises with animated timers
- **Sound Therapy**: Relaxing nature sounds and gentle music
- **AI Chat**: Personalized relaxation tips and guidance (Premium)
- **Motivational Quotes**: Daily inspirational quotes with beautiful backgrounds
- **Multi-language Support**: Available in English and Turkish
- **Dark/Light Mode**: Automatic theme switching based on system preferences
- **Progress Tracking**: Track your wellness journey and achievements

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **i18next** for internationalization
- **React Native Localize** for device language detection
- **Async Storage** for local data persistence

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rahatla
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on specific platforms:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── common/         # Common components (Button, ThemedText, etc.)
├── screens/            # Screen components
├── hooks/              # Custom React hooks
├── constants/          # App constants (colors, typography, spacing)
├── localization/       # i18n configuration and translations
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Development

### Adding New Translations

1. Add new keys to `src/localization/locales/en.json`
2. Add corresponding translations to `src/localization/locales/tr.json`
3. Use the `useTranslation` hook in components:

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  return <Text>{t('my.translation.key')}</Text>;
};
```

### Theming

The app uses a comprehensive theming system with support for light and dark modes:

- Colors are defined in `src/constants/colors.ts`
- Typography settings in `src/constants/typography.ts`
- Spacing values in `src/constants/spacing.ts`
- Use the `useTheme` hook to access current theme values

### Components

All UI components are themed and follow the design system:

- `ThemedView`: Container component with theme-aware background
- `ThemedText`: Text component with typography variants
- `Button`: Customizable button with multiple variants and sizes

## Contributing

1. Follow the existing code style and patterns
2. Add proper TypeScript types for new features
3. Include translations for both English and Turkish
4. Test on both iOS and Android platforms
5. Follow the component structure and theming system

## License

This project is private and proprietary.