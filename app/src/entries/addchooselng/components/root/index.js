import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal } from "antd";
import LngChos from "../../../../components/lngchos/index.js";
import Backbtn from "../../../../components/backbtn/index.js";

import icon from "../../../../assets/images/member_img.png";
import { getQuery, toHref } from "../../../../utils/util.js";

import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			lng: "cn"
		};
	}
	componentDidMount() {
		let search = this.props.location.search;
		let c_id = getQuery(search).c_id;
		if (c_id) {
			this.setState({
				c_id
			});
		}
		//判读是不是资讯
		let type = getQuery(search).type;
		if (type) {
			this.setState({
				newsType: type
			});
		}
	}

	toAddPage() {
		let search = this.props.location.search;
		let pageSit = getQuery(search).to;
		let type = getQuery(search).type;
		let c_id = getQuery(search).c_id;
		let model = getQuery(search).model;
		let newsType = this.state.newsType;
		let query;

		//是否是资讯添加
		if (type) {
			query = "lng=" + this.state.lng + "&type=" + type;
		} else {
			query = "lng=" + this.state.lng;
		}
		//是否是编辑模式
		if (c_id) {
			query += "&c_id=" + c_id;
		}
		//是否是ico项目
		if (model) {
			query += "&model=" + model;
		}

		toHref(pageSit, query);
	}
	toCn() {
		this.setState({
			lng: "cn"
		});
	}
	toEn() {
		this.setState({
			lng: "en"
		});
	}
	render() {
		const { c_id } = this.state;
		const {} = this.props;

		return (
			<div className="mainBox ui addproject fd-c">
				<Backbtn />
				<h1>选择你需要添加的语言版本</h1>
				<div className="addpro-choslng">
					<LngChos
						tocn={this.toCn.bind(this)}
						toen={this.toEn.bind(this)}
					/>
				</div>
				<button
					className="c-btn-big btn-start"
					onClick={this.toAddPage.bind(this)}
				>
					{c_id ? "确定" : "好了，开始创建"}
				</button>

				<p>Tip:已添加相关语言的项目无法再次添加该语言，</p>
				<p>会对原有版本进行修改</p>
			</div>
		);
	}
}
