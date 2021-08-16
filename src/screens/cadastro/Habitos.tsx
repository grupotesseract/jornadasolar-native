import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Layout from '../../components/Layout'
import Titulo from '../../components/Titulo'
import i18n from '../../i18n'
import { HomeNavigationProps } from '../../routes'

const Habitos = ({ navigation }: HomeNavigationProps) => {
  const { t } = i18n
  const botaoVisivel = true
  const handleContinuar = () => {
    navigation.navigate('Sentimentos')
  }

  return (
    <Layout
      textoBotao={t('cadastro.faltaUmPasso')}
      onButtonClick={handleContinuar}
      exibirBotao={botaoVisivel}
    >
      <ScrollView>
        <Titulo>{t('cadastro.perguntaHabitos')}</Titulo>
      </ScrollView>
    </Layout>
  )
}

export default Habitos
