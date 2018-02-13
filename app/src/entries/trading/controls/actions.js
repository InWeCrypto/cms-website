import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "TRADING_";
export const GETTRADINGLIST = `${PRE_FIX}GETTRADINGLIST`;
export const DELETETRADING = `${PRE_FIX}DELETETRADING`;

export const getTradingList = createAction(GETTRADINGLIST, params => {
	return http.get({
		url: "category/candy_bow",
		params
	});
});
export const deleteTrading = createAction(DELETETRADING, params => {
	return http
		.delete({
			url: `category/candy_bow/${params.id}`
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
