import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '../../theme'
import AuthContext from '../context/AuthContext'
import Telas from '../enums/Telas'
import { INovidade } from '../entities/Novidade'
import GetNovidadeValida from '../services/novidades/GetNovidadeValida'
import DispensarNovidade from '../services/user/DispensarNovidade'
import { t } from 'i18n-js'
import { tsParenthesizedType } from '@babel/types'

interface Props {
  path: Telas
  isFocused: boolean
  testID?: string
}

const Novidade = ({ path, isFocused }: Props) => {
  const { user, refreshUser } = useContext(AuthContext)
  const [visivel, setVisivel] = useState(false)
  const [novidade, setNovidade] = useState<INovidade>()

  const dispensarNovidade = () => {
    new DispensarNovidade().call(novidade.id, user)
    refreshUser()
  }

  useEffect(() => {
    const verificarNovidade = async () => {
      const novidade = await new GetNovidadeValida().call(user, path)
      setNovidade(novidade)
    }
    if (isFocused) {
      verificarNovidade()
    }
  }, [isFocused])

  useEffect(() => {
    setVisivel(!!novidade)
    if (novidade?.autoDispensar) {
      dispensarNovidade()
    }
  }, [novidade])

  const handleOnClose = () => {
    setVisivel(false)
    if (!novidade?.autoDispensar) {
      dispensarNovidade()
    }
  }
  return (
    <View collapsable>
      {visivel && (
        <LinearGradient
          colors={['#4237BF', '#9C37BF']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.container}
        >
          <View style={styles.header}>
            <Text style={styles.titulo}>{novidade?.titulo}</Text>
            <View style={styles.containerNovo}>
              <Text style={styles.novo}>{t('novidade.novo')}</Text>
            </View>
            <IconButton
              style={styles.icone}
              icon="close"
              size={18}
              onPress={handleOnClose}
              testID="handleOnClose"
              accessibilityLabel="handleOnClose"
            />
          </View>
          <Text style={styles.descricao}>{novidade?.descricao}</Text>
        </LinearGradient>
      )}
    </View>
  )
}

export default Novidade

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    paddingBottom: 14,
    paddingTop: 8,
    paddingHorizontal: 12,
    marginBottom: 12
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titulo: {
    fontFamily: 'NunitoSans_700Bold',
    fontSize: 16
  },
  descricao: {
    fontSize: 16
  },
  novo: {
    fontSize: 8,
    fontWeight: '700',
    color: theme.colors.secondary,
    textTransform: 'uppercase'
  },
  containerNovo: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    marginLeft: 8,
    paddingVertical: 2,
    paddingHorizontal: 8
  },
  icone: {
    flex: 1,
    alignItems: 'flex-end'
  }
})
