import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native'
import { connect } from 'react-redux'
import { priceDisplay } from '../../util/util'
import Deal from '../../model/deal/Deal'
import DealDetailState from '../../redux/state/deal/DealDetailState'
import DealDetailAction from '../../redux/action/deal/DealDetailAction'

interface DealDetailProps {
  initialDealData: Deal,
  onBack: () => any,
  fetchDetail: ((deal: Deal) => any)
  dealDetailData: DealDetailState,
}

class DealDetail extends Component<DealDetailProps> {

  constructor(props: DealDetailProps) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchDetail(this.props.initialDealData)
  }

  openDealUrl = () => {
    if (this.props.dealDetailData !== null) {
      Linking.openURL(this.props.dealDetailData.deal!.url)
    }
  }

  render() {
    
    const { deal } = this.props.dealDetailData
    return (
      <View>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
        {deal && (
          <Image
            source={{ uri: deal.media[0] }}
            style={styles.image}
          />
        )}
        <View>
          <View>
            {deal && (
              <Text style={styles.title}>{deal.title}</Text>
            )}
          </View>
          <View style={styles.footer}>
            <View style={styles.info}>
              {deal && (
                <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
              )}
              {deal && deal.cause && (
                <Text style={styles.cause}>{deal.cause.name}</Text>
              )}
            </View>
            {deal && deal.user && (
              <View style={styles.user}>
                <Image
                  source={{ uri: deal.user.avatar }}
                  style={styles.avatar}
                />
                <Text>{deal.user.name}</Text>
              </View>
            )}
          </View>
          <View style={styles.description}>
            {deal && (
              <Text>{deal.description}</Text>
            )}
          </View>
          <Button title="Buy this deal!" onPress={this.openDealUrl} />
        </View>
      </View>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    dealDetailData: state.dealDetailData
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealDetail)

function mapDispatchToProps(dispatch: any) {
  return {
    fetchDetail: (deal: Deal) => {
      dispatch(DealDetailAction.initialDeal(deal)),
      dispatch(DealDetailAction.fetchDetail(deal.key))
    }
  }
}

const styles = StyleSheet.create({
  backLink: {
    marginBottom: 5,
    color: '#22f',
    marginLeft: 10
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  title: {
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: 'rgba(237, 149, 45, 0.4)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  info: {
    alignItems: 'center',
  },
  user: {
    alignItems: 'center',
  },
  cause: {
    marginVertical: 10,
  },
  price: {
    fontWeight: 'bold',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  description: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderStyle: 'dotted',
    margin: 10,
    padding: 10,
  },
})
