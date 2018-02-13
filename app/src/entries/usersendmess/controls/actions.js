import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "USERMESSAGE_";
export const SENDMESSAGE = `${PRE_FIX}GETSENDMESSAGECODE`;

export const sendMessage = createAction(SENDMESSAGE, params => {
	return http.post({
		url: `user/${params.id}/send_sys_msg`,
		params
	});
});
