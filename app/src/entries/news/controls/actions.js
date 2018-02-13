import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "NEWS_";
export const GETLIST = `${PRE_FIX}GETLIST`;
export const DELETENEWS = `${PRE_FIX}DELETENEWS`;

export const getNewsList = createAction(GETLIST, params => {
	return http.get({
		url: "article",
		params
	});
});
export const deleteNews = createAction(DELETENEWS, params => {
	return http
		.delete({
			url: `article/${params.id}`
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
