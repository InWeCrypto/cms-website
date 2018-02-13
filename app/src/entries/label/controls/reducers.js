import { handleActions } from "redux-actions";
import { LABELLIST, DELETELABEL } from "./actions";

export const labelList = handleActions(
	{
		[LABELLIST]: (state, { payload }) => payload,
		[DELETELABEL]: (state, { payload }) => {
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
