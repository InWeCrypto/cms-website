import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { getLocalTime } from "../../../../utils/util";
import { Menu, Dropdown, Icon, Modal, Button, Pagination } from "antd";
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
			page: 1,
			keyword: ""
		};
	}
	componentWillUpdate(nextProps, nextState) {
		if (
			nextState.page != this.state.page ||
			nextState.keyword != this.state.keyword
		) {
			this.getData(nextState);
		}
	}
	componentDidMount() {
		this.getData(this.state);
	}
	toSendPage(item) {
		toHref("usersendmess", `id=${item.id}&&username=${item.email}`);
	}
	operateUser(item) {
		this.props.operateUser({
			id: item.id,
			param: {
				enable: !item.enable
			}
		});
	}
	getData(state) {
		let param = {
			per_page: state.per_page,
			page: state.page
		};
		if (state.keyword.length > 0) {
			param.keyword = state.keyword;
		}
		this.props.getUserList(param);
	}
	searchclick(res) {
		this.setState({
			keyword: res
		});
	}
	onChange(res) {
		this.setState({
			page: res
		});
	}
	render() {
		const { per_page, page } = this.state;
		const { userList } = this.props;
		// const menu = (
		// 	<Menu>
		// 		<Menu.Item key="0">123</Menu.Item>
		// 		<Menu.Item key="1">456</Menu.Item>
		// 		<Menu.Item key="2">789</Menu.Item>
		// 	</Menu>
		// );
		return (
			<div className="mainBox ui">
				<Menunav curmenu="user" />
				<div className="home-box f1 userBox">
					<Title namestr="用户管理" />
					<div className="searchBox ui">
						<Search
							search={this.searchclick.bind(this)}
							placeholder="查找用户账号名/昵称"
						/>
					</div>
					<div className="listBox table">
						<div className="listBoxThead ui">
							<div className="f1">
								<span>序号</span>
							</div>
							<div className="f2">
								<span>用户账户</span>
							</div>
							<div className="f2">
								<span>用户昵称</span>
							</div>
							<div className="f1">
								<span>状态</span>
							</div>
							<div className="f2">
								<span>注册时间</span>
							</div>
							<div className="f2">
								<span>上次登录时间</span>
							</div>
							<div className="f3">
								<span>操作</span>
							</div>
						</div>
						<div className="listBoxTbody">
							{userList &&
								userList.data &&
								userList.data.length > 0 &&
								userList.data.map((item, index) => {
									return (
										<div
											key={index}
											className="ui cell-content"
										>
											<div className="f1">
												<span>{index + 1}</span>
											</div>
											<div className="f2">
												<span>{item.email}</span>
											</div>
											<div className="f2">
												<span>{item.name}</span>
											</div>
											<div className="f1">
												<span>
													{item.enable
														? "正常"
														: "冻结"}
												</span>
											</div>
											<div className="f2">
												<span>
													{getLocalTime(
														item.created_at
													)}
												</span>
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
													onClick={this.toSendPage.bind(
														this,
														item
													)}
												>
													发送信息
												</button>

												{item.enable && (
													<button
														onClick={this.operateUser.bind(
															this,
															item
														)}
													>
														冻结账户
													</button>
												)}
												{!item.enable && (
													<button
														onClick={this.operateUser.bind(
															this,
															item
														)}
														style={{
															background:
																"#e3e3e3"
														}}
													>
														解冻账户
													</button>
												)}
											</div>
										</div>
									);
								})}
						</div>
						<div className="pagination-box">
							{userList &&
								Math.ceil(userList.total / per_page) > 1 && (
									<Pagination
										onChange={this.onChange.bind(this)}
										//defaultCurrent={userList.current_page}
										total={userList.total}
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
