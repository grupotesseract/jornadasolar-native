import React from 'react'
import { View, KeyboardTypeOptions } from 'react-native'
import { TextInput as PaperInput, HelperText } from 'react-native-paper'
import InputLabel from './InputLabel'

interface Props {
  label: string
  erro?: string
  value: string
  onChangeText?: (text: string) => void | undefined
  onBlur?: () => void
  keyboardType?: KeyboardTypeOptions
  testID?: string
}

const TextInput = ({
  label,
  erro,
  value,
  onChangeText,
  keyboardType = 'default',
  testID,
  onBlur
}: Props): React.ReactElement => {
  return (
    <View>
      <InputLabel texto={label} erro={!!erro} />

      <PaperInput
        onChangeText={onChangeText}
        mode="outlined"
        error={!!erro}
        value={value}
        keyboardType={keyboardType}
        style={{ backgroundColor: 'transparent' }}
        accessibilityLabel={testID}
        testID={testID}
        onBlur={onBlur}
      />
      {!!erro && (
        <HelperText type="error" visible={!!erro} testID={`${testID}Helper`}>
          {erro}
        </HelperText>
      )}
    </View>
  )
}

export default TextInput
