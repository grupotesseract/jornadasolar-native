import React, { useEffect, useState } from 'react'
import { Modal, Pressable, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Paragraph, Portal, Surface, Text } from 'react-native-paper'
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'
import { t } from 'i18n-js'
import EmojiToUnicode from '../services/EmojiToUnicode'
import TextButton from './TextButton'
import TextInput from './TextInput'

export interface IItemEdicao {
  emoji?: string
  nome: string
  emojiUnicode: string[]
}

interface Props {
  itemEdicao?: IItemEdicao
  isOpen: boolean
  onConfirma: (IItemEdicao) => void
  onFecha: () => void
  labelNome: string
}

const ModalEdicao = ({
  onFecha,
  isOpen,
  labelNome,
  itemEdicao,
  onConfirma
}: Props) => {
  const tituloModal = itemEdicao
    ? t('edicao.tituloEdicao', { tipo: labelNome })
    : t('edicao.tituloNovo', { tipo: labelNome })

  const [item, setItem] = useState<IItemEdicao>({
    emoji: '',
    nome: '',
    emojiUnicode: []
  })

  const [erro, setErros] = useState(null)

  useEffect(() => {
    if (itemEdicao) {
      setItem({
        emoji: itemEdicao.emoji,
        nome: itemEdicao.nome,
        emojiUnicode: itemEdicao.emojiUnicode
      })
    } else {
      setItem({
        emoji: '',
        nome: '',
        emojiUnicode: []
      })
    }
    setErros(null)
  }, [itemEdicao, isOpen])

  const handleChangeNome = (novoNome: string) => {
    setErros(null)
    setItem({ ...item, nome: novoNome })
  }

  const handleChangeEmoji = (novoEmoji: string) => {
    setErros(null)
    const unicodes = new EmojiToUnicode().call(novoEmoji.trim().toLowerCase())
    let emoji = novoEmoji.trim().toLowerCase()

    if (unicodes.length <= 0) {
      setErros({ emoji: t('edicao.erroEmoji') })
      emoji = ''
    }

    setItem({
      ...item,
      emoji: emoji,
      emojiUnicode: unicodes
    })
  }

  const validaPreenchimento = () => {
    if (!item.emojiUnicode.length) {
      setErros({ emoji: t('edicao.erroEmoji') })
      return false
    }
    if (!item.nome.length) {
      setErros({ nome: t('edicao.erroNome') })
      return false
    }
    return true
  }

  const handleConfirma = () => {
    if (validaPreenchimento()) {
      onConfirma(item)
      onFecha()
    }
  }

  const handleFecha = () => {
    onFecha()
  }
  return (
    <Portal>
      <Modal
        visible={isOpen}
        animationType="slide"
        onRequestClose={handleFecha}
        transparent
      >
        <View style={styles.container}>
          <Surface style={styles.modal}>
            <ScrollView>
              <View style={styles.header}>
                <Pressable style={styles.fechar} onPress={handleFecha}>
                  <MaterialCommunityIcons
                    name="close"
                    color="white"
                    size={20}
                  />
                </Pressable>
                <Paragraph style={styles.titulo}>{tituloModal}</Paragraph>
                <View style={styles.spacer}></View>
                <TextButton
                  texto={t('comum.concluir')}
                  onPress={handleConfirma}
                />
              </View>
              <View style={styles.form}>
                <TextInput
                  label={t('edicao.emoji')}
                  value={item.emoji}
                  onChangeText={handleChangeEmoji}
                  erro={erro?.emoji}
                />
                <TextInput
                  label={labelNome}
                  value={item.nome}
                  onChangeText={handleChangeNome}
                  erro={erro?.nome}
                />
              </View>
            </ScrollView>
          </Surface>
        </View>
      </Modal>
    </Portal>
  )
}

export default ModalEdicao

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  modal: {
    paddingHorizontal: 26,
    paddingTop: 16,
    paddingBottom: 52,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  fechar: {
    marginRight: 8
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700'
  },
  spacer: {
    flex: 1
  },
  form: {
    justifyContent: 'flex-end'
  }
})
