import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import DealList from './deal/DealList'
import DealDetail from './deal/DealDetail'
import SearchBar from './deal/SearchBar'
import AppAction from '../redux/action/AppAction'
import AppState from '../redux/state/AppState'
import  { UDeal } from '../model/deal/Deal'

interface AppProps {
  appData: AppState
  searchDeals: (searchStr?: string) => any,
  unsetCurrentDeal: () => any
  setCurrentDeal: (key: string) => any
}

class App extends Component<AppProps> {

  componentDidMount() {
    this.props.searchDeals()
  }

  currentDeal = (): UDeal => {
    return this.props.appData.deals.find(x => x.key === this.props.appData.currentDealId)
  }

  render() {
    if (this.props.appData.currentDealId) {
      return (
        <View style={styles.main}>
         {this.currentDeal() && (
          <DealDetail
            initialDealData={this.currentDeal()!}
            onBack={this.props.unsetCurrentDeal}
          />
         )}
        </View>
      )
    }

    return (
      <View style={styles.main}>
        <SearchBar searchDeals={this.props.searchDeals} searchTerm={this.props.appData.searchTerm} />
        <DealList deals={this.props.appData.deals} onItemPress={this.props.setCurrentDeal} />
      </View>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    appData: state.appData
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    searchDeals: (searchStr: string = "") => dispatch(AppAction.getDeals(searchStr)),
    setCurrentDeal: (key: string) => dispatch(AppAction.setCurrentDeal(key)),
    unsetCurrentDeal: () => dispatch(AppAction.unsetCurrentDeal())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    marginTop: 30
  },
  header: {
    fontSize: 40
  },
})

