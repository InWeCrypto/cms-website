import { handleActions } from "redux-actions";
import {
	SENDPERMISSONNAME,
	GETPERMISSONNAME,
	EDITPERMISSONNAME,
	GETMENU,
	CHANGEITEM,
	SAVEMENUGROUP,
	GETMENUGROUP
} from "./actions";

export const permessonName = handleActions(
	{
		[SENDPERMISSONNAME]: (state, { payload }) => payload,
		[GETPERMISSONNAME]: (state, { payload }) => payload,
		[EDITPERMISSONNAME]: (state, { payload }) => payload
	},
	null
);
export const menuList = handleActions(
	{
		[GETMENU]: (state, { payload }) => payload,
		[CHANGEITEM]: (state, { payload }) => {
			let list = state.data.map((item, index) => {
				if (item.id === payload.id) {
					item.isCheck = !item.isCheck;
				}
				return item;
			});
			return { ...state, data: list };
		}
	},
	null
);
export const menuGroup = handleActions(
	{
		[SAVEMENUGROUP]: (state, { payload }) => payload,
		[GETMENUGROUP]: (state, { payload }) => payload
	},
	null
);
