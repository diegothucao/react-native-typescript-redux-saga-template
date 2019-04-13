import React, { Component } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import DealItem from './DealItem'
import { Deals } from '../../model/deal/Deal'

interface DealListProps {
  deals: Deals,
  onItemPress: any
}

export default class DealList extends Component<DealListProps> {

  constructor(props: DealListProps) {
    super(props)
  }

  render() {
    return (
      <View style={styles.list}>
        <FlatList
          data={this.props.deals}
          renderItem={({ item }) => (
            <DealItem deal={item} onPress={this.props.onItemPress} />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee'
  },
})

