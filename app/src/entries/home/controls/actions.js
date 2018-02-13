import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "LOGIN_";
export const GETCODE = `${PRE_FIX}GETCODE`;

export const getTrading = createAction(GETCODE, params => {
	return http.post({
		url: "get_code",
		params
	});
});
