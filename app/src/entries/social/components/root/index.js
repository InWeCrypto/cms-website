import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Dropdown, Icon, Modal, Button } from "antd";
import Menunav from "../../../../components/menu/index.js";
import Search from "../../../../components/search/index.js";
import Title from "../../../../components/title/index.js";
import Bigbtn from "../../../../components/bigbtn/index.js";
import Progress from "../../../../components/progress/index.js";
import { toHref } from "../../../../utils/util";

import icon1 from "../../../../assets/images/social_ico.png";
import icon2 from "../../../../assets/images/neo_project_icon.png";

import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	addPage() {
		toHref("addsocial");
	}
	render() {
		const {} = this.state;
		const {} = this.props;
		const menu = (
			<Menu>
				<Menu.Item key="0">123</Menu.Item>
				<Menu.Item key="1">456</Menu.Item>
				<Menu.Item key="2">789</Menu.Item>
			</Menu>
		);
		return (
			<div className="mainBox ui">
				<Menunav curmenu="system" curchildmenu="social" />
				<div className="home-box f1 socialBox">
					<Title namestr="社交管理" />
					<div className="bigbtnBox ui">
						<div onClick={this.addPage.bind(this)}>
							<Bigbtn namestr="添加社交链接" icon={icon1} />
						</div>
					</div>
					<div className="listBox table">
						<div className="listBoxThead ui jc-sa">
							<div className="f1">
								<span>序号</span>
							</div>
							<div className="f5">
								<span>平台全称（中文）</span>
							</div>

							<div className="f1">
								<span>操作</span>
							</div>
						</div>
						<div className="listBoxTbody">
							<div className="ui cell-content">
								<div className="f1">
									<span>1</span>
								</div>
								<div className="f5">
									<span>neo</span>
								</div>

								<div className="f1 ui jc-c ai-c btn-box">
									<button>编辑</button>
									<button>删除</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
