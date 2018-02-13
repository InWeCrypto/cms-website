import { handleActions } from "redux-actions";
import {
	GETMENUGROUP,
	SAVEEMPLOYEE,
	GETEMPLOYEE,
	EDITEMPLOYEE
} from "./actions";

export const menuList = handleActions(
	{
		[GETMENUGROUP]: (state, { payload }) => payload
	},
	null
);
export const employeeDetail = handleActions(
	{
		[SAVEEMPLOYEE]: (state, { payload }) => payload,
		[GETEMPLOYEE]: (state, { payload }) => payload,
		[EDITEMPLOYEE]: (state, { payload }) => payload
	},
	null
);
