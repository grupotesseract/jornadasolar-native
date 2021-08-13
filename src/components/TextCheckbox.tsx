import React from 'react'
import { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Text, Title } from 'react-native-paper'
import { theme } from '../../theme'
import i18n from '../i18n'

interface ItemProps {
  texto: string
  onPress: (value: string) => void
}

const TextCheckbox = ({ texto, onPress }: ItemProps) => {
  const { t } = i18n
  const [isChecked, setIsChecked] = useState(false)
  const TextWrapper = isChecked ? Title : Text

  const handlePress = () => {
    setIsChecked(!isChecked)
    onPress(texto)
  }

  return (
    <Pressable
      style={[styles.botao, isChecked && styles.botaoSelecionado]}
      onPress={handlePress}
    >
      <TextWrapper style={styles.texto}>{t(texto)}</TextWrapper>
    </Pressable>
  )
}

export default TextCheckbox

const styles = StyleSheet.create({
  botao: {
    height: 65,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: theme.colors.placeholder,
    paddingLeft: 20,
    justifyContent: 'center'
  },
  texto: {
    fontSize: 18
  },
  botaoSelecionado: {
    borderColor: theme.colors.primary
  }
})
