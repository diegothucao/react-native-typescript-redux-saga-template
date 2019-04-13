import { combineReducers } from 'redux'
import AppReducer from './AppReducer'
import DealDetailReducer from './deal/DealDetailReducer'

const ReducerFactory = combineReducers({
    appData: AppReducer.reducer,
    dealDetailData: DealDetailReducer.reducer
})

export default ReducerFactory