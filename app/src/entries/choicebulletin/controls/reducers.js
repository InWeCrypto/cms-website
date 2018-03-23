import { handleActions } from "redux-actions";
import { GETLIST, DELETENEWS, BULLETINLIST } from "./actions";

export const bulletinList = handleActions(
	{
		[BULLETINLIST]: (state, { payload }) => payload,
	},
	[]
);
