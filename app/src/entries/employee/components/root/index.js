import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Pagination } from "antd";
import Menu from "../../../../components/menu/index.js";
import Title from "../../../../components/title/index.js";
import Bigbtn from "../../../../components/bigbtn/index.js";
import Progress from "../../../../components/progress/index.js";
import { toHref } from "../../../../utils/util";

import icon from "../../../../assets/images/jiaoseguanli_ico.png";

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
		let param = {
			per_page: state.per_page,
			page: state.page
		};
		this.props.getEmployeeList(param);
	}
	addPage() {
		toHref("addemployee");
	}
	editEmployee(item) {
		toHref("addemployee", `id=${item.id}`);
	}
	detelEmployee(item) {
		let id = item.id;
		this.props.deletEmployee(id).then(res => {
			if (res.code == 4000) {
				this.getData(this.state);
			}
		});
	}
	onChange(res) {
		this.setState({
			page: res
		});
	}
	render() {
		const { per_page } = this.state;
		const { employeeList } = this.props;
		return (
			<div className="mainBox ui">
				<Menu curmenu="system" curchildmenu="employee" />
				<div className="home-box f1 permisBox1">
					<Title namestr="员工管理" />
					<div className="bigbtnBox ui">
						<div onClick={this.addPage.bind(this)}>
							<Bigbtn namestr="添加员工" icon={icon} />
						</div>
					</div>
					<div className="listBox table">
						<div className="listBoxThead ui">
							<span style={{ width: "30px" }}>序号</span>
							<span className="f1">员工名字</span>
							<span className="f1">手机号</span>
							<span className="f1">权限</span>
							<span style={{ width: "130px" }}>操作</span>
						</div>
						<div className="listBoxTbody">
							{employeeList &&
								employeeList.data &&
								employeeList.data.length > 0 &&
								employeeList.data.map((item, index) => {
									return (
										<div
											key={index}
											className="tr ui center"
										>
											<div
												className="td"
												style={{ width: "30px" }}
											>
												{item.id}
											</div>
											<div className="f1 td">
												{item.name}
											</div>
											<div className="td f1">
												{item.phone}
											</div>
											<div className="f1 td">
												{item.menu_group &&
													item.menu_group.info &&
													item.menu_group.info
														.group_name}
											</div>
											<div
												className="td"
												style={{ width: "130px" }}
											>
												<button
													onClick={this.editEmployee.bind(
														this,
														item
													)}
												>
													编辑
												</button>
												<button
													onClick={this.detelEmployee.bind(
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
							{employeeList &&
								Math.ceil(employeeList.total / per_page) >
									1 && (
									<Pagination
										onChange={this.onChange.bind(this)}
										// defaultCurrent={
										// 	employeeList.current_page
										// }
										total={employeeList.total}
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
