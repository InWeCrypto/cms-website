import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, DatePicker, Menu, Dropdown, Icon, Button } from "antd";
import Progress from "../../../../components/progress/index.js";
import Input from "../../../../components/input/index.js";
import Input2 from "../../../../components/input2/index.js";
import Formtext from "../../../../components/formtext/index.js";
import BackBtn from "../../../../components/backbtn/index.js";
import WebUploader from "../../../../assets/js/webuploader.min.js";
import icon from "../../../../assets/images/member_img.png";
import upload from "../../../../assets/images/shangchuan_ico.png";
import { toHref, getRouteQuery } from "../../../../utils/util";

import "./index.less";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			type: "",
			name: "",
			gas: "",
			address: "",
			icon: "",
			category_id: "",
			id: null
		};
	}
	componentDidMount() {
		let query = getRouteQuery(this);
		if (query.tokenname && query.tokenid) {
			this.setState({
				text: query.tokenname,
				type: query.tokenname,
				category_id: query.tokenid
			});
		}
		if (query.id) {
			this.setState({
				id: query.id
			});
			this.props
				.getCapitalDetail({
					id: query.id
				})
				.then(res => {
					if (res.code === 4000) {
						let data = res.data;
						this.setState({
							icon: data.icon,
							address: data.address,
							gas: data.gas,
							id: data.id,
							name: data.name,
							category_id: data.category_id
						});
					}
				});
		}
		if (!this.props.imgOption) {
			this.props.getImgOption().then(res => {
				if (res.code === 4000) {
					this.upLoadImg(res.data);
				}
			});
		} else {
			this.upLoadImg(this.props.imgOption);
		}
	}

	onChange() {}
	upLoadImg(option) {
		if (!option) {
			return;
		}
		var _this = this;
		var uploader = WebUploader.create({
			auto: true,
			pick: {
				id: "#ban_uploader",
				multiple: false
			},
			formData: {
				key: option.dir + option.expire + "${filename}",
				host: option.host,
				policy: option.policy,
				Signature: option.signature,
				callback: "",
				OSSAccessKeyId: option.accessid
			},
			server: option.host,
			method: "POST",
			accept: {
				extensions: "jpg,jpeg,bmp,png",
				mimeTypes: "image/jpg,image/jpeg,image/png,image/bmp"
			}
		});
		uploader.on("beforeFileQueued", res => {
			var r = res;
			var name =
				parseInt(Math.random() * 10000000) + new Date().getTime();
			var ruid = r.source.ruid;
			r.name = name + "_ruid_" + ruid + "_name_" + r.name;
			uploader.reset();
			return r;
		});
		uploader.on("fileQueued", file => {
			var r = file;
			option.filename = file.name;
		});
		uploader.on("uploadSuccess", res => {
			if (res.id) {
				var imgAdd =
					option.host +
					"/" +
					option.dir +
					option.expire +
					option.filename;
				this.setState({
					icon: imgAdd,
					callbackimg: imgAdd
				});
			}
		});
	}
	inputChange(type, e) {
		this.setState({
			[type]: e.target.value
		});
	}
	onSubmit() {
		const { id, name, gas, address, icon, category_id } = this.state;
		//oHref("capital");

		let reg = /^[0-9a-zA-Z]+$/;
		if (!reg.test(address)) {
			Modal.warning({
				title: "提示",
				content: "合约地址只能由数字字母组成"
			});
			return;
		}

		if (!id) {
			let param = {
				name: name,
				gas: gas,
				address: address,
				icon: icon,
				category_id: category_id
			};
			this.props.sendCapital(param).then(res => {
				if (res.code === 4000) {
					Msg.prompt("保存成功");
					setTimeout(() => {
						toHref("capital");
					}, 3000);
				}
			});
		} else {
			let param = {
				name: name,
				gas: gas,
				address: address,
				icon: icon,
				category_id: category_id,
				id: id
			};
			this.props.editCapitalDetail(param).then(res => {
				if (res.code === 4000) {
					Msg.prompt("保存成功");
					setTimeout(() => {
						toHref("capital");
					}, 3000);
				}
			});
		}
	}
	render() {
		const {
			progressArr,
			text,
			name,
			gas,
			address,
			img,
			callbackimg
		} = this.state;
		const {} = this.props;

		return (
			<div className="mainBox userSendMessBox ui fd-c ai-c jc-c">
				<BackBtn />
				<div className="title">添加{text}资产</div>
				<div className="step1 ">
					<div className="formBox1 ui fd-c jc-sa">
						<div className="box1 ui">
							<div className="text">项目全称</div>
							<input
								className="minput"
								type="text"
								placeholder="请输入项目的全称，如Trinity"
								value={name}
								onChange={this.inputChange.bind(this, "name")}
							/>
						</div>
						<div className="box1 ui">
							<div className="text">GAS</div>
							<input
								className="minput"
								type="text"
								placeholder="GAS"
								value={gas}
								onChange={this.inputChange.bind(this, "gas")}
							/>
						</div>
						<div className="box1 ui">
							<div className="text">合约地址</div>
							<input
								className="minput"
								type="text"
								placeholder="合约地址"
								value={address}
								onChange={this.inputChange.bind(
									this,
									"address"
								)}
							/>
						</div>
						<div className="box1 ui">
							<div className="text">项目logo</div>
							<div className="upload ui">
								<div className="imgbox" id="ban_uploader">
									<img src={upload} alt="" />
								</div>
								{callbackimg && (
									<div className="imgbox">
										<img src={callbackimg} alt="" />
									</div>
								)}
								<div className="mess">
									上传项目的logo，尺寸为：100*100,可提让UI提供
								</div>
							</div>
						</div>
					</div>
					<button
						className="c-btn-big btn-next"
						onClick={this.onSubmit.bind(this)}
					>
						提交
					</button>
				</div>
			</div>
		);
	}
}
