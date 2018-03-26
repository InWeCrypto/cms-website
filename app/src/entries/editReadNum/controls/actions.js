import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "EDITREADNUM_";
export const EDITDATA = `${PRE_FIX}EDITDATA`;

export const editdata = createAction(EDITDATA, params => {
	return http.put({
		url: `article/${params.id}`,
		params
	});
});
