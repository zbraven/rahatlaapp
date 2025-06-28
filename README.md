# Rahatla - Stress Relief App

A beautiful React Native app built with Expo for stress relief and relaxation.

## Development Setup for Android Studio

This project is configured to run with Android Studio using Expo Development Build instead of Expo Go.

### Prerequisites

1. **Android Studio** - Install from [developer.android.com](https://developer.android.com/studio)
2. **Node.js** - Version 18 or higher
3. **EAS CLI** - Install globally: `npm install -g eas-cli`
4. **Expo CLI** - Install globally: `npm install -g @expo/cli`

### Setup Steps

1. **Clone and Install Dependencies**
   ```bash
   git clone <your-repo-url>
   cd rahatla
   npm install
   ```

2. **Configure EAS (Expo Application Services)**
   ```bash
   eas login
   eas build:configure
   ```

3. **Generate Native Code**
   ```bash
   npx expo prebuild --clean
   ```
   This creates the `android/` and `ios/` directories with native code.

4. **Open in Android Studio**
   ```bash
   # Open the android directory in Android Studio
   open android/
   # or manually: File > Open > select the android/ folder
   ```

5. **Configure Android Studio**
   - Wait for Gradle sync to complete
   - Make sure you have an Android emulator set up or a physical device connected
   - Select your target device from the device dropdown

6. **Run the Development Build**
   
   **Option A: From Android Studio**
   - Click the "Run" button (green play icon) in Android Studio
   - This will build and install the development client on your device/emulator

   **Option B: From Terminal**
   ```bash
   # Build development client
   eas build --platform android --profile development --local
   
   # Or build in the cloud
   eas build --platform android --profile development
   ```

7. **Start the Development Server**
   ```bash
   npm run dev
   # or
   npx expo start --dev-client
   ```

8. **Connect to Development Server**
   - Open the development build app on your device/emulator
   - Scan the QR code or enter the development server URL
   - The app will load with hot reloading enabled

### Development Workflow

1. **Making Changes**
   - Edit your React Native/TypeScript code
   - Changes will hot reload automatically
   - For native changes, rebuild in Android Studio

2. **Debugging**
   - Use React Native Debugger or Chrome DevTools
   - Android Studio's logcat for native debugging
   - Flipper for advanced debugging (optional)

3. **Building for Testing**
   ```bash
   # Preview build (internal distribution)
   eas build --platform android --profile preview
   
   # Production build
   eas build --platform android --profile production
   ```

### Project Structure

```
rahatla/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
├── constants/             # App constants
├── hooks/                 # Custom hooks
├── localization/          # i18n translations
├── android/               # Native Android code (generated)
├── ios/                   # Native iOS code (generated)
└── assets/                # Static assets
```

### Key Features

- **Tab Navigation** - Home, Breathe, Sounds, Chat, Profile
- **Breathing Exercises** - Guided breathing with animations
- **Sound Therapy** - Relaxing nature sounds
- **Internationalization** - English and Turkish support
- **Beautiful UI** - Modern design with gradients and animations
- **Platform Adaptive** - Works on Android, iOS, and Web

### Troubleshooting

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **Native build issues**
   ```bash
   npx expo prebuild --clean
   cd android && ./gradlew clean
   ```

3. **Dependency issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Android Studio sync issues**
   - File > Invalidate Caches and Restart
   - Make sure Android SDK is properly configured

### Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_URL=https://your-api-url.com
EXPO_PUBLIC_APP_ENV=development
```

### Building for Production

1. **Configure app signing** in Android Studio
2. **Build production APK/AAB**
   ```bash
   eas build --platform android --profile production
   ```
3. **Submit to Google Play Store**
   ```bash
   eas submit --platform android
   ```

For more information, zbsarican@gmail.com
