import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import InputLabel from '../../components/InputLabel'
import Layout from '../../components/Layout'
import SentimentosCheckboxGroup from '../../components/SentimentosCheckboxGroup'
import Titulo from '../../components/Titulo'
import { ISentimento } from '../../entities/Sentimento'
import i18n from '../../i18n'
import { HomeNavigationProps } from '../../routes'

const Sentimentos = ({ navigation }: HomeNavigationProps) => {
  const { t } = i18n
  const [itensSelecionados, setItensSelecionados] = useState<ISentimento[]>([])
  const botaoVisivel = itensSelecionados.length > 0

  const handleChangeSelected = (selecionados: ISentimento[]) => {
    setItensSelecionados(selecionados)
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
        <Titulo>{t('cadastro.vamosAjudar')}</Titulo>
        <View style={styles.container}>
          <InputLabel texto={t('cadastro.perguntaSentimentos')} />
          <SentimentosCheckboxGroup onChange={handleChangeSelected} />
        </View>
      </ScrollView>
    </Layout>
  )
}

export default Sentimentos

const styles = StyleSheet.create({
  container: {
    marginTop: 58
  }
})
