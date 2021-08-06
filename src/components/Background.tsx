import React, { ReactNode } from 'react'
import Constants from 'expo-constants'
import { StyleSheet, View } from 'react-native'
import { theme } from '../../theme'

interface Props {
  children: ReactNode
}

const Background = ({ children }: Props) => {
  return <View style={styles.container}>{children}</View>
}

export default Background

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background
  }
})
