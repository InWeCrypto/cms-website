import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal } from "antd";
import LngChos from "../../../../components/lngchos/index.js";
import Backbtn from "../../../../components/backbtn/index.js";

import { getQuery, toHref } from "../../../../utils/util";
import choosed from "../../../../assets/images/selected_ico.png";
import nochoose from "../../../../assets/images/weixuan_ico.png";
import upload from "../../../../assets/images/shangchuan_ico.png";
import WebUploader from "../../../../assets/js/webuploader.min.js";

import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: 1,
			url: "",
			img: "",
			lang: null,
			name: "",
			id: null
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		this.setState({
			linkLang: q.lng,
			lang: q.lng
		});
		if (q.id) {
			this.props
				.getAdverDetail({
					id: q.id
				})
				.then(res => {
					if (res.code === 4000) {
						const { type, url, img, lang, id, name } = res.data;
						this.setState({
							type: type,
							url: url,
							img: img,
							imgadd: img,
							lang: lang,
							name: name,
							id: id
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
					img: imgAdd,
					imgadd: imgAdd
				});
			}
		});
	}
	changeType(type) {
		this.setState({
			type: type
		});
	}
	urlChange(e) {
		this.setState({
			url: e.target.value
		});
	}
	nameChange1(e) {
		this.setState({
			name: e.target.value
		});
	}
	submitData() {
		const { id, type, url, img, lang, name } = this.state;
		if (!id) {
			let param = {
				type: type,
				url: url,
				img: img,
				lang: lang,
				name: name
			};
			this.props.addAdver(param).then(res => {
				if (res.code === 4000) {
					toHref("advertisement");
				}
			});
		} else {
			let param = {
				id: id,
				type: type,
				url: url,
				img: img,
				lang: lang,
				name: name
			};
			this.props.editADVER(param).then(res => {
				if (res.code === 4000) {
					toHref("advertisement");
				}
			});
		}
	}
	goBack() {
		window.history.back();
	}
	render() {
		const { type, url, name, imgadd } = this.state;
		const {} = this.props;

		return (
			<div className="mainBox ui addadvertisementBox fd-c ai-c jc-c">
				<Backbtn />
				<div className="mbox contentBox ui fd-c jc-sa">
					<div className="box1 ui">
						<div className="text">广告位</div>
						<div className="textcontent ui ai-c">
							<div className="imgbox">
								<img src={type == 1 ? choosed : nochoose} />
							</div>
							<div
								onClick={this.changeType.bind(this, 1)}
								className="mess"
							>
								广告位1（小方块）
							</div>
							<div className="imgbox">
								<img src={type == 2 ? choosed : nochoose} />
							</div>
							<div
								onClick={this.changeType.bind(this, 2)}
								className="mess"
							>
								广告位2（长方形）
							</div>
						</div>
					</div>
					<div className="box1 ui">
						<div className="text">名称</div>
						<input
							className="minput"
							type="text"
							placeholder="输入名称"
							value={name}
							onChange={this.nameChange1.bind(this)}
						/>
					</div>
					<div className="box1 ui">
						<div className="text">链接</div>
						<input
							className="minput"
							type="text"
							placeholder="输入广告对应的显示链接"
							value={url}
							onChange={this.urlChange.bind(this)}
						/>
					</div>
					<div className="box1 ui">
						<div className="text">广告图</div>
						<div className="upload ui">
							<div className="imgbox">
								<div id="ban_uploader">
									<img src={upload} />
								</div>
							</div>
							{imgadd && (
								<div className="imgbox">
									<div>
										<img src={imgadd} />
									</div>
								</div>
							)}
							<div className="mess">
								广告位1的图建议尺寸为
								{type == 1 ? "195*209" : "714*142"}
							</div>
						</div>
					</div>
				</div>
				<button
					className="c-btn-big"
					onClick={this.submitData.bind(this)}
				>
					发布
				</button>
			</div>
		);
	}
}
