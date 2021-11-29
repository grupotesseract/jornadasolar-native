import { t } from 'i18n-js'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Paragraph } from 'react-native-paper'
import BotaoVoltar from '../../../components/BotaoVoltar'
import Button from '../../../components/Button'
import Container from '../../../components/Container'
import Titulo from '../../../components/Titulo'

const Premium = () => {
  return (
    <Container>
      <BotaoVoltar />
      <View style={styles.conteudo}>
        <Titulo centralizado>{t('perfil.tituloPremium')}</Titulo>
        <Paragraph style={styles.texto}>{t('perfil.textoPremium')}</Paragraph>
        <Button>{t('perfil.ativarPremium')}</Button>
      </View>
    </Container>
  )
}

export default Premium

const styles = StyleSheet.create({
  conteudo: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  texto: { textAlign: 'center' }
})
