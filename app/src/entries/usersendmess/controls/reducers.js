import { handleActions } from "redux-actions";
import { SENDMESSAGE } from "./actions";

export const messageContent = handleActions(
	{
		[SENDMESSAGE]: (state, { payload }) => payload
	},
	[]
);
