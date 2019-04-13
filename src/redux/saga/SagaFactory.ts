import AppAction from "../action/AppAction"
import DealDetailAction from "../action/deal/DealDetailAction"
import findDealByKey from "./deal/DealDetailSaga"
import { takeEvery } from "redux-saga/effects"
import searchDeals from "./AppSaga"

function* dataSaga() {
  yield takeEvery(AppAction.GET_DEALS, searchDeals)
  yield takeEvery(DealDetailAction.DEAL_FETCH_DETAIL, findDealByKey)
}

export default dataSaga