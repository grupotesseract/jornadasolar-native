import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Caption, Text } from 'react-native-paper'
import { theme } from '../../theme'
import { IHabito } from '../entities/Habito'
import Emoji from './Emoji'

interface ItemProps {
  habito: IHabito
  onPress: (Habito: IHabito, wasChecked: boolean) => void
  isChecked: boolean
  isEmEdicao?: boolean
  onPressLabel?: (Habito: IHabito) => void
  }

const HabitoCheckbox = ({
  habito,
  onPress,
  isChecked,
  isEmEdicao = false, 
  onPressLabel
}: ItemProps) => {
  const handlePress = () => {
    onPress(habito, isChecked)
  }

  const handlePressLabel = () => {
    if (onPressLabel && isEmEdicao) {
      onPressLabel(habito)
    }
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.botao, isChecked && styles.botaoSelecionado]}
        onPress={handlePress}
        testID={"botaoHabito"+habito.nome}
        accessibilityLabel={"botaoHabito"+habito.nome}
      >
        <Text style={styles.emoji}>
          {habito.emoji && <Emoji emoji={habito.emoji} />}
        </Text>
      </Pressable>

      <Pressable onPress={handlePressLabel} testID={"habitoLabel"+habito.nome}
      accessibilityLabel={"habitoLabel"+habito.nome}>
        <Caption style={styles.texto}>
          {isEmEdicao && <Emoji nome="lapis" />} {habito.nome}
        </Caption>
      </Pressable>
    </View>
  )
}

export default HabitoCheckbox

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 0,
    flexBasis: '33%'
  },
  botao: {
    height: 58,
    width: 58,
    borderRadius: 100,
    backgroundColor: '#4F4F4F',
    alignItems: 'center',
    justifyContent: 'center'
  },
  botaoSelecionado: {
    backgroundColor: theme.colors.primary
  },
  emoji: { fontSize: 18 },
  texto: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 16
  }
})
