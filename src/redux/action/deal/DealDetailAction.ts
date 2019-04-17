import IAction from '../IAction'
import Deal from '../../../model/deal/Deal'

export default class DealDetailAction {
    public static readonly INITIAL_DETAIL: string = 'DealDetailAction.INITIAL_DETAIL'
    public static readonly DEAL_FETCHED: string = 'DealDetailAction.DEAL_FETCHED'
    public static readonly DEAL_FETCH_DETAIL: string = 'DealDetailAction.DEAL_FETCH_DETAIL'

    public static fetchDetail(dealId: string): IAction<string, void> {
        return {
            payload: dealId,
            type: DealDetailAction.DEAL_FETCH_DETAIL
        }
    }

    public static initialDeal(deal: Deal): IAction<string, Deal> {
        return {
            data: deal,
            type: DealDetailAction.INITIAL_DETAIL
        }
    }

}
