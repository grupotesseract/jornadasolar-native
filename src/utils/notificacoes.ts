import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import { Platform } from 'react-native'
import add from 'date-fns/add'
import { t } from 'i18n-js'
import { format } from 'date-fns'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

async function agendaNotificacaoTresDias() {
  const date = add(new Date(), { days: 3 })
  await Notifications.scheduleNotificationAsync({
    content: {
      title: t('nomeApp'),
      body: t('notificacoes.tresDias'),
      data: {
        link: 'dia',
        params: {
          data: format(date, 'd-M-yyyy')
        }
      }
    },
    trigger: {
      date
    }
  })
}

async function registraTokenParaNotificacoesExternas() {
  let token: string
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      console.log('Erro ao registrar token para notificações push')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync())?.data
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('Jornada', {
      name: 'Jornada Solar',
      importance: Notifications.AndroidImportance.MAX
    })
  }
  return token
}

async function cancelaNotificacoesAgendadas() {
  await Notifications.cancelAllScheduledNotificationsAsync()
}

export {
  agendaNotificacaoTresDias,
  registraTokenParaNotificacoesExternas,
  cancelaNotificacoesAgendadas,
  Notifications
}
