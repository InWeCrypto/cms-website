import { handleActions } from "redux-actions";
import { ADDTRADING, GETTRADING, PUTTRADING, PROJECTLIST } from "./actions";

export const addTrading = handleActions(
	{
		[ADDTRADING]: (state, { payload }) => payload
	},
	[]
);
export const getTrading = handleActions(
	{
		[GETTRADING]: (state, { payload }) => payload
	},
	[]
);
export const putTrading = handleActions(
	{
		[PUTTRADING]: (state, { payload }) => payload
	},
	[]
);
export const projectList = handleActions(
	{
		[PROJECTLIST]: (state, { payload }) => payload
	},
	[]
);
