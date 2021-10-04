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

interface Props {
  path: Telas
  isFocused: boolean
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
            <Text style={styles.novo}>{t('novidade.novo')}</Text>
            <IconButton
              style={styles.icone}
              icon="close"
              size={18}
              onPress={handleOnClose}
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
    width: '90%',
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
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginLeft: 8
  },
  icone: {
    flex: 1,
    alignItems: 'flex-end'
  }
})
