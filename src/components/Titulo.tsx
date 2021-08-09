import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

interface Props {
  children: ReactNode
}

const Titulo = ({ children }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

export default Titulo

const styles = StyleSheet.create({
  container: { marginTop: 36 },
  text: {
    fontFamily: 'NunitoSans_800ExtraBold',
    fontSize: 32
  }
})
