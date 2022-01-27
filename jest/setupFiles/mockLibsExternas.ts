import {
  View,
  ScrollView as RNScrollView,
  FlatList as RNFlatList
} from 'react-native'

jest.mock('react-native-gesture-handler', () => {
  return {
    ScrollView: RNScrollView,
    NativeViewGestureHandler: View,
    PanGestureHandler: View,
    FlatList: RNFlatList,
    State: {},
    Directions: {},
    gestureHandlerRootHOC: jest.fn(),
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn()
  }
})

jest.mock('expo-localization', () => {
  const locale = 'ptBR'
  return { locale }
})

// Silence the warning: Animated: `useNativeDriver` is not supported
// because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')
