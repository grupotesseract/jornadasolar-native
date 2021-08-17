import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import GrupoDeHabitosCheckboxGroup from '../../components/GrupoDeHabitosCheckboxGroup'
import Layout from '../../components/Layout'
import Titulo from '../../components/Titulo'
import { IGrupoDeHabitos } from '../../entities/GrupoDeHabitos'
import i18n from '../../i18n'
import { HomeNavigationProps } from '../../routes'

const Habitos = ({ navigation }: HomeNavigationProps) => {
  const { t } = i18n
  const [gruposDeHabitosSelecionados, setGruposDeHabitosSelecionados] =
    useState<Array<IGrupoDeHabitos>>([])
  const botaoVisivel = gruposDeHabitosSelecionados.some(
    grupo => grupo.habitos.length > 0
  )
  const handleContinuar = () => {
    navigation.navigate('Sentimentos')
  }

  const handleChangeSelected = (selecionados: Array<IGrupoDeHabitos>) => {
    setGruposDeHabitosSelecionados(selecionados)
  }

  return (
    <Layout
      textoBotao={t('cadastro.faltaUmPasso')}
      onButtonClick={handleContinuar}
      exibirBotao={botaoVisivel}
    >
      <ScrollView>
        <Titulo>{t('cadastro.perguntaHabitos')}</Titulo>
        <View style={styles.containerHabitos}>
          <GrupoDeHabitosCheckboxGroup
            onChangeSelection={handleChangeSelected}
          />
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
