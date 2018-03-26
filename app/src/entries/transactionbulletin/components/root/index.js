import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Dropdown, Icon, Modal, Button, Pagination } from "antd";
import { getLocalTime } from "../../../../utils/util";
import Menunav from "../../../../components/menu/index.js";
import Search from "../../../../components/search/index.js";
import Title from "../../../../components/title/index.js";
import Bigbtn from "../../../../components/bigbtn/index.js";
import Progress from "../../../../components/progress/index.js";

import icon1 from "../../../../assets/images/video_ico.png";
import icon2 from "../../../../assets/images/pic_ico.png";
import icon3 from "../../../../assets/images/text_ico.png";
import icon4 from "../../../../assets/images/file_ico.png";
import icon5 from "../../../../assets/images/trading_ico2.jpg";
import { toHref } from "../../../../utils/util";

import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			ca_id: 0,
			per_page: 10,
			page: 1,
			type: 16,
			lang: "zh",
			keyword: "",
			is_scroll: "",
			is_sole: "",
			newsType: [
				"所有类型",
				"文本",
				"图文",
				"视频",
				"Trading view",
				"文件"
			],
			caidlist: ["筛选交易所"],
			caidlistname: "筛选交易所",
			caid: [0],
			source_name: "筛选交易所"
		};
	}
	componentDidMount() {
		this.getData(this.state);
		this.props.getProjectList().then(res => {
			if (res.code == 4000) {
				var list = res.data;
				var nameList = ["筛选交易所"];
				list.forEach((val, idx) => {
					nameList.push(val);
				});
				this.setState({
					caidlist: nameList
				});
			}
		});
	}
	componentWillUpdate(nextProps, nextState) {
		if (
			nextState.page != this.state.page ||
			nextState.source_name != this.state.source_name ||
			nextState.lang != this.state.lang ||
			nextState.keyword != this.state.keyword ||
			nextState.is_scroll != this.state.is_scroll ||
			nextState.is_sole != this.state.is_sole
		) {
			this.getData(nextState);
		}
	}
	getData(state) {
		let param = {
			type: state.type,
			per_page: state.per_page,
			page: state.page
		};
		if (state.keyword.length > 0) {
			param.keyword = state.keyword;
		}
		if (state.source_name == "筛选交易所") {
			param.author = "";
		} else {
			param.author = state.source_name;
		}
		this.props.getTransList(param).then(res => {
			this.setState({
				transList: res.data
			});
		});
	}
	addVideoNews() {
		toHref("addchooselng", "to=addtransactionbulletin?type=3");
	}
	addNews(){
		toHref("addchooselng", "to=choicebulletin");
	}
	getType(type) {
		var res = "";
		switch (type) {
			case 1:
				res = "文本";
				break;
			case 2:
				res = "图文";
				break;
			case 3:
				res = "视频";
				break;
			case 4:
				res = "Trading view";
				break;
			case 6:
				res = "文件";
				break;
		}
		return res;
	}
	onChange(res) {
		this.setState({
			page: res
		});
	}
	searchClick(res) {
		this.setState({
			keyword: res,
			page: 1
		});
	}
	typeChoose(res) {
		let type = res.key;
		this.setState({
			type,
			page: 1
		});
	}
	caidChoose(res) {
		let key = res.key;
		let caidlist = this.state.caidlist;
		this.setState({
			source_name: caidlist[key],
			page: 1
		});
	}
	deleteNews(item) {
		const that = this;
		Modal.confirm({
			title: "提示",
			content: "确认删除",
			onOk: function() {
				that.props
					.deleteNews({
						id: item.id
					})
					.then(res => {
						that.getData(that.state);
					});
			},
			onCancel: function() {}
		});
	}
	//编辑资讯
	editNews(item) {
		let lng = item.lang;
		if (lng == "zh") {
			lng = "cn";
		}
		let id = item.id;
		let type = item.type;
		if (type == 6) type = 4;
		else if (type == 1) type = 3;
		else if (type == 2) type = 2;
		else if (type == 3) type = 1;
		else if (type == 4) type = 5;
		toHref("addtransactionbulletin", "id=" + id);
	}
	render() {
		const {
			per_page,
			searchClick,
			newsType,
			type,
			caidlist,
			caidlistname,
			ca_id,
			transList,
			source_name
		} = this.state;
		const menu = (
			<Menu onClick={this.typeChoose.bind(this)}>
				{newsType &&
					newsType.map((item, index) => {
						return <Menu.Item key={index}>{item}</Menu.Item>;
					})}
			</Menu>
		);
		const menu2 = (
			<Menu onClick={this.caidChoose.bind(this)}>
				{caidlist &&
					caidlist.map((item, index) => {
						return <Menu.Item key={index}>{item}</Menu.Item>;
					})}
			</Menu>
		);

		return (
			<div className="mainBox ui">
				<Menunav curmenu="news" curchildmenu="transactionbulletin" />
				<div className="home-box f1 newsBox">
					<Title namestr="交易所公告" />
					<div className="searchbox ui ai-c">
						<div className="searchinput">
							<Search
								search={this.searchClick.bind(this)}
								placeholder="查找标题"
							/>
						</div>
						<Dropdown overlay={menu2} placement="bottomLeft">
							<Button>
								{source_name}
								<Icon type="down" />
							</Button>
						</Dropdown>
					</div>
					
					{/*<div className="bigbtnBox ui">
						<div onClick={this.addVideoNews.bind(this)}>
							<Bigbtn namestr="添加交易所公告" icon={icon1} />
						</div>
					</div>*/}
					
					<div className="bigbtnBox ui">
						<div onClick={this.addNews.bind(this)}>
							<Bigbtn namestr="添加" icon={icon1} />
						</div>
					</div>
					<div className="listBox table">
						<div className="listBoxThead ui">
							<div className="f1">
								<span>序号</span>
							</div>
							<div className="f1">
								<span>文章ID</span>
							</div>
							<div className="f1">
								<span>交易所</span>
							</div>
							<div className="f2">
								<span>标题</span>
							</div>
							<div className="f2">
								<span>修改时间</span>
							</div>
							<div className="f3">
								<span>操作</span>
							</div>
						</div>
						<div className="listBoxTbody">
							{transList &&
								transList.data &&
								transList.data.length > 0 &&
								transList.data.map((item, index) => {
									return (
										<div
											key={index}
											className="ui cell-content"
										>
											<div className="f1">
												<span>{index + 1}</span>
											</div>
											<div className="f1">
												<span>{item.id}</span>
											</div>
											<div className="f1">
												<span>{item.author}</span>
											</div>
											<div className="f2">
												<span>{item.title}</span>
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
													onClick={this.editNews.bind(
														this,
														item
													)}
												>
													编辑
												</button>
												<button
													onClick={this.deleteNews.bind(
														this,
														item
													)}
												>
													删除
												</button>
												<Link
                        		className={"linkBtn"}
                        		to={{
															pathname: "editReadNum",
															search: `?id=${item.id}&lang=${this.state.lang}&click_rate_truth=${item.click_rate_truth}&click_rate=${item.click_rate}`
														}}>
                            修改阅读量
                        </Link>
											</div>
										</div>
									);
								})}
						</div>
						<div className="listBoxTable Hide">
							<table>
								<thead>
									<tr>
										<th style={{ width: "30px" }}>序号</th>
										<th style={{}}>员工名字</th>
										<th style={{}}>手机号</th>
										<th style={{}}>权限</th>
										<th style={{ width: "130px" }}>操作</th>
									</tr>
								</thead>
								<tbody>
									<tr className="">
										<td>01</td>
										<td>张三</td>
										<td>13800138000</td>
										<td>管理员</td>
										<td>
											<button>编辑</button>
											<button>删除</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="pagination-box">
							{transList &&
								Math.ceil(transList.total / per_page) > 1 && (
									<Pagination
										onChange={this.onChange.bind(this)}
										// defaultCurrent={transList.current_page}
										total={transList.total}
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
