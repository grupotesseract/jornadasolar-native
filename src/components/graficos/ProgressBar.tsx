import React, { FC } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../../../theme'
import Emoji from '../Emoji'

interface IProps {
  completed: number
  label: string
  emoji: string
}

const ProgressBar: FC<IProps> = ({ completed, label, emoji }) => {
  const filler = {
    width: `${completed}%`,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: `${completed}%` === '100%' ? 4 : 0,
    borderTopRightRadius: `${completed}%` === '100%' ? 4 : 0
  }

  return (
    <View style={styles.container}>
      <View style={filler}>
        <View style={styles.conteudo}>
          <Text style={styles.label}>{`${Math.round(
            completed
          )}% ${label}`}</Text>
          <Text style={styles.emoji}>
            <Emoji emoji={emoji} />
          </Text>
        </View>
      </View>
    </View>
  )
}

export default ProgressBar
const larguraBarra = Dimensions.get('screen').width * 0.8

const styles = StyleSheet.create({
  container: {
    width: larguraBarra,
    marginTop: 15,
    borderRadius: 4,
    backgroundColor: theme.colors.text
  },
  conteudo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingEnd: 10,
    width: larguraBarra
  },
  label: {
    fontSize: 16,
    marginLeft: 19,
    paddingVertical: 19,
    color: theme.colors.secondary,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  emoji: {
    textAlign: 'right',
    marginRight: 14,
    fontSize: 30
  }
})
