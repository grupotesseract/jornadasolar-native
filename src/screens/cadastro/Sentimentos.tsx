import React, { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { theme } from '../../../theme'
import EmojiComNome from '../../components/EmojiComNome'
import InputLabel from '../../components/InputLabel'
import Layout from '../../components/Layout'
import SentimentoCheckbox from '../../components/SentimentoCheckbox'
import SentimentosCheckboxGroup from '../../components/SentimentosCheckboxGroup'
import TextCheckbox from '../../components/TextCheckbox'
import Titulo from '../../components/Titulo'
import i18n from '../../i18n'
import { HomeNavigationProps } from '../../routes'
import getSentimentosIniciais from '../../utils/getSentimentosIniciais'

const Sentimentos = ({ navigation }: HomeNavigationProps) => {
  const { t } = i18n
  const [itensSelecionados, setItensSelecionados] = useState<string[]>([])
  const botaoVisivel = itensSelecionados.length > 0

  const handleChangeSelected = (selecionados: string[]) => {
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
