import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Emoji from '../../../components/Emoji'
import NavigationList from '../../../components/NavigationList'
import { AppNavigationProps } from '../../../routes/App.routes'
import SignOutUser from '../../../services/user/SignOutUser'
import { MaterialIcons } from '@expo/vector-icons'
import { theme } from '../../../../theme'
import Titulo from '../../../components/Titulo'
import { appVersion } from '../../../utils/appVersion'
import { t } from 'i18n-js'
import Dialogo from '../../../components/Dialogo'
import Novidade from '../../../components/Novidade'
import Telas from '../../../enums/Telas'

const Perfil = ({ navigation }: AppNavigationProps) => {
  const handleSair = () => {
    new SignOutUser().call()
  }
  const [isDialogoOpen, setIsDialogoOpen] = useState(false)

  const abrirDialogo = () => {
    setIsDialogoOpen(true)
  }

  const fecharDialogo = () => {
    setIsDialogoOpen(false)
  }

  const handleMeusDados = () => {
    navigation.navigate('MeusDados')
  }

  const handleNotificacoes = () => {
    navigation.navigate('Notificacoes')
  }

  const ChevronRight = (
    <MaterialIcons name="chevron-right" size={24} color={theme.colors.text} />
  )

  const menus = [
    {
      icone: <Emoji nome="perfil" />,
      texto: t('perfil.meusDados'),
      onPress: handleMeusDados,
      iconeSecundario: ChevronRight
    },
    {
      icone: <Emoji nome="sino" />,
      texto: t('perfil.notificacoes'),
      onPress: handleNotificacoes,
      iconeSecundario: ChevronRight
    },
    {
      icone: <Emoji nome="duvida" />,
      texto: t('perfil.ajuda'),
      onPress: abrirDialogo,
      iconeSecundario: ChevronRight
    },
    {
      icone: <Emoji nome="sair" />,
      texto: t('perfil.sair'),
      onPress: handleSair,
      iconeSecundario: ChevronRight
    }
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titulo}>
          <Titulo>{t('perfil.editarPerfil')}</Titulo>
        </View>
        <Novidade path={Telas.Perfil} isFocused={true} />
      </View>
      <NavigationList itens={menus} />
      <Text style={styles.versao}>
        {t('home.versao')} {appVersion}
      </Text>
      <Dialogo
        titulo={t('perfil.ajuda')}
        conteudo={<Text>{t('perfil.textoAjuda')}</Text>}
        textoBotaoConfirma={t('perfil.ok')}
        onConfirma={fecharDialogo}
        isOpen={isDialogoOpen}
      />
    </View>
  )
}

export default Perfil

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
  titulo: {
    marginLeft: 20,
    marginBottom: 16
  },
  versao: {
    alignSelf: 'center',
    textTransform: 'capitalize'
  },
  header: {
    width: '90%',
    alignSelf: 'center'
  }
})
