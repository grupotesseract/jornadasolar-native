import React from 'react'
import { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Caption, Text } from 'react-native-paper'
import { theme } from '../../theme'
import { IHabito } from '../entities/Habito'
import Emoji from './Emoji'

interface ItemProps {
  habito: IHabito
  onPress: (Habito: IHabito) => void
}

const HabitoCheckbox = ({ habito, onPress }: ItemProps) => {
  const [isChecked, setIsChecked] = useState(false)

  const handlePress = () => {
    setIsChecked(!isChecked)
    onPress(habito)
  }
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.botao, isChecked && styles.botaoSelecionado]}
        onPress={handlePress}
      >
        <Text style={styles.emoji}>
          {habito.emoji && <Emoji emoji={habito.emoji} />}
        </Text>
      </Pressable>
      <Caption style={styles.texto}>{habito.nome}</Caption>
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
  texto: { textAlign: 'center', marginTop: 5, marginBottom: 16 }
})
