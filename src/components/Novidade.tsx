import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '../../theme'

const Novidade = () => {
  return (
    <LinearGradient
      colors={['#4237BF', '#9C37BF']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.titulo}>Modelo de titulo comprido</Text>
        <Text style={styles.novo}>novidade</Text>
        <IconButton style={styles.icone} icon="close" size={18} />
      </View>
      <Text style={styles.descricao}>
        Se juntar com uma descrição igualmente comprida, não deve ficar ruim
        tambem, pelo menos é o que se espera
      </Text>
    </LinearGradient>
  )
}

export default Novidade

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingBottom: 14,
    paddingTop: 8,
    paddingHorizontal: 12
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16
  },
  descricao: {
    fontSize: 16
  },
  novo: {
    fontSize: 8,
    fontWeight: 'bold',
    backgroundColor: theme.colors.primary,
    color: theme.colors.secondary,
    textTransform: 'uppercase',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 10,
    marginLeft: 8
  },
  icone: {
    flex: 1,
    alignItems: 'flex-end'
  }
})
