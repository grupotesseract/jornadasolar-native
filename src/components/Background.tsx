import React, { ReactNode } from 'react'
import Constants from 'expo-constants'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { StyleProp } from 'react-native'
import { theme } from '../../theme'

interface Props {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const Background = ({ children, style }: Props) => {
  return <View style={[styles.container, style]}>{children}</View>
}

export default Background

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background
  }
})
