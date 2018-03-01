import { handleActions } from "redux-actions";
import { GETTLIST, DELETENEWS } from "./actions";

export const transList = handleActions(
	{
		[GETTLIST]: (state, { payload }) => payload,
		[DELETENEWS]: (state, { payload }) => {
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
