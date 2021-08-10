import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { FAB, Text } from 'react-native-paper'
import Background from '../../components/Background'
import Emoji from '../../components/Emoji'
import Layout from '../../components/Layout'
import TextInput from '../../components/TextInput'
import Titulo from '../../components/Titulo'
import i18n from '../../i18n'

const Identificacao = () => {
  const { t } = i18n
  const navigator = useNavigation()
  const [nome, setNome] = useState('')
  const botaoVisivel = nome.length > 0

  const handleContinuar = () => {
    navigator.navigate('Home')
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
      <Titulo>
        {t('cadastro.parabens')}
        <Emoji nome="alegre" />
      </Titulo>

      <TextInput
        label={t('cadastro.perguntaNome')}
        value={nome}
        onChangeText={handleChangeNome}
      />
    </Layout>
  )
}

export default Identificacao
