import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import InputLabel from '../../components/InputLabel'
import Layout from '../../components/Layout'
import TextCheckbox from '../../components/TextCheckbox'
import Titulo from '../../components/Titulo'
import CadastroContext from '../../context/ContextCadastro'
import i18n from '../../i18n'
import { HomeNavigationProps } from '../../routes/Home.routes'

const Objetivos = ({ navigation }: HomeNavigationProps): React.ReactElement => {
  const { t } = i18n
  const { salvaObjetivos, dadosCadastro } = useContext(CadastroContext)
  const nome = dadosCadastro.nome
  const botaoVisivel = dadosCadastro.objetivos.length > 0
  const opcoes: string[] = [
    'autoconhecimento',
    'habitos',
    'emocoes',
    'escrever',
    'outros'
  ]

  const handleChangeSelected = (item: string) => {
    if (dadosCadastro.objetivos.includes(item)) {
      const novosSelecionados = dadosCadastro.objetivos.filter(i => i !== item)
      salvaObjetivos(novosSelecionados)
    } else {
      salvaObjetivos([...dadosCadastro.objetivos, item])
    }
  }

  const handleContinuar = () => {
    navigation.navigate('CadastroSentimentos')
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
        <Titulo>{t('cadastro.prazerConhecer', { nome })}</Titulo>
        <View style={styles.container}>
          <InputLabel texto={t('cadastro.perguntaObjetivos')} />
          {opcoes.map(opcao => (
            <TextCheckbox
              key={opcao}
              value={opcao}
              isChecked={dadosCadastro.objetivos.includes(opcao)}
              texto={t(`cadastro.objetivos.${opcao}`)}
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
