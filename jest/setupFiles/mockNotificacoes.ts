jest.mock('../../src/utils/notificacoes', () => {
  const agendaNotificacaoTresDias = jest.fn()
  const agendaNotificacaoSeteDias = jest.fn()
  const agendaNotificacaoQuinzeDias = jest.fn()
  const registraTokenParaNotificacoesExternas = jest
    .fn()
    .mockResolvedValue('ExponentToken[]')
  const cancelaNotificacoesAgendadas = jest.fn()
  return {
    agendaNotificacaoTresDias,
    agendaNotificacaoSeteDias,
    agendaNotificacaoQuinzeDias, 
    registraTokenParaNotificacoesExternas,
    cancelaNotificacoesAgendadas
  }
})
