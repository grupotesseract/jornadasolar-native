import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import GrupoDeHabitosCheckboxGroup from '../../components/GrupoDeHabitosCheckboxGroup'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import Titulo from '../../components/Titulo'
import CadastroContext from '../../context/ContextCadastro'
import { IGrupoDeHabitos } from '../../entities/GrupoDeHabitos'
import i18n from '../../i18n'
import { HomeNavigationProps } from '../../routes/Home.routes'
import { getGruposDeHabitosTemplate } from '../../utils/getGruposDeHabitos'

const Habitos = ({ navigation }: HomeNavigationProps) => {
  const { t } = i18n
  const { AvancoParaEtapa5 } = useContext(CadastroContext)

  const [isLoading, setIsLoading] = useState(true)
  const [gruposSelecionados, setGruposSelecionados] = useState<
    Array<IGrupoDeHabitos>
  >([])

  useEffect(() => {
    const getTemplate = async () => {
      const template = await getGruposDeHabitosTemplate()
      setGruposSelecionados(template)
      setIsLoading(false)
    }
    getTemplate()
  }, [])

  const botaoVisivel = gruposSelecionados.some(
    grupo => grupo.habitos.length > 0
  )
  const handleContinuar = () => {
    AvancoParaEtapa5(gruposSelecionados)
    navigation.navigate('DadosAutenticacao')
  }

  const handleChangeSelected = (selecionados: Array<IGrupoDeHabitos>) => {
    setGruposSelecionados(selecionados)
  }

  return (
    <Layout
      textoBotao={t('cadastro.faltaUmPasso')}
      onButtonClick={handleContinuar}
      exibirBotao={botaoVisivel}
      testIdBotao="botaoContinuar"
    >
      <ScrollView>
        <Titulo>{t('cadastro.perguntaHabitos')}</Titulo>
        <View style={styles.containerHabitos}>
          {isLoading ? (
            <Loading />
          ) : (
            <GrupoDeHabitosCheckboxGroup
              onChangeSelection={handleChangeSelected}
              gruposSelecionados={gruposSelecionados}
            />
          )}
        </View>
      </ScrollView>
    </Layout>
  )
}

export default Habitos

const styles = StyleSheet.create({
  containerHabitos: {
    marginTop: 58
  }
})
