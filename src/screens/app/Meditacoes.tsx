import { t } from 'i18n-js'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { FAB, List, Surface } from 'react-native-paper'
import { theme } from '../../../theme'
import Container from '../../components/Container'
import Titulo from '../../components/Titulo'
import { IMeditacao } from '../../entities/Meditacao'
import { AppNavigationProps } from '../../routes/App.routes'
import GetAllMeditacoes from '../../services/meditacoes/GetAllMeditacoes'

const Meditacoes = ({ navigation }: AppNavigationProps) => {
  const [meditacoes, setMeditacoes] = useState<Array<IMeditacao>>([])

  useEffect(() => {
    const getMeditacoes = async () => {
      const meditacoesBanco = await new GetAllMeditacoes().call()
      setMeditacoes(meditacoesBanco)
    }
    getMeditacoes()
  }, [])

  const Item = ({ item }) => (
    <Surface style={styles.itemLista}>
      <List.Item
        title={item.nome}
        description={item.data.toLocaleDateString()}
        right={() => (
          <FAB icon="play" color={theme.colors.secondary} style={styles.fab} />
        )}
        onPress={() => navigation.navigate('Player', { id: item.id })}
      />
    </Surface>
  )

  return (
    <Container>
      <View style={styles.titulo}>
        <Titulo>{t('menuInferior.meditacoes')}</Titulo>
      </View>
      <FlatList
        data={meditacoes}
        renderItem={Item}
        keyExtractor={item => item.id}
      />
    </Container>
  )
}

export default Meditacoes

const styles = StyleSheet.create({
  titulo: {
    alignSelf: 'center',
    marginBottom: 44
  },
  itemLista: {
    borderRadius: 4,
    marginBottom: 14,
    paddingVertical: 2,
    elevation: 2
  },
  fab: {
    alignSelf: 'center',
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
