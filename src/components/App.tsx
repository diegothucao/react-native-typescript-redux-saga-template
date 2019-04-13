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
import Deal, { UDeal } from '../model/deal/Deal'

interface AppProps {
  appData: AppState

  fetchDeals: () => any,
  searchDeals: (searchStr: string) => any,
  unsetCurrentDeal: () => any
  setCurrentDeal: (key: string) => any
}

class App extends Component<AppProps> {

  componentDidMount() {
    this.props.fetchDeals()
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
    const dealsToDisplay =
      this.props.appData.deals.length > 0
        ? this.props.appData.deals
        : []
    return (
      <View style={styles.main}>
        <SearchBar searchDeals={this.props.searchDeals} searchTerm={this.props.appData.searchTerm} />
        <DealList deals={dealsToDisplay} onItemPress={this.props.setCurrentDeal} />
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
    fetchDeals: () => dispatch(AppAction.getDeals()),
    searchDeals: (searchStr: string) => dispatch(AppAction.getDeals(searchStr)),
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

