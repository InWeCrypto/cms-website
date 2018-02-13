import React, { PureComponent } from "react";

import { NavLink, Link } from "react-router-dom";
import { Modal } from "antd";
import Menu from "../../../../components/menu/index.js";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	render() {
		const {} = this.state;
		const {} = this.props;
		return (
			<div className="mainBox ui">
				<Menu />
				<div className="home-box home ui f1">
					<div className="home-title1">InWeCrypto</div>
					<div className="home-title2">后台管理系统</div>
				</div>
			</div>
		);
	}
}
