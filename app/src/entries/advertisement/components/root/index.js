import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Dropdown, Icon, Modal, Button, Pagination } from "antd";
import { getLocalTime } from "../../../../utils/util";
import Menunav from "../../../../components/menu/index.js";
import Search from "../../../../components/search/index.js";
import Title from "../../../../components/title/index.js";
import Bigbtn from "../../../../components/bigbtn/index.js";
import Progress from "../../../../components/progress/index.js";

import icon1 from "../../../../assets/images/lunbozixun_ico.png";

import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			per_page: 10,
			page: 1
		};
	}
	componentDidMount() {
		this.getData(this.state);
	}
	getData(state) {
		let param = {
			per_page: state.per_page,
			page: state.page
		};
		this.props.getAdList(param);
	}
	addAdv() {
		toHref("addchooselng", "to=addadvertisement");
	}
	onChange(res) {
		this.setState({
			page: res
		});
	}
	goEdit(item) {
		const { id, lang } = item;
		toHref("addadvertisement", `id=${id}&&lng=${lang}`);
	}
	deleteItem(item) {
		this.props.deleteAdver({ id: item.id });
	}
	render() {
		const { per_page } = this.state;
		const { adList } = this.props;
		const menu = (
			<Menu>
				<Menu.Item key="0">1231</Menu.Item>
				<Menu.Item key="1">456</Menu.Item>
				<Menu.Item key="2">789</Menu.Item>
			</Menu>
		);
		return (
			<div className="mainBox ui">
				<Menunav curmenu="advertisement" />
				<div className="home-box f1 advBox">
					<Title namestr="广告管理" />
					<div className="bigbtnBox ui">
						<div onClick={this.addAdv.bind(this)}>
							<Bigbtn namestr="添加广告" icon={icon1} />
						</div>
					</div>
					<div className="listBox table">
						<div className="listBoxThead ui">
							<div className="f1">
								<span>序号</span>
							</div>
							<div className="f2">
								<span>广告位</span>
							</div>
							<div className="f2">
								<span>广告图</span>
							</div>
							<div className="f3">
								<span>链接</span>
							</div>
							<div className="f2">
								<span>修改日期2</span>
							</div>
							<div className="f3">
								<span>操作</span>
							</div>
						</div>
						<div className="listBoxTbody">
							{adList &&
								adList.data &&
								adList.data.length > 0 &&
								adList.data.map((item, index) => {
									return (
										<div
											key={index}
											className="ui cell-content"
										>
											<div className="f1">
												<span>{item.sort}</span>
											</div>
											<div className="f2">
												<span>
													{item.type == 1
														? "小方块"
														: "长方块"}
												</span>
											</div>
											<div className="f2">
												<span>
													{item.img ? item.img : "无"}
												</span>
											</div>
											<div className="f3">
												<a
													href={item.url}
													target="_blank"
													style={{ color: "#b0b0bd" }}
												>
													{item.url}
												</a>
											</div>
											<div className="f2">
												<span>
													{getLocalTime(
														item.updated_at
													)}
												</span>
											</div>
											<div className="f3 ui jc-c ai-c btn-box">
												<button
													onClick={this.goEdit.bind(
														this,
														item
													)}
												>
													编辑
												</button>
												<button
													onClick={this.deleteItem.bind(
														this,
														item
													)}
												>
													删除
												</button>
											</div>
										</div>
									);
								})}
						</div>
						<div className="pagination-box">
							{adList &&
								Math.ceil(adList.total / per_page) > 1 && (
									<Pagination
										onChange={this.onChange.bind(this)}
										defaultCurrent={adList.current_page}
										total={adList.total}
										defaultPageSize={per_page}
									/>
								)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
