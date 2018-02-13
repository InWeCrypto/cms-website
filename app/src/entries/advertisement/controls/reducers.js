import { handleActions } from "redux-actions";
import { GETADLIST, DELETEADVER } from "./actions";

export const adList = handleActions(
	{
		[GETADLIST]: (state, { payload }) => payload,
		[DELETEADVER]: (state, { payload }) => {
			let list = state.data.filter((item, index) => {
				if (item.id !== payload.id) {
					return item;
				}
			});
			return { ...state, data: list };
		}
	},
	null
);
