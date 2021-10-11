import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import { Platform } from 'react-native'
import add from 'date-fns/add'
import { t } from 'i18n-js'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

async function agendaNotificacaoTresDias() {
  const date = add(new Date(), { days: 3 })
  console.log('notificacao agendada para: ', date.toLocaleDateString())
  await Notifications.scheduleNotificationAsync({
    content: {
      title: t('nomeApp'),
      body: t('notificacoes.tresDias')
    },
    trigger: {
      date
    }
  })
}

async function agendaNotificacaoTeste() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: t('nomeApp'),
      body: t('notificacoes.tresDias')
    },

    trigger: {
      seconds: 5
    }
  })
}

async function registraTokenParaNotificacoesExternas() {
  let token
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
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
  Notifications,
  agendaNotificacaoTresDias,
  agendaNotificacaoTeste,
  registraTokenParaNotificacoesExternas,
  cancelaNotificacoesAgendadas
}
