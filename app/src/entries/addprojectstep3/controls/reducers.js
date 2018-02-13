import { handleActions } from "redux-actions";
import { UPLOADKEY } from "./actions";

export const uploadKey = handleActions(
	{
		[UPLOADKEY]: (state, { payload }) => payload
	},
	null
);
