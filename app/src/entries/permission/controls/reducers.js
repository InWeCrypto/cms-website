import { handleActions } from "redux-actions";
import { GETMENUGROUP, DELETEMENUGROUP } from "./actions";

export const menuGroup = handleActions(
	{
		[GETMENUGROUP]: (state, { payload }) => payload,
		[DELETEMENUGROUP]: (state, { payload }) => {
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
