import { handleActions } from "redux-actions";
import { GETTRADINGLIST, DELETETRADING } from "./actions";

export const tradingList = handleActions(
	{
		[GETTRADINGLIST]: (state, { payload }) => payload,
		[DELETETRADING]: (state, { payload }) => {
			let list = state.data.filter((item, index) => {
				if (item.id != payload.id) {
					return item;
				}
			});
			return { ...state, data: list };
		}
	},
	[]
);
