import { handleActions } from "redux-actions";
import { GETCODE } from "./actions";

export const trading = handleActions(
	{
		[GETCODE]: (state, { payload }) => payload
	},
	[]
);
