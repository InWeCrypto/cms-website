import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "EMPLOYEE_";
export const GETEMPLOYEE = `${PRE_FIX}GETEMPLOYEE`;
export const DELEMPLOYEE = `${PRE_FIX}DELEMPLOYEE`;

export const getEmployeeList = createAction(GETEMPLOYEE, params => {
	return http.get({
		url: "admin",
		params
	});
});

export const deletEmployee = createAction(DELEMPLOYEE, id => {
	return http.delete({
		url: "admin/" + id
	});
});
