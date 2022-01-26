import format from 'date-fns/format'
import React from 'react'
import { Dimensions, StyleSheet, Pressable } from 'react-native'
import { Caption, Text } from 'react-native-paper'
import { theme } from '../../theme'
import { dateLocale } from '../i18n'

interface Props {
  data: Date
  onPress?: (data: Date) => void
  disabled?: boolean
  selected?: boolean
}

const DateListItem = ({
  data,
  onPress,
  disabled = false,
  selected
}: Props): React.ReactElement => {
  const diaSemanaFormatado = format(data, 'EEE ', {
    locale: dateLocale
  }).substring(0, 3)
  const handlePress = () => {
    if (!disabled && onPress) onPress(data)
  }

  return (
    <Pressable
      disabled={disabled}
      style={[
        styles.container,
        selected && styles.selectedBox,
        disabled && styles.disabledBox
      ]}
      onPress={handlePress}
    >
      <Caption
        style={[
          selected && styles.selectedText,
          disabled && styles.disabledText
        ]}
      >
        {diaSemanaFormatado}
      </Caption>
      <Text
        style={[
          styles.dia,
          selected && styles.selectedText,
          disabled && styles.disabledText
        ]}
      >
        {format(data, 'dd')}
      </Text>
    </Pressable>
  )
}

export default DateListItem

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width / 8,
    borderColor: theme.colors.text,
    backgroundColor: theme.colors.surface,
    borderWidth: 0.5,
    borderRadius: 8,
    margin: 6,
    textAlign: 'center',
    alignItems: 'center',
    paddingBottom: 4
  },
  dia: { fontSize: 20 },
  selectedBox: {
    backgroundColor: theme.colors.onSurface
  },
  selectedText: {
    color: theme.colors.border
  },
  disabledBox: {
    borderColor: theme.colors.disabled
  },
  disabledText: {
    color: theme.colors.disabled
  }
})
