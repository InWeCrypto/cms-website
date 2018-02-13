import { handleActions } from "redux-actions";
import { GETCAPITAL, DELETECAPITAL, GETWALLET } from "./actions";

export const capitalList = handleActions(
	{
		[GETCAPITAL]: (state, { payload }) => payload,
		[DELETECAPITAL]: (state, { payload }) => {
			let list = state.data.filter((item, index) => {
				if (item.id != payload.id) {
					return item;
				}
			});
			return { ...state, data: list };
		}
	},
	null
);
export const walletList = handleActions(
	{
		[GETWALLET]: (state, { payload }) => payload
	},
	null
);
