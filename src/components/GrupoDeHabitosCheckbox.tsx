import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'
import { IHabito } from '../entities/Habito'
import { Card, Text } from 'react-native-paper'
import HabitoCheckbox from './HabitoCheckbox'

interface Props {
  grupoDeHabitos: IGrupoDeHabitos
  onChange: (selecao: IGrupoDeHabitos) => void
  grupoHabitosSelecionados?: IGrupoDeHabitos
}

const GrupoDeHabitosCheckbox = ({
  grupoDeHabitos,
  onChange,
  grupoHabitosSelecionados
}: Props) => {
  const [habitosSelecionados, setHabitosSelecionados] = useState<IHabito[]>([])

  useEffect(() => {
    setHabitosSelecionados(
      grupoHabitosSelecionados?.habitos || habitosSelecionados
    )
  }, [grupoHabitosSelecionados])

  const handlePressHabito = (habito: IHabito, wasChecked: boolean) => {
    let novoGrupo = { ...grupoHabitosSelecionados }
    if (wasChecked) {
      const novosSelecionados = habitosSelecionados.filter(
        selecionado => habito.id !== selecionado.id
      )
      novoGrupo.habitos = novosSelecionados
    } else {
      novoGrupo.habitos = [...habitosSelecionados, habito]
    }

    onChange(novoGrupo)
  }

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
              isChecked={habitosSelecionados.some(
                selecionado => habito.id === selecionado.id
              )}
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
    marginBottom: 14,
    textTransform: 'capitalize'
  },
  habitosDoGrupo: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
