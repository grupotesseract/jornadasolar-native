jest.mock('../../src/utils/notificacoes', () => {
  const agendaNotificacaoTresDias = jest.fn()
  const registraTokenParaNotificacoesExternas = jest
    .fn()
    .mockResolvedValue('ExponentToken[]')
  const cancelaNotificacoesAgendadas = jest.fn()
  return {
    agendaNotificacaoTresDias,
    registraTokenParaNotificacoesExternas,
    cancelaNotificacoesAgendadas
  }
})
