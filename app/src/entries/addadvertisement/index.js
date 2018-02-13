import { injectReducer } from "../../utils/injectReducer";
import * as reducers from "./controls/reducers";
import * as globalReducer from "../../globalreducer";
import React, { PureComponent } from "react";
import Root from "./containers/root";
injectReducer("globData", globalReducer);
injectReducer("adedit", reducers);

export default Root;
