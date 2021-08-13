import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import InputLabel from '../../components/InputLabel'
import Layout from '../../components/Layout'
import TextCheckbox from '../../components/TextCheckbox'
import Titulo from '../../components/Titulo'
import i18n from '../../i18n'
import { HomeNavigationProps } from '../../routes'

const Objetivos = ({ navigation }: HomeNavigationProps) => {
  const { t } = i18n
  const [itensSelecionados, setItensSelecionados] = useState<string[]>([])
  const botaoVisivel = itensSelecionados.length > 0
  const opcoes: string[] = [
    'autoconhecimento',
    'habitos',
    'emocoes',
    'escrever',
    'outros'
  ]

  const handleChangeSelected = (item: string) => {
    if (itensSelecionados.includes(item)) {
      const novosSelecionados = itensSelecionados.filter(i => i !== item)
      setItensSelecionados(novosSelecionados)
    } else {
      setItensSelecionados([...itensSelecionados, item])
    }
  }

  const handleContinuar = () => {
    navigation.navigate('Home')
  }

  return (
    <Layout
      exibirBotao={botaoVisivel}
      onButtonClick={handleContinuar}
      textoBotao={t('cadastro.continuar')}
    >
      <ScrollView>
        <Titulo>{t('cadastro.prazerConhecer', { nome: 'Thais' })}</Titulo>
        <View style={styles.container}>
          <InputLabel texto={t('cadastro.perguntaObjetivos')} />
          {opcoes.map(opcao => (
            <TextCheckbox
              key={opcao}
              texto={`cadastro.objetivos.${opcao}`}
              onPress={handleChangeSelected}
            />
          ))}
        </View>
      </ScrollView>
    </Layout>
  )
}

export default Objetivos

const styles = StyleSheet.create({
  container: {
    marginTop: 58
  }
})
