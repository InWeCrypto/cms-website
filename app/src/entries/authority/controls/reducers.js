import { handleActions } from "redux-actions";
import { AUTHORITYLIST, DELETEAUTHORITY } from "./actions";

export const authorityList = handleActions(
	{
		[AUTHORITYLIST]: (state, { payload }) => payload,
		[DELETEAUTHORITY]: (state, { payload }) => {
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
