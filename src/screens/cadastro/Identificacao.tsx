import React, { useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Emoji from '../../components/Emoji'
import Layout from '../../components/Layout'
import ModalMudancaLinguagem from '../../components/ModalMudancaLinguagem'
import TextButton from '../../components/TextButton'
import TextInput from '../../components/TextInput'
import Titulo from '../../components/Titulo'
import CadastroContext from '../../context/ContextCadastro'
import i18n from '../../i18n'
import { HomeNavigationProps } from '../../routes/Home.routes'

const Identificacao = ({ navigation }: HomeNavigationProps) => {
  const { t } = i18n
  const { AvancoParaEtapa2 } = useContext(CadastroContext)
  const [nome, setNome] = useState('')
  const [isModalAberto, setIsModalAberto] = useState(false)
  const botaoVisivel = nome.length > 0

  const handleContinuar = () => {
    AvancoParaEtapa2(nome)
    navigation.navigate('Objetivos')
  }

  const handleChangeNome = (novoNome: string) => {
    setNome(novoNome)
  }

  const handleAbrirModal = () => {
    setIsModalAberto(true)
  }

  const handleFecharModal = () => {
    setIsModalAberto(false)
  }

  return (
    <Layout
      textoBotao={t('cadastro.continuar')}
      exibirBotao={botaoVisivel}
      onButtonClick={handleContinuar}
      testIdBotao="botaoContinuar"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Titulo>
          {t('cadastro.parabens')} <Emoji nome="alegre" />
        </Titulo>

        <TextInput
          label={t('cadastro.perguntaNome')}
          value={nome}
          onChangeText={handleChangeNome}
          testID="inputNome"
        />
        <View style={styles.botaoIdioma}>
          <TextButton
            texto={t('cadastro.mudarIdioma')}
            onPress={handleAbrirModal}
            testID="botaoAbreModal"
          />
        </View>
      </ScrollView>
      <ModalMudancaLinguagem
        isOpen={isModalAberto}
        onFecha={handleFecharModal}
      />
    </Layout>
  )
}

export default Identificacao

const styles = StyleSheet.create({
  container: { flexGrow: 1 },
  botaoIdioma: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 16
  }
})
