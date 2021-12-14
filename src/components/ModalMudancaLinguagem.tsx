import { logEvent } from 'expo-firebase-analytics'
import { t } from 'i18n-js'
import React, { useState } from 'react'
import { Modal, Pressable, StyleSheet } from 'react-native'
import { Portal, RadioButton, Surface, Text } from 'react-native-paper'
import { theme } from '../../theme'
import { idiomaAtual, idiomasSuportados, setLocale } from '../i18n'

interface Props {
  isOpen: boolean
  onFecha: () => void
  }

const ModalMudancaLinguagem = ({ isOpen, onFecha }: Props) => {
  const handleChangeIdioma = (idioma: string) => {
    setIdiomaSelecionado(idioma)
    setLocale(idioma)
    logEvent('altera_idioma_cadastro')
    onFecha()
  }

  const [idiomaSelecionado, setIdiomaSelecionado] = useState(idiomaAtual)

  return (
    <Portal>
      <Modal
        visible={isOpen}
        onRequestClose={onFecha}
        animationType="slide"
        transparent
      >
        <Pressable onPress={onFecha} testID='botaoFechaModal' style={styles.container}>
          <Surface style={styles.modal}>
            <Text style={styles.titulo}>{t('cadastro.selecioneIdioma')}</Text>
            <RadioButton.Group
              onValueChange={newValue => handleChangeIdioma(newValue)}
              value={idiomaSelecionado}
            >
              {idiomasSuportados.map(opcao => {
                return (
                  <RadioButton.Item
                    key={opcao}
                    value={opcao}
                    label={t(`idiomas.${opcao}`)}
                    position="leading"
                    labelStyle={styles.texto}
                    mode="android"
                    style={styles.radio}
                    testID={'radioButton'+opcao}
                    accessibilityLabel={'radioButton'+opcao}
                  />
                )
              })}
            </RadioButton.Group>
          </Surface>
        </Pressable>
      </Modal>
    </Portal>
  )
}

export default ModalMudancaLinguagem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backdrop
  },
  modal: {
    width: '70%',
    padding: 16
  },
  titulo: {
    color: theme.colors.primary,
    paddingBottom: 8,
    paddingStart: 8,
    fontSize: 20,
    lineHeight: 27
  },
  texto: {
    textAlign: 'left'
  },
  radio: {
    paddingStart: 0
  }
})
