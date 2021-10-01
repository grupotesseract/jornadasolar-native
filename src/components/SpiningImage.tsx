import React, { useEffect, useState } from 'react'
import { Animated, Easing, ImageStyle, ImageURISource } from 'react-native'

interface Props {
  isSpining: boolean
  source: ImageURISource
  imageStyle: ImageStyle
}

const SpiningImage = ({ isSpining, source, imageStyle }: Props) => {
  const [rotationOffset, setRotationOffset] = useState(0)
  const [driverRotacao, setdriverRotacao] = useState(new Animated.Value(0))
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
    if (isSpining) {
      iniciarRotacao()
    } else {
      pausarRotacao()
    }
  }, [isSpining])

  return (
    <Animated.Image
      source={source}
      style={[imageStyle, { transform: [{ rotate: grausRotacao }] }]}
    />
  )
}

export default SpiningImage
