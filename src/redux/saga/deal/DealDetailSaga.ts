import IAction from "../../action/IAction"
import { dealService } from "../../../service/deal/DealService"
import UtilAction from "../../action/UtilAction"
import { put } from 'redux-saga/effects'
import DealDetailAction from "../../action/deal/DealDetailAction"

function* findDealByKey(action: IAction<string, any>) {
    try {
          const data = yield dealService.fetchById(action.payload!)
          yield put({ type: DealDetailAction.DEAL_FETCHED, data: data })
    } catch (e) {
      yield put({ type: UtilAction.ERROR, error: "Cannot process data" })
    }
  }
  
  export default findDealByKey