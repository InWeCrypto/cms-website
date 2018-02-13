import { handleActions } from "redux-actions";
import { GETEMPLOYEE } from "./actions";

export const employeeList = handleActions(
	{
		[GETEMPLOYEE]: (state, { payload }) => payload
	},
	null
);
