import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "CAPITAL_";
export const GETCAPITAL = `${PRE_FIX}GETCAPITAL`;
export const DELETECAPITAL = `${PRE_FIX}DELETECAPITAL`;
export const GETWALLET = `${PRE_FIX}GETWALLET`;

export const getCapitalList = createAction(GETCAPITAL, params => {
	return http.get({
		url: "gnt_category",
		params
	});
});
export const deleteCapital = createAction(DELETECAPITAL, params => {
	return http
		.delete({
			url: `gnt_category/${params.id}`
		})
		.then(res => {
			if (res.code === 4000) {
				return {
					code: res.code,
					msg: res.msg,
					data: {
						id: params.id
					}
				};
			}
			return res;
		});
});
export const getWalletList = createAction(GETWALLET, params => {
	return http.get({
		url: "wallet_category"
	});
});
