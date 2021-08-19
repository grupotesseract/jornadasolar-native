import React from 'react'
import { View, KeyboardTypeOptions } from 'react-native'
import { TextInput as PaperInput, HelperText } from 'react-native-paper'
import InputLabel from './InputLabel'

interface Props {
  label: string
  erro?: string
  value: string
  onChangeText?: (((text: string) => void) & Function) | undefined
  keyboardType?: KeyboardTypeOptions
}

const TextInput = ({
  label,
  erro,
  value,
  onChangeText,
  keyboardType = 'default'
}: Props) => {
  return (
    <View>
      <InputLabel texto={label} erro={!!erro} />

      <PaperInput
        onChangeText={onChangeText}
        mode="outlined"
        error={!!erro}
        value={value}
        keyboardType={keyboardType}
      />
      {!!erro && (
        <HelperText type="error" visible={!!erro}>
          {erro}
        </HelperText>
      )}
    </View>
  )
}

export default TextInput
