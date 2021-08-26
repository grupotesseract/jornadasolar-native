import React, { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../../theme'

interface Props {
  children: ReactNode
  mode?: 'contained' | 'outlined'
  onPress?: () => void
  loading?: boolean
}

const Button = ({
  children,
  onPress,
  mode = 'contained',
  loading = false
}: Props) => {
  return (
    <PaperButton
      style={[styles.botao, mode === 'outlined' && styles.borda]}
      mode={mode}
      labelStyle={styles.texto}
      onPress={onPress}
      loading={loading}
    >
      {children}
    </PaperButton>
  )
}

export default Button

const styles = StyleSheet.create({
  botao: {
    padding: 6,
    justifyContent: 'center',
    borderRadius: 100
  },
  texto: {
    fontSize: 20,
    fontWeight: '400',
    textTransform: 'none'
  },
  borda: {
    borderWidth: 2,
    borderColor: theme.colors.primary
  }
})
