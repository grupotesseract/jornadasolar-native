import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Emoji from '../../components/Emoji'
import Layout from '../../components/Layout'
import TextInput from '../../components/TextInput'
import Titulo from '../../components/Titulo'
import i18n from '../../i18n'
import { HomeNavigationProps } from '../../routes'

const Identificacao = ({ navigation }: HomeNavigationProps) => {
  const { t } = i18n
  const [nome, setNome] = useState('')
  const botaoVisivel = nome.length > 0

  const handleContinuar = () => {
    navigation.navigate('Objetivos')
  }

  const handleChangeNome = (novoNome: string) => {
    setNome(novoNome)
  }

  return (
    <Layout
      textoBotao={t('cadastro.continuar')}
      exibirBotao={botaoVisivel}
      onButtonClick={handleContinuar}
    >
      <ScrollView>
        <Titulo>
          {t('cadastro.parabens')} <Emoji nome="alegre" />
        </Titulo>

        <TextInput
          label={t('cadastro.perguntaNome')}
          value={nome}
          onChangeText={handleChangeNome}
        />
      </ScrollView>
    </Layout>
  )
}

export default Identificacao
