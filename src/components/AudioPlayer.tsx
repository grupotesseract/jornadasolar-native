import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { FAB, Paragraph, Text } from 'react-native-paper'
import Slider from '@react-native-community/slider'
import { theme } from '../../theme'
import { Audio } from 'expo-av'
import Loading from './Loading'
import { t } from 'i18n-js'

interface Props {
  source: string
  onPlayChange: (boolean) => void
}

const AudioPlayer = ({ source, onPlayChange }: Props): React.ReactElement => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [erro, setErro] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duracao, setDuracao] = useState(0)
  const iconePlayPause = isPlaying ? 'pause' : 'play'
  const [sound, setSound] = useState(new Audio.Sound())

  const setAudioMode = async () => {
    await Audio.setAudioModeAsync({
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true
    })
  }

  const loadSound = async () => {
    sound
      .loadAsync(
        {
          uri: source
        },
        {
          shouldPlay: false,
          volume: 1,
          progressUpdateIntervalMillis: 1000
        }
      )
      .catch(err => {
        setErro(true)
        console.log('erro no load', err)
      })
  }

  useEffect(() => {
    if (sound._loaded) {
      if (isPlaying) {
        sound
          .playFromPositionAsync(progress)
          .catch(err => console.log('erro no play', err))
      } else {
        sound.pauseAsync().catch(err => console.log('erro no pause', err))
      }
    }
    onPlayChange(isPlaying)
  }, [isPlaying])

  useEffect(() => {
    setAudioMode()
    loadSound().then(() =>
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
    )
    return () => {
      sound.unloadAsync().catch(err => console.log('erro no unload', err))
    }
  }, [])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const onPlaybackStatusUpdate = playbackStatus => {
    if (!playbackStatus.isLoaded) {
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        )
        setErro(true)
      }
    } else {
      setDuracao(playbackStatus.durationMillis)

      if (playbackStatus.isPlaying) {
        setProgress(playbackStatus.positionMillis)
      }

      if (playbackStatus.didJustFinish) {
        handleFimDoAudio()
      }
    }
  }

  const converteDuracaoEmTimeString = (duracao: number): string => {
    duracao = Math.floor(duracao / 1000)
    const horas = Math.floor(duracao / 3600)
    const minutos = Math.floor((duracao % 3600) / 60)
    const segundos = Math.floor(duracao % 60)
    const timeString = [horas, minutos, segundos]
      .map(unit => String(unit).padStart(2, '0'))
      .join(':')
    return horas > 0 ? timeString : timeString.substring(3)
  }

  const handleInteracaoSlider = (value: number) => {
    setProgress(value)
    sound
      .setPositionAsync(value)
      .catch(err => console.log('erro no setPositionAsync', err))
  }

  const handleFimDoAudio = () => {
    setProgress(0)
    setIsPlaying(false)
  }

  if (erro) {
    return (
      <View style={styles.controles}>
        <Text style={styles.mensagemErro}>{t('audio.mensagemErro')}</Text>
      </View>
    )
  }

  return (
    <View style={styles.controles}>
      {!sound._loaded ? (
        <Loading />
      ) : (
        <>
          <FAB
            icon={iconePlayPause}
            onPress={handlePlayPause}
            color={theme.colors.secondary}
          />
          <Slider
            style={styles.slider}
            value={progress}
            minimumValue={0}
            maximumValue={duracao}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.primary}
            thumbTintColor={theme.colors.primary}
            onValueChange={handleInteracaoSlider}
          />
          <View style={styles.tempos}>
            <Paragraph>{converteDuracaoEmTimeString(progress)}</Paragraph>
            <Paragraph>{converteDuracaoEmTimeString(duracao)}</Paragraph>
          </View>
        </>
      )}
    </View>
  )
}

export default AudioPlayer

const styles = StyleSheet.create({
  controles: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32
  },
  slider: { width: '100%', marginTop: 36 },
  tempos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  },
  mensagemErro: {
    marginBottom: 32
  }
})
