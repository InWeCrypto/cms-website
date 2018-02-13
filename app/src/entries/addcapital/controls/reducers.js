import { handleActions } from "redux-actions";
import { SENDCAPITAL, GETCAPITALDETAIL, EDITCAPITALDETAIL } from "./actions";

export const capitalDetail = handleActions(
	{
		[SENDCAPITAL]: (state, { payload }) => payload,
		[GETCAPITALDETAIL]: (state, { payload }) => payload,
		[EDITCAPITALDETAIL]: (state, { payload }) => payload
	},
	null
);
