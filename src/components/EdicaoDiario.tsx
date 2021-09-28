import React, { ReactNode, useContext } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { format } from 'date-fns/esm'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import BotaoVoltar from '../components/BotaoVoltar'
import Layout from './Layout'
import i18n, { dateLocale } from '../i18n'
import AlertContext from '../context/AlertContext'
import { registroSucesso, registroFalha } from '../utils/mensagensAlerta'

interface Props {
  navigation: any
  children: ReactNode
  data: Date
  onSalvar?: () => Promise<void>
}

const EdicaoDiario = ({ navigation, children, data, onSalvar }: Props) => {
  const { t } = i18n
  const { displayAlert } = useContext(AlertContext)

  const handleSalvar = async () => {
    onSalvar()
      .then(() => {
        displayAlert(registroSucesso)
      })
      .catch(() => {
        displayAlert(registroFalha)
      })

    navigation.goBack()
  }

  return (
    <Layout
      textoBotao={t('comum.salvar')}
      exibirBotao
      onButtonClick={handleSalvar}
      iconeBotao="check"
    >
      <ScrollView>
        <BotaoVoltar navigation={navigation} />
        <Text style={styles.data}>
          {format(data, t('comum.formatoDataExtenso'), { locale: dateLocale })}
        </Text>
        {children}
      </ScrollView>
    </Layout>
  )
}

export default EdicaoDiario

const styles = StyleSheet.create({
  data: {
    textTransform: 'lowercase',
    width: '100%',
    textAlign: 'center',
    marginVertical: 23
  }
})
