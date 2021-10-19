import { t } from 'i18n-js'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Divider, List, Switch } from 'react-native-paper'
import { theme } from '../../../../theme'
import Button from '../../../components/Button'
import TituloComVoltar from '../../../components/TituloComVoltar'
import AuthContext from '../../../context/AuthContext'
import { AppNavigationProps } from '../../../routes/App.routes'
import GetAllCanais from '../../../services/notificacoes/getAllCanais'
import UpdateCanaisUsuario from '../../../services/notificacoes/updateCanaisUsuario'

const Notificacoes = ({ navigation }: AppNavigationProps) => {
  const { user, refreshUser } = useContext(AuthContext)
  const [canaisAtivos, setCanaisAtivos] = useState<string[]>([])
  const [menus, setMenus] = useState([])

  const toggleNotificacao = id => {
    if (canaisAtivos.includes(id)) {
      const novosCanais = canaisAtivos.filter(canal => canal !== id)
      setCanaisAtivos(novosCanais)
    } else {
      setCanaisAtivos(current => [...current, id])
    }
  }

  useEffect(() => {
    const inicializaCanais = async () => {
      const canais = await new GetAllCanais().call()
      setMenus(canais)
      setCanaisAtivos(user.canaisDeNotificacao)
    }
    inicializaCanais()
  }, [])

  const handleSalvar = () => {
    new UpdateCanaisUsuario().call(user.id, canaisAtivos)
    refreshUser()
    navigation.goBack()
  }

  const Item = ({ item }) => (
    <List.Item
      title={t(`notificacoes.canais.${item.nome}`, {
        defaultValue: item.nome
      })}
      titleStyle={styles.texto}
      right={() => (
        <Switch
          value={canaisAtivos.includes(item.id)}
          onValueChange={() => toggleNotificacao(item.id)}
        />
      )}
      onPress={() => toggleNotificacao(item.id)}
    />
  )

  const Divisor = () => (
    <Divider style={{ backgroundColor: theme.colors.placeholder }} />
  )

  return (
    <View style={styles.container}>
      <TituloComVoltar texto={t('perfil.notificacoes')} />
      <FlatList
        data={menus}
        renderItem={Item}
        keyExtractor={item => item.texto}
        ItemSeparatorComponent={Divisor}
        ListHeaderComponent={Divisor}
        ListFooterComponent={Divisor}
      />
      <View style={styles.botao}>
        <Button onPress={handleSalvar}>{t('comum.salvar')}</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  texto: {
    paddingVertical: 12,
    paddingLeft: 8,
    fontSize: 16
  },
  botao: {
    position: 'absolute',
    bottom: 20,
    width: '80%',
    alignSelf: 'center'
  }
})

export default Notificacoes
