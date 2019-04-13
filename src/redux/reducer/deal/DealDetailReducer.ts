import DealDetailState from "../../state/deal/DealDetailState"
import { iDataState } from "../../state/IState"
import Deal from "../../../model/deal/Deal"
import IAction from "../../action/IAction"
import UtilAction from "../../action/UtilAction"
import DealDetailAction from "../../action/deal/DealDetailAction"

export default class DealDetailReducer {
    private static readonly _initialState: DealDetailState = {
        deal: undefined,
        state: iDataState.initial,
        errorMessage: ""
    }

    public static reducer(state: DealDetailState = DealDetailReducer._initialState, action: IAction<any, Deal>): DealDetailState {
        switch (action.type) {
            case DealDetailAction.INITIAL_DETAIL:
            return {
                ...state,
                state: iDataState.loaded,
                deal: (state.deal !== undefined && action.data !== undefined && state.deal!.key == action.data!.key) ? state.deal: action.data,
                errorMessage: ""
            }
            case DealDetailAction.DEAL_FETCH_DETAIL:
            return {
                ...state,
                state: iDataState.loading,
                errorMessage: ""
            }

          case DealDetailAction.DEAL_FETCHED:
            return {
                ...state,
                deal: action.data,
                state: iDataState.loaded,
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