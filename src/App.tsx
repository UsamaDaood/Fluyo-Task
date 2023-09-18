import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AppNavigator from './appNavigator/Navigator';
function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top']}
        style={{
          flex: 1,
        }}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
