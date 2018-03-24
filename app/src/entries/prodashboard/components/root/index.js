import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal } from "antd";
import Menu from "../../../../components/menu/index.js";
import BackBtn from "../../../../components/backbtn/index.js";

import icon from "../../../../assets/images/member_img.png";
import add from "../../../../assets/images/addbanben_ico.png";
import open from "../../../../assets/images/sousuotuijian_ico.png";
import close from "../../../../assets/images/xianshixiangmu.png";
import change from "../../../../assets/images/biangeng_ico.png";
import { getQuery, toHref } from "../../../../utils/util.js";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: 1,
			isRecommend: false,
			isShow: false,
			img: "",
			long_name: "",
			name: "",
			type_name: "",
			desc: ""
		};
	}
	componentDidMount() {
		let search = this.props.location.search;
		let type = getQuery(search).type;
		let c_id = getQuery(search).c_id;
		let lng = getQuery(search).lng;

		this.setState({
			type,
			c_id,
			lng
		});

		//获取项目详情
		this.props.getProDetail(c_id).then(res => {
			let data = res.data;
			this.setState({
				img: data.img,
				long_name: data.long_name,
				name: data.name,
				type_name: data.type_name,
				desc: data.desc,
				isRecommend: data.is_top,
				isShow: data.enable
			});
		});
	}
	addVersion() {
		let type = this.state.type;
		let c_id = this.state.c_id;
		if (type == 1) {
			toHref("addchooselng", "to=addprojectstep&c_id=" + c_id);
		} else if (type == 2) {
			toHref(
				"addchooselng",
				"to=addprojectstep&c_id=" + c_id + "&model=ico"
			);
		}
	}
	triggerSearch() {
		let isRecommend = !this.state.isRecommend;
		this.setState({
			isRecommend
		});
		let obj = {
			is_top: isRecommend
		};
		let data = {
			c_id: this.state.c_id,
			params: obj
		};
		this.props.putTopRecommend(data).then(res => {});
	}
	triggerShow() {
		let isShow = !this.state.isShow;
		this.setState({
			isShow
		});
		let obj = {
			enable: isShow
		};
		let data = {
			c_id: this.state.c_id,
			params: obj
		};
		this.props.putTopRecommend(data).then(res => {});
	}
	toCnEdit() {
		let type = this.state.type;
		if (type == 1) {
			toHref("addprojectstep", "lng=cn&c_id=" + this.state.c_id);
		} else if (type == 2) {
			toHref(
				"addprojectstep",
				"lng=cn&c_id=" + this.state.c_id + "&model=ico"
			);
		}
	}
	toEnEdit() {
		let type = this.state.type;
		if (type == 1) {
			toHref("addprojectstep", "lng=en&c_id=" + this.state.c_id);
		} else if (type == 2) {
			toHref(
				"addprojectstep",
				"lng=en&c_id=" + this.state.c_id + "&model=ico"
			);
		}
	}
	changeType() {
        var obj = {
            id: this.state.c_id
        };
        if(this.state.type == 1){
            obj.type = 2
        }else{
            obj.type = 1
        }
		this.props.putChangeType(obj).then(res => {
			this.setState({
				type:  obj.type
			});
        });
	}
	render() {
		const {
			noChange,
			type,
			isRecommend,
			isShow,
			img,
			long_name,
			name,
			type_name,
			desc
		} = this.state;
		const {} = this.props;

		return (
			<div className="mainBox ui dashboard">
				<BackBtn tosit="project" />
				<div className="messtop ui fd-c ai-c">
					<div className="imgbox">
						<img src={img} alt="" />
					</div>
					<div className="mess1 ui jc-sa ai-c">
						<span className="text1">{name}</span>
						<span className="text2">({long_name})</span>
					</div>
					<div className="trading">{type_name}</div>
					<div className="mess2">{desc}</div>
				</div>
				<div className="messMiddle ui ai-c jc-c">
					<div
						className="cellbox ui fd-c ai-c"
						onClick={this.addVersion.bind(this)}
					>
						<div className="icon">
							<img src={add} alt="" />
						</div>
						<div className="text1">添加版本</div>
					</div>
					<div
						className="cellbox ui fd-c ai-c"
						onClick={this.triggerSearch.bind(this)}
					>
						<div className="icon">
							{isRecommend ? (
								<img src={open} alt="" />
							) : (
								<img src={close} alt="" />
							)}
						</div>
						<div className="text1">搜索推荐</div>
						<div className="textcontent">
							增加搜索标签 提高项目点击次数
						</div>
					</div>
					<div
						className="cellbox ui fd-c ai-c"
						onClick={this.triggerShow.bind(this)}
					>
						<div className="icon">
							{isShow ? (
								<img src={open} alt="" />
							) : (
								<img src={close} alt="" />
							)}
						</div>
						<div className="text1">显示项目</div>
						<div className="textcontent">
							若选择不显示项目，项目数据
							仍在，但是暂时不在官网展示
						</div>
					</div>
					{/* 更改项目类型 */}
                    <div
                        className={
                            noChange
                                ? "cellbox ui fd-c ai-c "
                                : "cellbox ui fd-c ai-c"
                        }
                    >
                        <div
                            className="icon"
                            onClick={this.changeType.bind(this)}
                        >
                            <img src={change} alt="" />
                        </div>
                        <div className="text1">更改为{
                            type == 1 ? "ico" : "交易" 
                        }状态</div>
                        <div className="textcontent">
                            项目变更后，只保留项目基本
                            属性（概括、一些参数、介绍等）
                        </div>
                    </div>
				</div>
				<div className="mess4">版本编辑</div>
				<div className="btnbox ui jc-c ai-c">
					<button className="cn" onClick={this.toCnEdit.bind(this)}>
						中文版本编辑
					</button>
					<button className="cn" onClick={this.toEnEdit.bind(this)}>
						英文版本编辑
					</button>
				</div>
			</div>
		);
	}
}
