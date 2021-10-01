import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import BotaoVoltar from '../../components/BotaoVoltar'
import Container from '../../components/Container'
import Titulo from '../../components/Titulo'
import { IMeditacao } from '../../entities/Meditacao'
import { PlayerNavigationProps } from '../../routes/App.routes'
import GetMeditacaoById from '../../services/meditacoes/GetMeditacaoById'
import Loading from '../../components/Loading'
import AudioPlayer from '../../components/AudioPlayer'

const Player = ({ route }: PlayerNavigationProps) => {
  const { id } = route.params

  const [meditacao, setMeditacao] = useState<IMeditacao>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  useEffect(() => {
    const buscarMeditacao = async () => {
      const novaMeditacao = await new GetMeditacaoById().call(id)
      setMeditacao(novaMeditacao)
    }

    buscarMeditacao()
  }, [])

  const handlePlayPause = (novoEstado: boolean) => {
    setIsPlaying(novoEstado)
  }

  return (
    <Container>
      <BotaoVoltar />
      {meditacao ? (
        <View style={styles.conteudo}>
          <View>
            <View style={styles.titulo}>
              <Titulo centralizado>{meditacao?.nome}</Titulo>
            </View>
          </View>
          <AudioPlayer source={meditacao?.url} onPlayChange={handlePlayPause} />
        </View>
      ) : (
        <Loading />
      )}
    </Container>
  )
}

export default Player

const styles = StyleSheet.create({
  conteudo: {
    flex: 1,
    justifyContent: 'space-between'
  },
  titulo: {
    alignSelf: 'center',
    marginBottom: 16
  }
})
