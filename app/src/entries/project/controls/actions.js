import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "PROPJECT_";
export const GETLIST = `${PRE_FIX}GETLIST`;
export const DELR = `${PRE_FIX}DELR`;

export const getProjectList = createAction(GETLIST, params => {
	return http.get({
		url: "category",
		params
	});
});

export const deltProject = createAction(DELR, id => {
	return http.delete({
		url: "category/" + id
	});
});
