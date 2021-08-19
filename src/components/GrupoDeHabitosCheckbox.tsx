import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'
import { IHabito } from '../entities/Habito'
import { Card, Text } from 'react-native-paper'
import HabitoCheckbox from './HabitoCheckbox'

interface Props {
  grupoDeHabitos: IGrupoDeHabitos
  onChange: (selecao: IGrupoDeHabitos) => void
}

const GrupoDeHabitosCheckbox = ({ grupoDeHabitos, onChange }: Props) => {
  const [habitosSelecionados, setHabitosSelecionados] = useState<IHabito[]>([])

  const handlePressHabito = (habito: IHabito) => {
    if (habitosSelecionados.some(selecionado => habito.id === selecionado.id)) {
      const novosSelecionados = habitosSelecionados.filter(
        selecionado => habito.id !== selecionado.id
      )
      setHabitosSelecionados(novosSelecionados)
    } else {
      setHabitosSelecionados([...habitosSelecionados, habito])
    }
  }

  useEffect(() => {
    const novoGrupo = { ...grupoDeHabitos, habitos: habitosSelecionados }
    onChange(novoGrupo)
  }, [habitosSelecionados])

  return (
    <Card style={styles.cardGruposDeHabitos}>
      <Card.Content style={styles.conteudoCard}>
        <Text style={styles.tituloCard}>{grupoDeHabitos.nome}</Text>
        <View style={styles.habitosDoGrupo}>
          {grupoDeHabitos.habitos.map(habito => (
            <HabitoCheckbox
              key={habito.nome}
              habito={habito}
              onPress={handlePressHabito}
            />
          ))}
        </View>
      </Card.Content>
    </Card>
  )
}

export default GrupoDeHabitosCheckbox

const styles = StyleSheet.create({
  cardGruposDeHabitos: {
    marginBottom: 10
  },
  conteudoCard: {
    alignItems: 'center'
  },
  tituloCard: {
    marginBottom: 14
  },
  habitosDoGrupo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
})
