import React from 'react'
import Login from '../../src/screens/Login'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { navigationTestProps } from './utils'

const mockSignInCall = jest.fn().mockImplementation((email, senha) => {
  if (!email) throw { code: 'auth/invalid-email' }
  if (!senha) throw { code: 'auth/wrong-password' }
})

jest.mock('../../src/services/user/SignInUser', () => {
  return jest.fn().mockImplementation(() => {
    return { call: mockSignInCall }
  })
})

describe('Teste de componente: Tela Login', () => {
  let props: any
  let login: any
  beforeEach(() => {
    props = navigationTestProps({})
    login = render(<Login {...props} />)
    mockSignInCall.mockClear()
  })

  test('renderiza igual ao último snapshot', () => {
    expect(login.toJSON()).toMatchSnapshot()
  })

  test('botão esqueci minha senha chama navegação para EsqueciSenha', () => {
    const { getByTestId } = login
    const botaoEsqueciSenha = getByTestId('botaoEsqueciSenha')
    expect(botaoEsqueciSenha).toBeTruthy()
    fireEvent.press(botaoEsqueciSenha)
    expect(props.navigation.navigate).toHaveBeenCalledWith('EsqueciSenha')
  })

  test('formata e-mail sem espaços e letras maiúsculas', () => {
    const { getByTestId, getByDisplayValue } = login

    const inputEmail = getByTestId('inputEmail')
    expect(inputEmail).toBeTruthy()
    fireEvent.changeText(inputEmail, ' TESTE@TESTE.com ')

    expect(getByDisplayValue('teste@teste.com')).toBeTruthy()
  })

  test('envia email e senha para sign in', () => {
    const { getByTestId } = login

    const inputEmail = getByTestId('inputEmail')
    const inputSenha = getByTestId('inputSenha')

    const botaoEntrar = getByTestId('botaoEntrar')
    expect(botaoEntrar).toBeTruthy()

    fireEvent.changeText(inputEmail, 'teste@teste.com')
    fireEvent.changeText(inputSenha, '123456')
    fireEvent.press(botaoEntrar)

    expect(mockSignInCall).toHaveBeenCalledWith('teste@teste.com', '123456')
  })

  test('apresenta erro de e-mail ao tentar entrar sem e-mail', async () => {
    const { getByTestId } = login
    const botaoEntrar = getByTestId('botaoEntrar')
    fireEvent.press(botaoEntrar)

    await waitFor(() => {
      getByTestId('inputEmailHelper')
    })
  })

  test('apresenta erro de senha ao tentar entrar sem senha', async () => {
    const { getByTestId } = login

    const inputEmail = getByTestId('inputEmail')
    const botaoEntrar = getByTestId('botaoEntrar')
    fireEvent.changeText(inputEmail, 'teste@teste.com')
    fireEvent.press(botaoEntrar)

    await waitFor(() => {
      getByTestId('inputSenhaHelper')
    })
  })
})
