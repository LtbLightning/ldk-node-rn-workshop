import React from 'react';
import {ImageBackground} from 'react-native';
import {styles} from './styles';
import {MainAppContent} from './components/MainAppContent';

export const App = (): JSX.Element => {
  return (
    <ImageBackground
      source={require('./assets/background.png')}
      style={styles.backgroundImage}>
      <MainAppContent />
    </ImageBackground>
  );
};
