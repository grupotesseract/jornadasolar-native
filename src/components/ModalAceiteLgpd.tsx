import { t } from 'i18n-js'
import React, { useContext, useState } from 'react'
import { StyleSheet, Modal, View, Linking } from 'react-native'
import { Text, Portal, Surface, Button } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { theme } from '../../theme'
import AuthContext from '../context/AuthContext'
import AceitarPoliticaPrivacidade from '../services/user/AceitarPoliticaPrivacidade'
import UpdateUserTokens from '../services/user/UpdateUserTokens'
import TextButton from './TextButton'

const ModalAceiteLgpd = (): React.ReactElement => {
  const { userId } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(true)
  const insets = useSafeAreaInsets()

  const fechaModal = () => {
    setIsOpen(false)
  }

  const handlePressOk = async () => {
    await new AceitarPoliticaPrivacidade().call(userId)
    await new UpdateUserTokens().add(userId)
    fechaModal()
  }

  // Mudar link quando a página de privacidade estiver em produção
  const handleVerPolitica = () => {
    Linking.openURL(
      'https://jornadasolar-git-develop-grupotesseract.vercel.app/privacidade'
    )
  }

  return (
    <Portal>
      <Modal
        visible={isOpen}
        animationType="slide"
        onRequestClose={fechaModal}
        transparent
      >
        <View style={[styles.container, { marginBottom: insets.bottom + 62 }]}>
          <Surface style={styles.modal}>
            <Text>{t('aceitePolitica.respeitamos')}</Text>
            <Text>{t('aceitePolitica.declaracao')}</Text>
            <View style={styles.textButton}>
              <TextButton
                texto={t('aceitePolitica.conheca')}
                onPress={handleVerPolitica}
                testID="BotaoVerPolitica"
              />
            </View>
            <Button
              onPress={handlePressOk}
              testID="BotaoOk"
              accessibilityLabel="BotaoOk"
              mode="contained"
              style={styles.okButton}
            >
              {t('aceitePolitica.botao')}
            </Button>
          </Surface>
        </View>
      </Modal>
    </Portal>
  )
}

export default ModalAceiteLgpd

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: theme.colors.backdrop
  },
  modal: {
    padding: 32
  },
  okButton: {
    borderRadius: 100,
    marginHorizontal: 32
  },
  textButton: {
    marginVertical: 16
  }
})
