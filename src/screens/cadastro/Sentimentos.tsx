import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import InputLabel from '../../components/InputLabel'
import Layout from '../../components/Layout'
import SentimentosCheckboxGroup from '../../components/SentimentosCheckboxGroup'
import Titulo from '../../components/Titulo'
import CadastroContext from '../../context/ContextCadastro'
import i18n from '../../i18n'
import { HomeNavigationProps } from '../../routes/Home.routes'

const Sentimentos = ({
  navigation
}: HomeNavigationProps): React.ReactElement => {
  const { t } = i18n
  const { salvaSentimentos, dadosCadastro } = useContext(CadastroContext)

  const botaoVisivel = dadosCadastro.sentimentos.length > 0

  const handleChangeSelected = (selecionados: string[]) => {
    salvaSentimentos(selecionados)
  }

  const handleContinuar = () => {
    navigation.navigate('CadastroHabitos')
  }

  return (
    <Layout
      exibirBotao={botaoVisivel}
      onButtonClick={handleContinuar}
      textoBotao={t('cadastro.continuar')}
      testIdBotao="botaoContinuar"
      botaoVoltar
    >
      <ScrollView>
        <Titulo>{t('cadastro.vamosAjudar')}</Titulo>
        <View style={styles.container}>
          <InputLabel texto={t('cadastro.perguntaSentimentos')} />
          <SentimentosCheckboxGroup
            idsSelecionados={dadosCadastro.sentimentos}
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
