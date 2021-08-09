import { DarkTheme } from 'react-native-paper'
import { DarkTheme as navigationDarkTheme } from '@react-navigation/native'

const nunito = {
  regular: {
    fontFamily: 'NunitoSans_400Regular',
    fontWeight: '400' as '400'
  },
  medium: {
    fontFamily: 'NunitoSans_700Bold',
    fontWeight: '700' as '700'
  },
  light: {
    fontFamily: 'NunitoSans_300Light',
    fontWeight: '300' as '300'
  },
  thin: {
    fontFamily: 'NunitoSans_300Light',
    fontWeight: '300' as '300'
  },
  extraBold: {
    fontFamily: 'NunitoSans_800ExtraBold',
    fontWeight: '800' as '800'
  },
  black: {
    fontFamily: 'NunitoSans_900Black',
    fontWeight: '900' as '900'
  }
}

export const fontConfig = {
  ios: nunito,
  android: nunito
}

export const theme = {
  ...navigationDarkTheme,
  ...DarkTheme,
  colors: {
    ...navigationDarkTheme.colors,
    ...DarkTheme.colors,
    primary: '#F7C92A',
    accent: '#F7C92A',
    secondary: '#000000',
    background: '#000000',
    surface: '#000000',
    error: '#f44336'
  }
}
