import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Dropdown, Icon, Modal, Button, Pagination } from "antd";
import { getLocalTime } from "../../../../utils/util";
import Menunav from "../../../../components/menu/index.js";
import Search from "../../../../components/search/index.js";
import Title from "../../../../components/title/index.js";
import Bigbtn from "../../../../components/bigbtn/index.js";
import Progress from "../../../../components/progress/index.js";

import icon1 from "../../../../assets/images/addkongtou_ico.png";
import { toHref } from "../../../../utils/util";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			per_page: 10,
			page: 1
		};
	}
	componentWillUpdate(nextProps, nextState) {
		if (nextState.page != this.state.page) {
			this.getData(nextState);
		}
	}
	componentDidMount() {
		this.getData(this.state);
	}
	getData(state) {
		// throw new Error(112);
		let param = {
			per_page: state.per_page,
			page: state.page
		};
		this.props.getTradingList(param);
	}
	addTrading() {
		toHref("addchooselng", "to=addtrading");
	}
	onChange(res) {
		this.setState({
			page: res
		});
	}
	editTrading(item) {
		toHref("addtrading", `id=${item.id}&lng=${item.lang}`);
	}
	deleteTrading(item) {
		this.props.deleteTrading({
			id: item.id
		});
	}
	render() {
		const { per_page } = this.state;
		const { tradingList } = this.props;
		const menu = (
			<Menu>
				<Menu.Item key="0">123</Menu.Item>
				<Menu.Item key="1">456</Menu.Item>
				<Menu.Item key="2">789</Menu.Item>
			</Menu>
		);
		return (
			<div className="mainBox ui">
				<Menunav curmenu="trading" />
				<div className="home-box f1 tradingBox">
					<Title namestr="空投设置" />
					<div className="bigbtnBox ui">
						<div onClick={this.addTrading.bind(this)}>
							<Bigbtn namestr="添加空投" icon={icon1} />
						</div>
					</div>
					<div className="listBox table">
						<div className="listBoxThead ui">
							<div className="f1">
								<span>序号</span>
							</div>
							<div className="f2">
								<span>空投日期</span>
							</div>
							<div className="f2">
								<span>空投项目</span>
							</div>
							<div className="f2">
								<span>空投内容</span>
							</div>
							<div className="f2">
								<span>修改时间</span>
							</div>
							<div className="f3">
								<span>操作</span>
							</div>
						</div>
						<div className="listBoxTbody">
							{tradingList &&
								tradingList.data &&
								tradingList.data.length > 0 &&
								tradingList.data.map((item, index) => {
									return (
										<div
											key={index}
											className="ui cell-content"
										>
											<div className="f1">
												<span>{index + 1}</span>
											</div>
											<div className="f2">
												<span>
													{item.year
														? `${item.year}-${
																item.month
															}-${item.day}`
														: "无"}
												</span>
											</div>
											<div className="f2">
												<span>
													{item.category &&
													item.category.name
														? "item.category.name"
														: "无"}
												</span>
											</div>
											<div className="f2">
												<span>
													{item.desc
														? item.desc
														: "无"}
												</span>
											</div>
											<div className="f2">
												<span>
													{item.updated_at
														? getLocalTime(
																item.updated_at
															)
														: "无"}
												</span>
											</div>
											<div className="f3 ui jc-c ai-c btn-box">
												<button
													onClick={this.editTrading.bind(
														this,
														item
													)}
												>
													编辑
												</button>
												<button
													onClick={this.deleteTrading.bind(
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
							{tradingList &&
								Math.ceil(tradingList.total / per_page) > 1 && (
									<Pagination
										onChange={this.onChange.bind(this)}
										defaultCurrent={
											tradingList.current_page
										}
										total={tradingList.total}
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
