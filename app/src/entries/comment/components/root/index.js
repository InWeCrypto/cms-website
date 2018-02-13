import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Dropdown, Icon, Modal, Button } from "antd";
import Menunav from "../../../../components/menu/index.js";
import Search from "../../../../components/search/index.js";
import Title from "../../../../components/title/index.js";
import Bigbtn from "../../../../components/bigbtn/index.js";
import Progress from "../../../../components/progress/index.js";

import icon1 from "../../../../assets/images/addkongtou_ico.png";

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
		const menu = (
			<Menu>
				<Menu.Item key="0">123</Menu.Item>
				<Menu.Item key="1">456</Menu.Item>
				<Menu.Item key="2">789</Menu.Item>
			</Menu>
		);
		return (
			<div className="mainBox ui">
				<Menunav curmenu="comment" />
				<div className="home-box f1 tradingBox1 tradingBox">
					<Title namestr="评论管理" />
					<div className="listBox table">
						<div className="listBoxThead ui">
							<div className="f1">
								<span>序号</span>
							</div>
							<div className="f2">
								<span>用户账号</span>
							</div>
							<div className="f2">
								<span>评论内容</span>
							</div>
							<div className="f2">
								<span>相关资讯</span>
							</div>
							<div className="f3">
								<span>操作</span>
							</div>
						</div>
						<div className="listBoxTbody">
							<div className="ui cell-content">
								<div className="f1">
									<span>1</span>
								</div>
								<div className="f2">
									<span>3</span>
								</div>
								<div className="f2">
									<span>
										评论内容评论内容评论内容评论内容
									</span>
								</div>
								<div className="f2">
									<span>资讯资讯资讯资讯</span>
								</div>
								<div className="f3 ui jc-c ai-c btn-box">
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
