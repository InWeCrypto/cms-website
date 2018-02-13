import { handleActions } from "redux-actions";
import { ADDAUTHOR, GETAUTHOR, EDITAUTHOR } from "./actions";

export const authorDetail = handleActions(
	{
		[ADDAUTHOR]: (state, { payload }) => payload,
		[GETAUTHOR]: (state, { payload }) => payload,
		[EDITAUTHOR]: (state, { payload }) => payload
	},
	null
);
