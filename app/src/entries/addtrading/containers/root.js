import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
//({ home: { categoryList } }) => ({
//    categoryList
//}),
export default connect(
	({
		globData: { userInfo },
		edittrading: { projectList, addTrading, getTrading, putTrading }
	}) => ({
		userInfo,
		projectList,
		addTrading,
		getTrading,
		putTrading
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
