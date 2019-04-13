import AppState from "../state/AppState"
import { iDataState } from "../state/IState"
import IAction from "../action/IAction"
import AppAction from "../action/AppAction"
import { Deals } from "../../model/deal/Deal"
import UtilAction from "../action/UtilAction"

export default class AppReducer {
    private static readonly _initialState: AppState = {
        deals: [],
        searchTerm: "",
        currentDealId: null,
        state: iDataState.initial,
        errorMessage: ""
    }

    public static reducer(state: AppState = AppReducer._initialState, action: IAction<any, Deals>): AppState {
        switch (action.type) {
            case AppAction.GET_DEALS:
            return {
                ...state,
                state: iDataState.loading,
                searchTerm: action.payload,
                errorMessage: ""
            }

          case AppAction.DEALS_LOADED:
            return {
                ...state,
                deals: action.data !== null ? action.data!: [],
                state: iDataState.loaded,
                errorMessage: ""
            }

         case AppAction.SHOW_DEAL_LIST:
            return {
                ...state,
                state: iDataState.loaded,
                currentDealId: null
            }

           case AppAction.SHOW_DEAL_DETAIL:
            return {
                ...state,
                currentDealId: action.payload,
                state: iDataState.loading,
                errorMessage: ""
            }

          case UtilAction.ERROR:
            return {
                ...state,
                state: iDataState.error,
                errorMessage: action.error
            }
            default:
                return state
        }
    }

}