import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal } from "antd";
import Menu from "../../../../components/menu/index.js";

import icon from "../../../../assets/images/member_img.png";

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
				<div className="home-box ui f1">123</div>
			</div>
		);
	}
}
