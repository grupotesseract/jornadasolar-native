import React, { ReactNode } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { Divider, List } from 'react-native-paper'
import { theme } from '../../theme'

export interface INavigationItem {
  icone?: ReactNode
  texto: string
  onPress?: () => void
  iconeSecundario?: ReactNode
}

interface INavigationListProps {
  itens: INavigationItem[]
}

const NavigationList = ({ itens }: INavigationListProps) => {
  const Divisor = () => (
    <Divider style={{ backgroundColor: theme.colors.placeholder }} />
  )

  const Item = ({ item }) => (
    <List.Item
      title={item.texto}
      titleStyle={styles.texto}
      left={() => <Text style={styles.icone}>{item.icone}</Text>}
      right={() => <Text style={styles.icone}>{item.iconeSecundario}</Text>}
      onPress={item.onPress}
    />
  )

  return (
    <FlatList
      data={itens}
      renderItem={Item}
      keyExtractor={item => item.texto}
      ItemSeparatorComponent={Divisor}
      ListHeaderComponent={Divisor}
      ListFooterComponent={Divisor}
    />
  )
}

const styles = StyleSheet.create({
  texto: {
    paddingVertical: 12,
    paddingLeft: 8,
    fontSize: 16
  },
  icone: { alignSelf: 'center', paddingLeft: 16, fontSize: 16 }
})

export default NavigationList
