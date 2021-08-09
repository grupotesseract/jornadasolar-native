import React, { useState } from 'react'
import { View } from 'react-native'
import { TextInput as PaperInput, HelperText } from 'react-native-paper'
import InputLabel from './InputLabel'

interface Props {
  label: string
  erro?: string
  value: string
  onChangeText?: (text: string) => void
}

const PasswordInput = ({ label, erro, value, onChangeText }: Props) => {
  const [senhaVisivel, setSenhaVisivel] = useState(false)
  const icone = senhaVisivel ? 'eye' : 'eye-off'

  const handleChangeVisibilidadeSenha = () => {
    setSenhaVisivel(!senhaVisivel)
  }

  return (
    <View>
      <InputLabel texto={label} erro={!!erro} />
      <PaperInput
        onChangeText={onChangeText}
        mode="outlined"
        error={!!erro}
        value={value}
        secureTextEntry={!senhaVisivel}
        right={
          <PaperInput.Icon
            name={icone}
            onPress={handleChangeVisibilidadeSenha}
          />
        }
      />
      {!!erro && (
        <HelperText type="error" visible={!!erro}>
          {erro}
        </HelperText>
      )}
    </View>
  )
}

export default PasswordInput
