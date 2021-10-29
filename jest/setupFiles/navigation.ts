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

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {}

  return Reanimated
})

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')
