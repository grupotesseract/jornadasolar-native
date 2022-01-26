import React, { useState, useContext } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { theme } from '../../../theme'
import Saudacao from '../../components/Saudacao'
import AuthContext from '../../context/AuthContext'
import { t } from 'i18n-js'
import { AppNavigationProps } from '../../routes/App.routes'
import getFaseDaLua from '../../utils/getFaseDaLua'
import getSigno from '../../utils/getSigno'
import { useFocusEffect } from '@react-navigation/core'
import Novidade from '../../components/Novidade'
import Telas from '../../enums/Telas'
import RegistrarAcesso from '../../services/user/RegistrarAcesso'
import ModalAceiteLgpd from '../../components/ModalAceiteLgpd'
import Registros from '../../components/Registros'

const Diario = ({ navigation }: AppNavigationProps): React.ReactElement => {
  const { userName, user } = useContext(AuthContext)
  const today = new Date()
  const [isFocused, setIsFocused] = useState(true)

  const signo = getSigno(today)
  const faseDaLua = getFaseDaLua(today)

  useFocusEffect(
    React.useCallback(() => {
      new RegistrarAcesso().call(user)
      setIsFocused(true)
      return () => setIsFocused(false)
    }, [])
  )

  return (
    <ScrollView>
      <View style={styles.conteudo}>
        <View style={styles.topo}>
          <Saudacao nome={userName} />
          <View style={styles.textos}>
            <Text style={styles.textoPreto}>
              {t('diario.mensagemSol', { signo })}
            </Text>
            <Text style={styles.textoPreto}>
              {t('diario.mensagemLua', { faseDaLua })}
            </Text>
          </View>
          <View style={styles.oval}></View>
        </View>
      </View>
      <View style={styles.conteudo}>
        <Novidade path={Telas.Diario} isFocused={isFocused} />
        {user.aceitouPolitica || <ModalAceiteLgpd />}
      </View>
      <Registros isFocused={isFocused} navigation={navigation} />
    </ScrollView>
  )
}

export default Diario

const tela = Dimensions.get('screen').width
const corPreta = theme.colors.secondary
const styles = StyleSheet.create({
  topo: {
    position: 'relative'
  },
  oval: {
    backgroundColor: theme.colors.primary,
    width: tela,
    height: tela,
    borderBottomLeftRadius: tela,
    borderBottomRightRadius: tela,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: -1,
    bottom: -25,
    transform: [{ scaleX: 1.5 }]
  },
  conteudo: {
    width: '90%',
    alignSelf: 'center'
  },
  textoPreto: {
    color: corPreta,
    textAlign: 'center',
    fontSize: 16
  },
  textos: {
    marginVertical: 8
  }
})
