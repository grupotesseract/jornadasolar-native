import React, { ReactNode } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
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
    <KeyboardAvoidingView
      style={[styles.container, exibirBotao && styles.padding]}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      {children}
      {exibirBotao && (
        <View style={styles.botao}>
          <Button onPress={onButtonClick}>{textoBotao}</Button>
        </View>
      )}
    </KeyboardAvoidingView>
  )
}

export default Layout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: '80%'
  },
  padding: {
    paddingBottom: 80
  },
  botao: {
    position: 'absolute',
    bottom: 20,
    width: '100%'
  }
})
