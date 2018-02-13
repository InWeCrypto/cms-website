import { handleActions } from "redux-actions";
import { GETUSERLIST, OPERATEUSER } from "./actions";

export const userList = handleActions(
	{
		[GETUSERLIST]: (state, { payload }) => payload,
		[OPERATEUSER]: (state, { payload }) => {
			console.log(payload);
			let list = state.data.filter((item, index) => {
				if (item.id === payload.id) {
					item.enable = payload.enable;
				}
				return item;
			});
			return { ...state, data: list };
		}
	},
	null
);
