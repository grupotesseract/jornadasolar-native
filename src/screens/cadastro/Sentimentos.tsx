import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import InputLabel from '../../components/InputLabel'
import Layout from '../../components/Layout'
import SentimentosCheckboxGroup from '../../components/SentimentosCheckboxGroup'
import Titulo from '../../components/Titulo'
import CadastroContext from '../../context/ContextCadastro'
import i18n from '../../i18n'
import { HomeNavigationProps } from '../../routes/Home.routes'

const Sentimentos = ({ navigation }: HomeNavigationProps) => {
  const { t } = i18n
  const { AvancoParaEtapa4 } = useContext(CadastroContext)
  const [itensSelecionados, setItensSelecionados] = useState<string[]>([])
  const botaoVisivel = itensSelecionados.length > 0

  const handleChangeSelected = (selecionados: string[]) => {
    setItensSelecionados(selecionados)
  }

  const handleContinuar = () => {
    AvancoParaEtapa4(itensSelecionados)
    navigation.navigate('Habitos')
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
          <SentimentosCheckboxGroup
            idsSelecionados={itensSelecionados}
            onChange={handleChangeSelected}
          />
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
