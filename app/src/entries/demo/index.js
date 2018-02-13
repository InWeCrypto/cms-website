import { injectReducer } from "../../utils/injectReducer";
import * as reducers from "./controls/reducers";
import * as globalReducer from "../../globalreducer";
import React, { PureComponent } from "react";
import Bundle from "../../bundle";
injectReducer("globData", globalReducer);
injectReducer("login", reducers);
import Root from "./containers/root";
export default Root;
