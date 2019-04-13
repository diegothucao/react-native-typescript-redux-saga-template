import Deal from "../../../model/deal/Deal"
import IState from "../IState"

export default interface DealDetailState extends IState {
    deal?: Deal
  }