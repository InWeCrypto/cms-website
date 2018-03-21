import { handleActions } from "redux-actions";
import { GETLIST, DELETENEWS } from "./actions";

export const newsList = handleActions(
	{
		[GETLIST]: (state, { payload }) => payload,
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
