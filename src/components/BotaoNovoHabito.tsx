import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Caption } from 'react-native-paper'
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons'
import { t } from 'i18n-js'
import { theme } from '../../theme'

interface ItemProps {
  onPress: () => void
  loading?: boolean
  }

const BotaoNovoHabito = ({ onPress, loading = false, }: ItemProps) => {
  const handlePress = () => {
    onPress() 
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.botao}>
          <ActivityIndicator color={theme.colors.secondary} size="small" />
        </View>
      ) : (
        <Pressable testID="botaoNovoHabito" accessibilityLabel="botaoNovoHabito" style={styles.botao} onPress={handlePress}>
          <MaterialIcons name="add" size={30} />
        </Pressable>
      )}
      <Caption style={styles.texto}>{t('edicao.novoHabito')}</Caption>
    </View>
  )
}

export default BotaoNovoHabito

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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary
  },
  texto: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 16
  }
})
