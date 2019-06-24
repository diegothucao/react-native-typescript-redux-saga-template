# React Native, Typescript and Redux-saga
This is an essential example to build React-native app using Typescript and Redux Saga.

Step to run
1. Clone the [repo](https://github.com/diegothucao/react-native-typescript-redux-saga-template)
2. `yarn install` OR `npm install`
3. `react-native eject`
4. `react-native run-ios` OR `react-native run-android`

Define models 

```typescript 
import Cause from "./Cause"
import User from "./User"
import CommonModel from "../CommonModel"

export declare type Deals = Deal[]

export declare type UDeal = Deal | undefined

export default interface Deal extends CommonModel {
    key: string
    dealType: string
    title: string
    price: number
    makerPercentage: number
    description: string
    tags: string
    url: string
    media: string []
    cause?: Cause | null
    user?:  User | null
}
```

Define action 

```typescript 
import IAction from './IAction'

export default class AppAction {
    public static readonly GET_DEALS: string = 'AppAction.GET_DEALS'
    public static readonly DEALS_LOADED: string = 'AppAction.DEALS_LOADED'
    public static readonly SHOW_DEAL_LIST: string = 'AppAction.SHOW_DEAL_LIST'
    public static readonly SHOW_DEAL_DETAIL: string = 'AppAction.SHOW_DEAL_DETAIL'

    public static getDeals = (searchTerm?: string | ''): IAction<String, void> => {
        return {
            payload: searchTerm,
            type: AppAction.GET_DEALS
        }
    }

    public static setCurrentDeal = (dealId: string): IAction<string, void> => {
        return {
            payload: dealId,
            type: AppAction.SHOW_DEAL_DETAIL
        }
    }

    public static unsetCurrentDeal = (): IAction<void, void> => {
        return {
            type: AppAction.SHOW_DEAL_LIST
        }
    }
}
```

Define reducer 

```typescript 

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
```

Call in component 

```typescript 
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
}
}
```
If you see any issue, please do not hesitate to create an issue here or can contact me via email cao.trung.thu@gmail.com or [Linkedin](https://www.linkedin.com/in/diegothucao/)

Thanks

references
1. https://facebook.github.io/react-native/docs/tutorial
2. https://github.com/jscomplete/react-native-essential-training
3. https://redux-saga.js.org
4. https://www.tutorialspoint.com/typescript/
5. https://www.tutorialspoint.com/es6
