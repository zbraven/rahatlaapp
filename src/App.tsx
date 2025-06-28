import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { HomeScreen } from '@/screens/HomeScreen';
import { useTheme } from '@/hooks/useTheme';
import '@/localization/i18n';

const App: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <HomeScreen />
    </>
  );
};

export default App;