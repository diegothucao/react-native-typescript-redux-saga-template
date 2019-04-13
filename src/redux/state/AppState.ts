import { Deals } from "../../model/deal/Deal"
import IState from "./IState"

export default interface AppState extends IState {
    deals: Deals,
    currentDealId: string | null,
    searchTerm?: string
  }
  