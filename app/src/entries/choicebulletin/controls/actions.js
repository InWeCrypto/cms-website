import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "CHOICEBULLETIN_";
export const BULLETINLIST = `${PRE_FIX}BULLETINLIST`;
export const EXCHANGELIST = `${PRE_FIX}EXCHANGELIST`;
export const RELEASE = `${PRE_FIX}RELEASE`;

export const getBulletinList = createAction(BULLETINLIST, params => {
	return http.post({
		url: "ex_notice_spider",
		params
	});
});

export const getExchangeList = createAction(EXCHANGELIST, params => {
	return http.get({
		url: "ex_notice_spider/keys",
		params
	});
});

export const release = createAction(RELEASE, data => {
	return http.post({
        url: `ex_notice_spider/${data.id}/online`,
        params: {
            send_app_message: data.isSendHei
        }
	});
});

