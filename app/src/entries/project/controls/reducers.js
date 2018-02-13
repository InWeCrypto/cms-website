import { handleActions } from "redux-actions";
import { GETLIST } from "./actions";

export const projectList = handleActions(
	{
		[GETLIST]: (state, { payload }) => payload
	},
	null
);
