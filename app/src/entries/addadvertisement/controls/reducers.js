import { handleActions } from "redux-actions";
import { ADDADVER, GETADDDETAIL, EDITADVER } from "./actions";

export const editDetail = handleActions(
	{
		[ADDADVER]: (state, { payload }) => payload,
		[GETADDDETAIL]: (state, { payload }) => payload,
		[EDITADVER]: (state, { payload }) => payload
	},
	null
);
