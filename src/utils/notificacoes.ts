import * as Notifications from 'expo-notifications'
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

async function agendaNotificacaoTresDias(): Promise<void> {
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

async function agendaNotificacaoSeteDias(): Promise<void> {
  const date = add(new Date(), { days: 7 })
  await Notifications.scheduleNotificationAsync({
    content: {
      title: t('nomeApp'),
      body: t('notificacoes.tresDias'),
      data: {
        link: 'dia',
        params: {
          data: format(date, 'd-M-yyy')
        }
      }
    },
    trigger: {
      date
    }
  })
}

async function agendaNotificacaoQuinzeDias(): Promise<void> {
  const date = add(new Date(), { days: 15 })
  await Notifications.scheduleNotificationAsync({
    content: {
      title: t('nomeApp'),
      body: t('notificacoes.tresDias'),
      data: {
        link: 'dia',
        params: {
          data: format(date, 'd-M-yyy')
        }
      }
    },
    trigger: {
      date
    }
  })
}

async function registraTokenParaNotificacoesExternas(): Promise<string> {
  let token: string
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      return
    }

    token = (await Notifications.getExpoPushTokenAsync()).data

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('Jornada', {
        name: 'Jornada Solar',
        importance: Notifications.AndroidImportance.MAX
      })
    }
  } catch (e) {
    token = ''
  }

  return token
}

async function cancelaNotificacoesAgendadas(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync()
}

export {
  agendaNotificacaoTresDias,
  agendaNotificacaoSeteDias,
  agendaNotificacaoQuinzeDias,
  registraTokenParaNotificacoesExternas,
  cancelaNotificacoesAgendadas,
  Notifications
}
