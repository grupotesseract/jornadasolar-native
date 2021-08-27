import React from 'react'
import { useContext } from 'react'
import { StyleSheet, View, Dimensions, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../../../theme'
import Saudacao from '../../components/Saudacao'
import AuthContext from '../../context/AuthContext'
import i18n from '../../i18n'
import { AppNavigationProps } from '../../routes/App.routes'
import getFaseDaLua from '../../utils/getFaseDaLua'
import getSigno from '../../utils/getSigno'

const Diario = ({ navigation }: AppNavigationProps) => {
  const { user } = useContext(AuthContext)
  const { t } = i18n
  const handlePerfil = () => {
    navigation.navigate('Perfil')
  }
  const signo = getSigno(new Date())
  const faseDaLua = getFaseDaLua(new Date())

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePerfil}>
        <Text style={styles.linkPerfil}>{t('diario.perfil')}</Text>
      </Pressable>
      <View style={styles.conteudo}>
        <View style={styles.topo}>
          <Saudacao nome={user.nome} />
          <Text style={styles.textoPreto}>
            {t('diario.mensagem.inicio')}
            <Text style={styles.negrito}>{t('diario.mensagem.sol')}</Text>{' '}
            {t('diario.mensagem.final', { signo, faseDaLua })}
          </Text>
          <View style={styles.oval}></View>
        </View>
      </View>
    </View>
  )
}

export default Diario

const tela = Dimensions.get('screen').width

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topo: {
    width: '100%',
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
    color: theme.colors.secondary,
    textAlign: 'center',
    marginVertical: 14,
    fontSize: 16
  },
  linkPerfil: {
    color: theme.colors.secondary,
    textAlign: 'right',
    fontSize: 10,
    paddingTop: 4,
    paddingRight: 8
  },
  negrito: {
    color: theme.colors.secondary,
    fontWeight: 'bold'
  }
})
