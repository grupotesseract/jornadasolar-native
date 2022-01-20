import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import BotaoVoltar from '../../components/BotaoVoltar'
import Titulo from '../../components/Titulo'
import { IMeditacao } from '../../entities/Meditacao'
import { PlayerNavigationProps } from '../../routes/App.routes'
import GetMeditacaoById from '../../services/meditacoes/GetMeditacaoById'
import ImagemSol from '../../../assets/icon.png'
import Loading from '../../components/Loading'
import AudioPlayer from '../../components/AudioPlayer'
import SpiningImage from '../../components/SpiningImage'

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
    <ScrollView contentContainerStyle={styles.container}>
      <BotaoVoltar destino="Meditacoes" />
      {meditacao ? (
        <View style={styles.conteudo}>
          <View>
            <View style={styles.titulo}>
              <Titulo centralizado>{meditacao?.nome}</Titulo>
            </View>
            <View style={styles.containerImagem}>
              <SpiningImage
                isSpining={isPlaying}
                source={ImagemSol}
                imageStyle={styles.imagem}
              />
            </View>
          </View>
          <AudioPlayer source={meditacao?.url} onPlayChange={handlePlayPause} />
        </View>
      ) : (
        <Loading />
      )}
    </ScrollView>
  )
}

export default Player

const styles = StyleSheet.create({
  conteudo: {
    flex: 1,
    justifyContent: 'space-between'
  },
  container: {
    flexGrow: 1,
    width: '90%',
    alignSelf: 'center'
  },
  titulo: {
    alignSelf: 'center',
    marginBottom: 16
  },
  containerImagem: {
    maxHeight: 200
  },
  imagem: {
    width: '50%',
    maxHeight: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 200
  }
})
