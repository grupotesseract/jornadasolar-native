import { useFocusEffect } from '@react-navigation/core'
import { t } from 'i18n-js'
import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Paragraph } from 'react-native-paper'
import BotaoVoltar from '../../../components/BotaoVoltar'
import Button from '../../../components/Button'
import Container from '../../../components/Container'
import Titulo from '../../../components/Titulo'
import AuthContext from '../../../context/AuthContext'
import { RootStackScreenProps } from '../../../routes/App.routes'
import AtivarPremium from '../../../services/user/AtivarPremium'
import AtivarTemLivroPromocode from '../../../services/user/AtivarTemLivroPromocode'

const Premium = ({ navigation, route }: RootStackScreenProps<'Premium'>) => {
  const { user, refreshUser } = useContext(AuthContext)
  const destino = route.params?.origem ? null : 'Abas'
  const [isLoading, setIsLoading] = useState(false)

  const ativarPromoCode = () => {
    if (!user.temLivroPromocode) {
      new AtivarTemLivroPromocode().call(user.id)
      refreshUser()
    }
  }

  const voltar = () => {
    if (destino) {
      navigation.navigate(destino)
    } else {
      navigation.goBack()
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      if (!user.premium) {
        setIsLoading(false)
        ativarPromoCode()
      } else {
        voltar()
      }
    }, [])
  )

  const handleAtivar = async () => {
    setIsLoading(true)
    new AtivarPremium().call(user.id)
    await refreshUser()
    voltar()
  }

  return (
    <Container>
      <BotaoVoltar destino={destino} testID="botaoVoltarPremium" />
      <View style={styles.conteudo}>
        <Titulo centralizado>{t('perfil.tituloPremium')}</Titulo>
        <Paragraph style={styles.texto}>{t('perfil.textoPremium')}</Paragraph>
        <Button
          loading={isLoading}
          onPress={handleAtivar}
          testID="botaoAtivarPremium"
        >
          {t('perfil.ativarPremium')}
        </Button>
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
