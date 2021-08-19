import React, { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from './Button'

interface ILayoutProps {
  children: ReactNode
  textoBotao: ReactNode
  exibirBotao?: boolean
  onButtonClick?: () => void
}

const Layout = ({
  children,
  textoBotao,
  exibirBotao,
  onButtonClick
}: ILayoutProps) => {
  return (
    <View style={styles.container}>
      {children}
      {exibirBotao && (
        <View style={styles.botao}>
          <Button onPress={onButtonClick}>{textoBotao}</Button>
        </View>
      )}
    </View>
  )
}

export default Layout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: '80%'
  },
  botao: {
    position: 'absolute',
    bottom: 20,
    width: '100%'
  }
})
