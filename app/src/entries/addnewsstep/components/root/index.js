import React, {PureComponent} from "react";
import {NavLink, Link} from "react-router-dom";
import {Menu, Dropdown, Icon, Modal, Button} from "antd";
import Progress from "../../../../components/progress/index.js";
import Input from "../../../../components/input/index.js";
import Input2 from "../../../../components/input2/index.js";
import Formtext from "../../../../components/formtext/index.js";
import Backbtn from "../../../../components/backbtn/index.js";
import DropDown from "../../../../components/dropdown/index.js";
import Editor from "../../../../components/editor/index.js";

import open from "../../../../assets/images/sousuotuijian_ico.png";
import close from "../../../../assets/images/xianshixiangmu.png";

import {getQuery, toHref, getRouteQuery} from "../../../../utils/util.js";
import webUploader from "../../../../assets/js/webuploader.min.js";

import "./index.less";
import {setTimeout} from "timers";
import {constants} from "fs";

export default class Root extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            category_id: 0,
            isShowSave: true,
            step: 1,
            isRelatePro: false,
            s_sole: false,
            progressArr: [
                {
                    name: "资讯概括",
                    iscomplete: false
                }, {
                    name: "编辑",
                    iscomplete: false
                }
            ],
            proDrapKey: 0,
            tagDrapKey: 0,
            levelType: ["高-在系统栏提示信息","低-在app中更新资讯，不在系统栏提示"],
            chooseLeveltype: 1
        };
    }
    componentDidMount() {
        const that = this;
        let search = this.props.location.search;
        let type = getQuery(search).type;
        this.setState({type});

        let query = getRouteQuery(this);
        if (query.lng == "en") {
            this.setState({lngText: "英文", curLng: "en"});
        } else if (query.lng == "cn" || query.lng == "zh") {
            this.setState({lngText: "中文", curLng: "zh"});
        }

        this.initNews();
        this.getFileOss();
    }
    getFileOss() {
        const that = this;
        //获取阿里云 key
        this
            .props
            .getFileOption()
            .then(res => {
                if (res.code === 4000) {
                    this
                        .setState({
                            keyOss: res.data
                        }, function () {
                            //视频封面上传
                            this
                                .uploaderImgById("uploadFaceImg", function (img) {
                                    that.setState({faceimg: img});
                                });
                        });
                    this.uploader(res.data);
                }
            });
    }
    //上传文件
    uploader(data) {
        const option = data;
        if (!option) {
            return;
        }
        this.setState({uploaderOption: option});
        let uploader = webUploader.create({
            auto: true,
            pick: {
                id: "#upFile",
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
                extensions: "pdf",
                mimeTypes: ".pdf"
            }
        });
        uploader.on("fileQueued", file => {
            option.filename = file.name;
        });
        uploader.on("uploadSuccess", res => {
            var imgAdd = option.host + "/" + option.dir + option.expire + option.filename;
            Modal.success({title: "提示", content: "上传成功"});
            this.setState({url: imgAdd, hasUpload: true});
        });
    }
    //上传图片
    uploaderImgById(id, callback) {
        const option = this.state.keyOss;
        if (!option) {
            return;
        }
        this.setState({uploaderOption: option});
        let uploader = webUploader.create({
            auto: true,
            pick: {
                id: "#" + id,
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
        uploader.on("fileQueued", file => {
            option.filename = file.name;
        });
        uploader.on("uploadSuccess", res => {
            var imgAdd = option.host + "/" + option.dir + option.expire + option.filename;
            callback(imgAdd);
        });
    }
    initNews() {
        function setCategory_id(that) {
            let category_id = that.state.category_id;
            let proIdArr = that.state.proIdArr;
            if (category_id && proIdArr && proIdArr.length > 1) {
                let idx = proIdArr.indexOf(category_id + "");
                that.setState({proDrapKey: idx});
            }
        }
        function setTags_id(that, id) {
            let tag_ids = that.state.tag_ids;
            if (id) {
                tag_ids = id;
            }
            let tagIdArr = that.state.tagIdArr;
            let tagNameArr = that.state.tagNameArr;

            if (tag_ids && tagIdArr && tagIdArr.length > 1) {
                let idx = tagIdArr.indexOf(tag_ids);
                that.setState({tagDrapKey: idx});
            }
        }
        let query = getRouteQuery(this);
        //获取项目列表
        this
            .props
            .getProList()
            .then(res => {
                let proArr = res.data;
                let proIdArr = [-1];
                let proNameArr = ["选择关联的项目"];
                for (var item in proArr) {
                    proNameArr.push(proArr[item]);
                    proIdArr.push(item);
                }
                this
                    .setState({
                        proIdArr,
                        proNameArr
                    }, function () {
                        setCategory_id(this);
                    });
            });
        if (query.lng) {
            if (query.lng == "cn" || query.lng == "zh") {
                var lang = "zh";
            } else {
                var lang = "en";
            }
            let params = {
                lang: lang
            };
            //获取标签列表
            this
                .props
                .getTagsList(params)
                .then(res => {
                    let tagArr = res.data.data;
                    let tagIdArr = [0];
                    let tagNameArr = ["选择关联的标签"];
                    tagArr.forEach((val, idx) => {
                        tagNameArr.push(val.name);
                        tagIdArr.push(val.id);
                    });
                    this.setState({tagIdArr, tagNameArr});
                    setTags_id(this);
                });
        }

        //获取资讯标签
        if (query.id) {
            this
                .props
                .getTagsById(query.id)
                .then(res => {
                    if (res.code == 4000) {
                        let te = res.data[0];
                        if (te) {
                            let pivot = te.pivot;
                            if (pivot) {
                                //console.log(5555, pivot.tag_id);
                                this.setState({
                                    tag_ids: pivot.tag_id
                                }, setTags_id(this, pivot.tag_id));
                            }
                        }
                    }
                });
        }

        //获取资讯的详情
        if (query.id) {
            if (query.lng == "en") {
                var querylang = "en";
            } else {
                var querylang = "zh";
            }
            let data = {
                id: query.id,
                params: {
                    lang: querylang
                }
            };
            this
                .props
                .getArticleDetail(data)
                .then(res => {
                    this
                        .setState({
                            ...res.data,
                            type: query.type
                        }, function () {
                            setCategory_id(this);
                        });
                    this.setState({faceimg: res.data.img, isRelatePro: res.data.is_sole, isRelatePro2: res.data.is_scroll});
                    //
                    // let type = res.data.type; if (type == 6) type = 4; if (type == 1) type = 3;
                    // if (type == 2) type = 2; if (type == 3) type = 1; this.setState({ 	type });
                    //
                    //推送优先
                    if(res.data.send_app_message){
                        this.setState({chooseLeveltype: 0});
                    }else{
                        this.setState({chooseLeveltype: 1});
                    }
                    let url = res.data.url;
                    if (url) {
                        this.setState({hasUpload: true});
                    }
                    let desc = res.data.desc;
                    if (desc) {
                        this.setState({isShowDes: true});
                        document
                            .getElementById("imgDesTextarea")
                            .value = desc;
                    }
                    if (res.data.content && window.editor) {
                        window
                            .editor
                            .appendHtml(res.data.content);
                    }

                    setTags_id(this);
                });
        }
    }
    nextStep1() {
        this.setState({
            step: 2,
            progressArr: [
                {
                    name: "资讯概括",
                    iscomplete: true
                }, {
                    name: "编辑",
                    iscomplete: false
                }
            ]
        });
    }
    publish() {
        toHref("news");
    }
    addDes() {
        this.setState({isShowDes: true});
        setTimeout(() => {
            document
                .getElementById("imgDesTextarea")
                .focus();
        }, 100);
    }
    //是否原创
    triggerRelate() {
        let isRelatePro = !this.state.isRelatePro;
        this.setState({isRelatePro, is_sole: isRelatePro});
    }
    //是否轮播
    triggerRelate2() {
        let isRelatePro2 = !this.state.isRelatePro2;
        this.setState({isRelatePro2, is_scroll: isRelatePro2});
    }
    //获取点击的项目id
    getDropdownKeyProId(idx) {
        let proIdArr = this.state.proIdArr;
        let id = proIdArr[idx];
        this.setState({category_id: id, proDrapKey: idx});
    }
    //获取点击的标签id
    getDropdownKeyTagId(idx) {
        let tagIdArr = this.state.tagIdArr;
        let id = tagIdArr[idx];
        this.setState({tag_ids: id, tagDrapKey: idx});
    }
    //获取title
    getTitle(val) {
        this.setState({title: val});
    }
    getSourceUrl(val) {
        this.setState({source_url: val});
    }
    //保存简述
    saveDesc() {
        let desc = document
            .getElementById("imgDesTextarea")
            .value;
        this.setState({desc});
        Modal.success({title: "提示", content: "描述保存成功"});
        this.setState({isShowSave: false});
    }
    //视屏链接
    getUrl(val) {
        this.setState({url: val});
    }
    //完成
    newDone() {
        let type = this.state.type;
        let data = {
            category_id: this.state.category_id || 0,
            title: this.state.title || "",
            img: this.state.faceimg || "",
            url: this.state.url || "",
            desc: this.state.desc || "",
            is_sole: this.state.is_sole || false,
            is_scroll: this.state.is_scroll || false,
            lang: this.getLng()
        };
        if (this.state.source_url) {
            data.source_url = this.state.source_url;
        }
        //推送优先级
        if(this.state.chooseLeveltype == 0){
            data.send_app_message = true;
        }else{
            data.send_app_message = false;
        }

        //判断类型 视频
        if (type == 1) {
            data.type = 3;
            data.content = this.state.url || "";
        }
        //图文
        if (type == 2) {
            data.type = 2;
            data.content = window
                .editor
                .fullHtml();
        }
        //trading图文
        if (type == 5) {
            data.type = 4;
            data.content = window
                .editor
                .fullHtml();
        }
        //文本
        if (type == 3) {
            data.type = 1;
            data.content = window
                .editor
                .fullHtml();
        }
        //文件
        if (type == 4) {
            data.type = 6;
            data.content = "";
        }
        //trading 视频
        if (type == 7) {
            data.type = 7;
            data.content = this.state.url || "";
        }
        
        //
        //扩展处理 排除1-7，8开始
        //
        //文本、图文  8帮助中心-文本 9帮助中心-图文 12帮助中心-文本 13观点资讯-图文
        if (type == 8 || type == 9 || type == 12|| type == 13) {
            data.type = type;
            data.content = window
                .editor
                .fullHtml();
        }
        //视屏  10帮助中心-视频  14观点资讯-视频
        if (type == 10 || type == 14) {
            data.type = type;
            data.content = this.state.url || "";
        }
        //文件  11帮助中心-文件  15观点资讯-文件
        if (type == 11 || type == 15) {
            data.type = type;
            data.content = "";
        }



        let query = getRouteQuery(this);
        if (query.id) {
            //
            let params = {
                id: query.id,
                data: data
            };
            this
                .props
                .putArticle(params)
                .then(res => {
                    if (res.code == 4000) {
                        //等返回值
                        let tag_ids = this.state.tag_ids;
                        if (!tag_ids) {
                            toHref("news");
                            return;
                        }
                        let data = {
                            id: query.id,
                            params: {
                                tag_ids: [tag_ids]
                            }
                        };
                        this
                            .props
                            .postArticleTag(data)
                            .then(res => {
                                //是trading
                                if (type == 5 || type == 7) {
                                    toHref("tradingnews");
                                } else if(type == 8 || type == 9 || type == 10 || type == 11){
                                    //返回帮助中心
                                    toHref("helpcenter");
                                }
                                else if(type == 12 || type == 13 || type == 14 || type == 15){
                                    toHref("newsopinion");
                                }
                                else {
                                    //toHref("news");
                                    window.history.go(-2);
                                }
                            });
                    }
                });
        } else {
            //创建
            this
                .props
                .postArticle(data)
                .then(res => {
                    if (res.code == 4000) {
                        //等返回值
                        let tag_ids = this.state.tag_ids;
                        let data = {
                            id: res.data.id,
                            params: {
                                tag_ids: [tag_ids]
                            }
                        };
                        this
                            .props
                            .postArticleTag(data)
                            .then(res => {
                                //是trading
                                if (type == 5 || type == 7) {
                                    toHref("tradingnews");
                                }else if(type == 8 || type == 9 || type == 10 || type == 11){
                                    //返回帮助中心
                                    toHref("helpcenter");
                                }
                                else if(type == 12 || type == 13 || type == 14 || type == 15){
                                    toHref("newsopinion");
                                }
                                 else {
                                    toHref("news");
                                }
                            });
                    }
                });
        }
    }
    getLng() {
        let curLng = this.state.curLng;
        if (curLng) {
            return curLng;
        }
        let query = getRouteQuery(this);
        if (query.lng == "cn" || query.lng == "zh") {
            return "zh";
        } else {
            return "en";
        }
    }
    textareaFocus() {
        this.setState({isShowSave: true});
    }
    chooseLng(lng) {
        if (lng == "en") {
            this.setState({lngText: "英文", curLng: "en"});
        }
        if (lng == "zh") {
            this.setState({lngText: "中文", curLng: "zh"});
        }
    }
    typeChoose(res) {
        let type = res.key;
        this.setState({chooseLeveltype: type});
    }
    render() {
        const {
            curLng,
            progressArr,
            step,
            type,
            isShowDes,
            isRelatePro,
            isRelatePro2,
            lngText,
            proIdArr,
            proNameArr,
            tagIdArr,
            tagNameArr,
            faceimg,
            proDrapKey,
            tagDrapKey,
            title,
            url,
            isShowSave,
            hasUpload,
            source_url,
            levelType,
            chooseLeveltype
        } = this.state;
        const {} = this.props;
        const logoContent = (
            <div className="content ui">
                <div className="updatelogo"/>
                <div className="textmess">
                    上传项目的logo，尺寸为：94*94,可提让UI提供
                </div>
            </div>
        );
        const menu = (
            <Menu onClick={this
                .typeChoose
                .bind(this)}>
                    {levelType && levelType.map((item, index) => {
                        return <Menu.Item key={index}>{item}</Menu.Item>;
                    })}
            </Menu>
        );
        return (
            <div className="mainBox addnewsstep ">
                <Backbtn/>
                <div className="title">
                    你正在编辑{lngText}版本，请全部使用{lngText}描述 &nbsp;&nbsp;&nbsp;
                    <span
                        className={curLng == "zh"
                        ? "mess cur"
                        : "mess"}
                        onClick={this
                        .chooseLng
                        .bind(this, "zh")}>
                        中文
                    </span>
                    &nbsp;&nbsp;
                    <span
                        className={curLng == "en"
                        ? "mess cur"
                        : "mess"}
                        onClick={this
                        .chooseLng
                        .bind(this, "en")}>
                        英文
                    </span>
                </div>
                {/* <div className="progessbox">
					<Progress arr={progressArr} />
				</div> */}
                <div
                    className={step == 1
                    ? "step1"
                    : "step1 Hide"}>
                    <div className="formBox1 ui fd-c jc-sa">
                        <Input
                            val={title}
                            getval={this
                            .getTitle
                            .bind(this)}
                            name="资讯标题"
                            placeholder="请填写资讯的标题"
                            width="6.32rem"/>
                        <Input
                            val={source_url}
                            getval={this
                            .getSourceUrl
                            .bind(this)}
                            name="原文链接"
                            placeholder="非必填项"
                            width="6.32rem"/>
                        <div className="proAndnew ui ">
                            {proNameArr && (
                                <div className="pro">
                                    <div className="mess">关联项目</div>
                                    <DropDown
                                        type={proDrapKey}
                                        getkey={this
                                        .getDropdownKeyProId
                                        .bind(this)}
                                        typeList={proNameArr}/>
                                </div>
                            )}
                            {tagNameArr && (
                                <div className="new">
                                    <div className="mess">关联标签</div>
                                    <DropDown
                                        type={tagDrapKey}
                                        getkey={this
                                        .getDropdownKeyTagId
                                        .bind(this)}
                                        typeList={tagNameArr}/>
                                </div>
                            )}
                        </div>
                        {
                            !(type == 8 || type == 9 || type == 10 || type == 11) && (
                                <div className="proAndnew ui level">
                                    <div className="new ">
                                        <div className="mess">推送优先级</div>
                                        <Dropdown overlay={menu} placement="bottomLeft">
                                            <Button>
                                                {levelType[chooseLeveltype]}
                                                <Icon type="down"/>
                                            </Button>
                                        </Dropdown>
                                    </div>
                                </div>
                            )
                        }
                        
                        <div className="orgial">
                            <div className="half">
                                <div className="mess">是否原创</div>
                                <div className="icon ui ">
                                    <div
                                        className="imgbox"
                                        onClick={this
                                        .triggerRelate
                                        .bind(this)}>
                                        {isRelatePro
                                            ? (<img src={open} alt=""/>)
                                            : (<img src={close} alt=""/>)}
                                    </div>
                                    <div
                                        className="text"
                                        onClick={this
                                        .triggerRelate
                                        .bind(this)}>
                                        {isRelatePro
                                            ? "是"
                                            : "否"}
                                    </div>
                                </div>
                            </div>
                            {(type == 2 || type == 1 || type == 4 ) && (
                                <div className="half">
                                    <div className="mess">是否轮播</div>
                                    <div className="icon ui ">
                                        <div
                                            className="imgbox"
                                            onClick={this
                                            .triggerRelate2
                                            .bind(this)}>
                                            {isRelatePro2
                                                ? (<img src={open} alt=""/>)
                                                : (<img src={close} alt=""/>)}
                                        </div>
                                        <div
                                            className="text"
                                            onClick={this
                                            .triggerRelate2
                                            .bind(this)}>
                                            {isRelatePro2
                                                ? "是"
                                                : "否"}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* t视频 10帮助中心-视频*/}
                    {(type == 1 || type == 7 || type == 10 || type == 14) && (
                        <div className="step2">
                            <div className="middleBtn ui ai-c jc-c">
                                <div className="faceimg mbox">
                                    添加封面
                                    <span>建议封面尺寸为288*190</span>
                                    <div className="upFaceImg" id="uploadFaceImg"/> {faceimg && (<img className="img" src={faceimg} alt=""/>)}
                                </div>
                                <div
                                    className={isShowDes
                                    ? "faceimg mbox"
                                    : "faceimg mbox Hide"}>
                                    <textarea
                                        name=""
                                        id="imgDesTextarea"
                                        cols="30"
                                        rows="10"
                                        onChange={this
                                        .textareaFocus
                                        .bind(this)}/> {isShowSave && (
                                        <button
                                            onClick={this
                                            .saveDesc
                                            .bind(this)}>
                                            保存
                                        </button>
                                    )}
                                </div>

                                <div
                                    className={!isShowDes
                                    ? "faceimg mbox"
                                    : "faceimg mbox Hide"}
                                    onClick={this
                                    .addDes
                                    .bind(this)}>
                                    添加描述
                                </div>
                            </div>
                            <div className="inContainer ui ai-c jc-c">
                                <Input
                                    val={url}
                                    getval={this
                                    .getUrl
                                    .bind(this)}
                                    name="视频链接"/>
                            </div>
                            {/* <div className="ui btnbox jc-sb ">
								<button
									className="c-btn-big btn-next"
									onClick={this.publish.bind(this)}
								>
									提交发布
								</button>
							</div> */}
                        </div>
                    )}

                    {/*  图文或者文本 8帮助中心-文本,9帮助中心-图文,12观点资讯-文本,13观点资讯-图文*/}
                    {(type == 2 || type == 3 || type == 5 || type == 8 || type == 9 || type == 12 || type == 13 ) && (
                        <div className="step2">
                            <div className="middleBtn ui ai-c jc-c">
                                {type != 3 && (
                                    <div className="faceimg mbox">
                                        添加封面
                                        <span>建议封面尺寸为288*190</span>
                                        <div className="upFaceImg" id="uploadFaceImg"/> {faceimg && (<img className="img" src={faceimg} alt=""/>)}
                                    </div>
                                )}

                                <div
                                    className={isShowDes
                                    ? "faceimg mbox"
                                    : "faceimg mbox Hide"}>
                                    <textarea
                                        name=""
                                        id="imgDesTextarea"
                                        cols="30"
                                        rows="10"
                                        onChange={this
                                        .textareaFocus
                                        .bind(this)}/> {isShowSave && (
                                        <button
                                            onClick={this
                                            .saveDesc
                                            .bind(this)}>
                                            保存
                                        </button>
                                    )}
                                </div>

                                <div
                                    className={!isShowDes
                                    ? "faceimg mbox"
                                    : "faceimg mbox Hide"}
                                    onClick={this
                                    .addDes
                                    .bind(this)}>
                                    添加描述
                                </div>
                            </div>

                            <div className="editor mbox">
                                <Editor/>
                            </div>
                            {/* <div className="ui btnbox jc-sb ">
								<button
									className="c-btn-big btn-next"
									onClick={this.publish.bind(this)}
								>
									提交发布
								</button>
							</div> */}
                        </div>
                    )}
                    {/* 文件 11帮助中心-文件 15观点资讯-文件*/}
                    {(type == 4 || type == 11 || type == 15)  && (
                        <div className="step2">
                            <div className="middleBtn ui ai-c jc-c">
                                <div className="faceimg mbox">
                                    添加封面
                                    <span>建议封面尺寸为288*190</span>
                                    <div className="upFaceImg" id="uploadFaceImg"/> {faceimg && (<img className="img" src={faceimg} alt=""/>)}
                                </div>
                                <div
                                    className={isShowDes
                                    ? "faceimg mbox"
                                    : "faceimg mbox Hide"}>
                                    <textarea
                                        name=""
                                        id="imgDesTextarea"
                                        cols="30"
                                        rows="10"
                                        onChange={this
                                        .textareaFocus
                                        .bind(this)}/> {isShowSave && (
                                        <button
                                            onClick={this
                                            .saveDesc
                                            .bind(this)}>
                                            保存
                                        </button>
                                    )}
                                </div>

                                <div
                                    className={!isShowDes
                                    ? "faceimg mbox"
                                    : "faceimg mbox Hide"}
                                    onClick={this
                                    .addDes
                                    .bind(this)}>
                                    添加描述
                                </div>
                                <div className="faceimg mbox">
                                    {hasUpload
                                        ? "已上传"
                                        : "上传文件"}
                                    <div className="uploadFile" id="upFile"/>
                                </div>
                            </div>

                            {/* <div className="ui btnbox jc-sb ">
								<button
									className="c-btn-big btn-next"
									onClick={this.publish.bind(this)}
								>
									提交发布
								</button>
							</div> */}
                        </div>
                    )}
                    <button
                        className="c-btn-big btn-next"
                        onClick={this
                        .newDone
                        .bind(this)}>
                        完成
                    </button>
                </div>
                <div
                    className={step == 2
                    ? "step2"
                    : "step2 Hide"}/>

                <div className="stepEnd ui fd-c Hide">
                    <h1>发布成功！</h1>
                    <h3>请及时通知后端同学配置项目其他参数</h3>
                    <button
                        className="c-btn-big btn-next"
                        style={{
                        width: "2.3rem"
                    }}>
                        返回项目页查看详情
                    </button>
                </div>
            </div>
        );
    }
}
