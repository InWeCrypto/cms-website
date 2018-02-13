import { handleActions } from "redux-actions";
import { ADDLABEL, GETLABEL, EDITLABEL } from "./actions";

export const labelDetail = handleActions(
	{
		[ADDLABEL]: (state, { payload }) => payload,
		[GETLABEL]: (state, { payload }) => payload,
		[EDITLABEL]: (state, { payload }) => payload
	},
	null
);
