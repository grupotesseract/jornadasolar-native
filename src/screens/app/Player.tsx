import React, { useEffect, useState } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'
import BotaoVoltar from '../../components/BotaoVoltar'
import Container from '../../components/Container'
import Titulo from '../../components/Titulo'
import { IMeditacao } from '../../entities/Meditacao'
import { PlayerNavigationProps } from '../../routes/App.routes'
import GetMeditacaoById from '../../services/meditacoes/GetMeditacaoById'
import ImagemSol from '../../../assets/icon.png'
import Loading from '../../components/Loading'
import AudioPlayer from '../../components/AudioPlayer'

const Player = ({ route }: PlayerNavigationProps) => {
  const { id } = route.params

  const [meditacao, setMeditacao] = useState<IMeditacao>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [rotationOffset, setRotationOffset] = useState(0)
  let driverRotacao = new Animated.Value(0)
  const grausRotacao = driverRotacao.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  const iniciarRotacao = () => {
    driverRotacao.setOffset(rotationOffset)
    Animated.loop(
      Animated.timing(driverRotacao, {
        toValue: 1,
        duration: 16000,
        useNativeDriver: false,
        easing: Easing.linear
      })
    ).start()
  }

  const pausarRotacao = () => {
    driverRotacao.stopAnimation(e => {
      setRotationOffset(e)
    })
  }

  useEffect(() => {
    if (isPlaying) {
      iniciarRotacao()
    }
  }, [isPlaying])

  useEffect(() => {
    const buscarMeditacao = async () => {
      const novaMeditacao = await new GetMeditacaoById().call(id)
      setMeditacao(novaMeditacao)
    }

    buscarMeditacao()
  }, [])

  const handlePlayPause = (novoEstado: boolean) => {
    if (isPlaying) {
      pausarRotacao()
    }
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
            <View style={styles.containerImagem}>
              <Animated.Image
                source={ImagemSol}
                style={[
                  styles.imagem,
                  { transform: [{ rotate: grausRotacao }] }
                ]}
              />
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
  },
  containerImagem: {
    maxHeight: 200
  },
  imagem: {
    width: '50%',
    maxHeight: 200,
    resizeMode: 'contain',
    alignSelf: 'center'
  }
})
