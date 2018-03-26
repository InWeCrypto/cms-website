import React, {PureComponent} from "react";
import { message, Menu, Button, InputNumber } from "antd";
import {getLocalTime, getRouteQuery} from "../../../../utils/util";
import Menunav from "../../../../components/menu/index.js";
import Title from "../../../../components/title/index.js";
import "./index.less";

export default class Root extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            lang: "zh",
            num: null,
            id:'',
            click_rate_truth: "",
            click_rate: "",
        };
    }
    componentDidMount() {
    		const { id, lang, click_rate_truth, click_rate} = getRouteQuery(this);
        this.setState({
        	id,
        	lang,
        	click_rate_truth,
        	click_rate,
        });
    }
    putEditData(){
    	this.props.editdata({
    		id: this.state.id,
    		click_rate: this.state.num,
    	}).then(res=>{
    		this.setState({click_rate: this.state.num})
    		message.info(res.msg);
    	})
    }
    numChange(value){
    	this.setState({num: value});
    }
    render() {
        const { click_rate_truth, click_rate} = this.state;
        return (
            <div className="mainBox ui ">
                <Menunav curmenu="news" curchildmenu="helpcenter"/>
                <div className="home-box f1 editReadNum">
                    <Title namestr="修改阅读量"/>
                    <div className="ct">
											<ul>
												<li>
													<label>实际阅读量：</label>
													<p>{click_rate_truth}</p>
												</li>
												<li>
													<label>现在阅读量：</label>
													<p>{click_rate}</p>
												</li>
												<li>
													<label>修改阅读量：</label>
													<InputNumber onChange={this.numChange.bind(this)} min={0} />
													<button onClick={this.putEditData.bind(this)} className="linkBtn">确定</button>
												</li>
											</ul>
										</div>
                </div>
            </div>
        );
    }
}
