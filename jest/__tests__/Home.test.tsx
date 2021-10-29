import React from 'react'
import Home from '../../src/screens/Home'
import { fireEvent, render } from '@testing-library/react-native'
import { navigationTestProps } from './utils'

describe('Teste de componente: Tela Home', () => {
  let props: any
  let home: any
  beforeEach(() => {
    props = navigationTestProps({})
    home = render(<Home {...props} />)
  })

  test('renderiza igual ao último snapshot', () => {
    expect(home.toJSON()).toMatchSnapshot()
  })

  test('botão Login chama navegação para Login', () => {
    const { getByTestId } = home

    const botaoLogin = getByTestId('botaoLogin')
    fireEvent.press(botaoLogin)

    expect(botaoLogin).toBeTruthy()
    expect(props.navigation.navigate).toHaveBeenCalledWith('Login')
  })
  test('botão Cadastro chama navegação para Identificação', () => {
    const { getByTestId } = home

    const botaoCadastro = getByTestId('botaoCadastro')
    expect(botaoCadastro).toBeTruthy()

    fireEvent.press(botaoCadastro)
    expect(props.navigation.navigate).toHaveBeenCalledWith('Identificacao')
  })
})
