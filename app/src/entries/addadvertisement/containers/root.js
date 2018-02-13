import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
//({ home: { categoryList } }) => ({
//    categoryList
//}),
export default connect(
	({ globData: { userInfo, imgOption }, adedit: { editDetail } }) => ({
		userInfo,
		editDetail,
		imgOption
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
