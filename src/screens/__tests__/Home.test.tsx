import React from 'react'
import Home from '../Home'
import { fireEvent, render } from '@testing-library/react-native'

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn()
  },
  ...props
})

describe('Teste de componente: Tela Home', () => {
  let props: any
  let home: any
  beforeEach(() => {
    props = createTestProps({})
    home = render(<Home {...props} />)
  })

  it('renderiza igual ao último snapshot', () => {
    expect(home.toJSON()).toMatchSnapshot()
  })

  it('botão Login chama navegação para Login', () => {
    const { getByTestId } = home

    const botaoLogin = getByTestId('botaoLogin')
    fireEvent.press(botaoLogin)

    expect(botaoLogin).toBeTruthy()
    expect(props.navigation.navigate).toHaveBeenCalledWith('Login')
  })
  it('botão Cadastro chama navegação para Identificação', () => {
    const { getByTestId } = home

    const botaoCadastro = getByTestId('botaoCadastro')
    expect(botaoCadastro).toBeTruthy()

    fireEvent.press(botaoCadastro)
    expect(props.navigation.navigate).toHaveBeenCalledWith('Identificacao')
  })
})
