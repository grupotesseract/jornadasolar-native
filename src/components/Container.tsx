import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

interface Props {
  children: ReactNode
}

const Container = ({ children }: Props) => {
  return <View style={styles.container}>{children}</View>
}

export default Container

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center'
  }
})
