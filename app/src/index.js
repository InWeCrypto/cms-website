import React from "react";
import createHistory from "history/createBrowserHistory";
import { HashRouter as Router } from "react-router-dom";
import storeFun from "./store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { render as domRender } from "react-dom";
import Routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import { changeLng, setReduxUserInfo } from "./globalactions";
import { getLocalItem, remFun, addClass } from "./utils/util";

// window.addEventListener("orientationchange", function(event) {
// 	if (window.orientation == 180 || window.orientation == 0) {
// 		remFun();
// 		//location.reload();
// 		alert(1);
// 	}
// 	if (window.orientation == 90 || window.orientation == -90) {
// 		remFun();
// 		//location.reload();
// 		// remFun();
// 	}
// });
//const history = createHistory();
const store = storeFun();
//window.history = history;

let userinfo = getLocalItem("userInfo");
window.store = store;

if (userinfo && userinfo.data) {
	store.dispatch(setReduxUserInfo(JSON.parse(userinfo.data)));
}
const render = Component => {
	domRender(
		<Provider store={store}>
			<Router>
				<Component />
			</Router>
		</Provider>,
		document.getElementById("root")
	);
};

render(Routes);

registerServiceWorker();
