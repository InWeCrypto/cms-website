import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "FEEDBACK_";
export const GETDATA = `${PRE_FIX}GETDATA`;
export const GETDETAIL = `${PRE_FIX}GETDETAIL`;

export const getdata = createAction(GETDATA, params => {
	return http.get({
		url: `feedbackc`,
		params
	});
});
export const getdetail = createAction(GETDETAIL, params => {
	return http.get({
		url: `feedbackc/${params.id}`,
		params
	});
});
