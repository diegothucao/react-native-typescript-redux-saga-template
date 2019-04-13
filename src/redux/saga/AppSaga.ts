import { put } from 'redux-saga/effects'
import { dealService } from '../../service/deal/DealService'
import AppAction from '../action/AppAction'
import UtilAction from '../action/UtilAction'
import IAction from '../action/IAction'

function* searchDeals(action: IAction<string, any>) {
  try {
    if (action.payload !== undefined && action.payload!.length > 0) {
      const data = yield dealService.searchData(action.payload!)
      yield put({ type: AppAction.DEALS_LOADED, data: data })
    } else {
      const data = yield dealService.getAll()
      yield put({ type: AppAction.DEALS_LOADED, data: data })
    }
  } catch (e) {
    yield put({ type: UtilAction.ERROR, error: "Cannot load deals" })
  }
}

export default searchDeals