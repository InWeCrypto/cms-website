import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
//({ home: { categoryList } }) => ({
//    categoryList
//}),
export default connect(
	({ globData: { userInfo }, choicebulletin: { bulletinList } }) => ({
		userInfo,
		bulletinList
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
