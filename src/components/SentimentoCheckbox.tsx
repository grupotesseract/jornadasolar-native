import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { theme } from '../../theme'
import EmojiComNome from './EmojiComNome'
import Sentimento, { ISentimento } from '../entities/Sentimento'
import Emoji from './Emoji'
import { Text } from 'react-native-paper'
import { t } from 'i18n-js'

interface ItemProps {
  isEmEdicao: boolean
  sentimento?: Sentimento
  onPress: (sentimento: ISentimento) => void
  checked?: boolean
  testID?: string
}

const SentimentoCheckbox = ({
  sentimento,
  onPress,testID, 
  checked = false,
  isEmEdicao = false
}: ItemProps) => {
  const handlePress = () => {
    onPress(sentimento)
  }

  return (
    <Pressable
      style={[
        styles.botao,
        checked && styles.botaoSelecionado,
        !isEmEdicao && styles.grow
      ]}
      onPress={handlePress}
      testID={testID}
      accessibilityLabel={testID}
    >
      {sentimento ? (
        <>
          <EmojiComNome
            nome={sentimento.nome}
            emoji={sentimento.emoji}
            textStyle={
              checked ? styles.textoCheckboxSelecionado : styles.textoCheckbox
            }
          />
          {isEmEdicao && (
            <View style={styles.emoji}>
              <Emoji nome="lapis" />
            </View>
          )}
        </>
      ) : (
        <Text style={styles.textoCheckbox}>{t('edicao.novoSentimento')}</Text>
      )}
    </Pressable>
  )
}

export default SentimentoCheckbox

const styles = StyleSheet.create({
  botao: {
    margin: 6,
    borderWidth: 2,
    borderRadius: 100,
    padding: 8,
    borderColor: theme.colors.placeholder,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  botaoSelecionado: {
    borderColor: theme.colors.primary
  },
  textoCheckbox: { fontSize: 20 },
  textoCheckboxSelecionado: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  grow: {
    flexGrow: 1
  },
  emoji: {
    marginLeft: 8
  }
})
