import { t } from 'i18n-js'
import React from 'react'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Text } from 'react-native-paper'
import { theme } from '../../../../theme'
import NavigationList from '../../../components/NavigationList'
import TituloComVoltar from '../../../components/TituloComVoltar'
import { AppNavigationProps } from '../../../routes/App.routes'

const MeusDados = ({ navigation }: AppNavigationProps) => {
  const ChevronRight = (
    <MaterialIcons name="chevron-right" size={24} color={theme.colors.text} />
  )

  const handleAlterarNome = () => {
    navigation.navigate('AlterarNome')
  }

  const handleAlterarSenha = () => {
    navigation.navigate('AlterarSenha')
  }

  const menus = [
    {
      texto: t('perfil.alterarNome'),
      onPress: handleAlterarNome,
      iconeSecundario: ChevronRight
    },
    {
      texto: t('perfil.alterarSenha'),
      onPress: handleAlterarSenha,
      iconeSecundario: ChevronRight
    }
  ]
  return (
    <View>
      <TituloComVoltar texto={t('perfil.meusDados')} />
      <NavigationList itens={menus} />
    </View>
  )
}

export default MeusDados
