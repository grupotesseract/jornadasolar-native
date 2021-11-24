import React, { ReactNode } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View
} from 'react-native'
import BotaoVoltar from './BotaoVoltar'
import Button from './Button'

interface ILayoutProps {
  children: ReactNode
  textoBotao: ReactNode
  exibirBotao?: boolean
  onButtonClick?: () => void
  loading?: boolean
  iconeBotao?: string
  testIdBotao?: string
  botaoVoltar?: boolean
}

const Layout = ({
  children,
  textoBotao,
  exibirBotao,
  onButtonClick,
  loading = false,
  iconeBotao,
  testIdBotao,
  botaoVoltar
}: ILayoutProps) => {
  const handlePress = () => {
    Keyboard.dismiss()
    onButtonClick()
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      {botaoVoltar && <BotaoVoltar semTexto marginLeft={12} />}
      <View style={[styles.conteudo, exibirBotao && styles.padding]}>
        {children}
        {exibirBotao && (
          <View style={styles.botao}>
            <Button
              onPress={handlePress}
              loading={loading}
              icon={iconeBotao}
              testID={testIdBotao}
            >
              {textoBotao}
            </Button>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  )
}

export default Layout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  conteudo: {
    alignSelf: 'center',
    width: '80%',
    flex: 1
  },
  conteudo: {
    flex: 1
  },
  padding: {
    flex: 1,
    paddingBottom: 80
  },
  botao: {
    position: 'absolute',
    bottom: 20,
    width: '100%'
  }
})
