import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";

import Login from "./entries/login";
import Home from "./entries/home";
import Permission from "./entries/permission";
import PermissionStep from "./entries/permissionstep";
import Revisepersonal from "./entries/revisepersonal";
import Project from "./entries/project";
import AddChooseLng from "./entries/addchooselng";
import AddProjectStep from "./entries/addprojectstep";
import AddProjectStep2 from "./entries/addprojectstep2";
import AddProjectStep3 from "./entries/addprojectstep3";
import AddProjectStepIco from "./entries/addprojectstepico";
import AddProjectStepIco3 from "./entries/addprojectstepico3";
import AddProjectStepIco4 from "./entries/addprojectstepico4";
import ProDashboard from "./entries/prodashboard";
import Employee from "./entries/employee";
import News from "./entries/news";
import Newsproject from "./entries/newsproject";
import Newsopinion from "./entries/newsopinion";
import Newsdynamic from "./entries/newsdynamic";
import Tradingnews from "./entries/tradingnews";
import AddNewsStep from "./entries/addnewsstep";
import Trading from "./entries/trading";
import AddTrading from "./entries/addtrading";
import Comment from "./entries/comment";
import Advertisement from "./entries/advertisement";
import AddAdvertisement from "./entries/addadvertisement";
import User from "./entries/user";
import UserSendMess from "./entries/usersendmess";
import Capital from "./entries/capital";
import AddCapital from "./entries/addcapital";
import Label from "./entries/label";
import AddLabel from "./entries/addlabel";
import Social from "./entries/social";
import AddSocial from "./entries/addsocial";
import AddEmployee from "./entries/addemployee";
import Authority from "./entries/authority";
import AddAuthor from "./entries/addauthor";
import Addtransactionbulletin from "./entries/addtransactionbulletin";
import Transactionbulletin from "./entries/transactionbulletin";
import Helpcenter from "./entries/helpcenter";
import Choicebulletin from "./entries/choicebulletin";
import EditReadNum from "./entries/editReadNum";
import Feedback from "./entries/feedback";
import Useroptions from "./entries/useroptions";
import Useroptionslist from "./entries/useroptionslist";

//authority  addauthor
export default() => {
    return (
        <Switch>
            <Route path="/" exact component={Login}/> {/* <Route path="/" exact component={Home} /> */}
            <Route path="/home" component={Home}/>
            <Route path="/permission" component={Permission}/>
            <Route path="/addauthor" component={AddAuthor}/>
            <Route path="/permissionstep" component={PermissionStep}/>
            <Route path="/authority" component={Authority}/>
            <Route path="/revisepersonal" component={Revisepersonal}/>
            <Route path="/project" component={Project}/>
            <Route path="/addchooselng" component={AddChooseLng}/>
            <Route path="/addprojectstep" component={AddProjectStep}/>
            <Route path="/addprojectstep2" component={AddProjectStep2}/>
            <Route path="/addprojectstep3" component={AddProjectStep3}/>
            <Route path="/addprojectstepico" component={AddProjectStepIco}/>
            <Route path="/addprojectstepico3" component={AddProjectStepIco3}/>
            <Route path="/addprojectstepico4" component={AddProjectStepIco4}/>
            <Route path="/prodashboard" component={ProDashboard}/>
            <Route path="/employee" component={Employee}/>
            <Route path="/news" component={News}/>
            <Route path="/newsproject" component={Newsproject}/>
            <Route path="/newsopinion" component={Newsopinion}/>
            <Route path="/newsdynamic" component={Newsdynamic}/>
            <Route path="/tradingnews" component={Tradingnews}/>
            <Route path="/addnewsstep" component={AddNewsStep}/>
            <Route path="/trading" component={Trading}/>
            <Route path="/addtrading" component={AddTrading}/>
            <Route path="/comment" component={Comment}/>
            <Route path="/advertisement" component={Advertisement}/>
            <Route path="/addadvertisement" component={AddAdvertisement}/>
            <Route path="/user" component={User}/>
            <Route path="/usersendmess" component={UserSendMess}/>
            <Route path="/capital" component={Capital}/>
            <Route path="/addcapital" component={AddCapital}/>
            <Route path="/label" component={Label}/>
            <Route path="/addlabel" component={AddLabel}/>
            <Route path="/social" component={Social}/>
            <Route path="/addsocial" component={AddSocial}/>
            <Route path="/addemployee" component={AddEmployee}/>
            <Route path="/transactionbulletin" component={Transactionbulletin}/>
            <Route path="/addtransactionbulletin" component={Addtransactionbulletin}/>
            <Route path="/helpcenter" component={Helpcenter}/>
            <Route path="/choicebulletin" component={Choicebulletin}/>
            <Route path="/editReadNum" component={EditReadNum}/>
            <Route path="/feedback" component={Feedback}/>
            <Route path="/useroptions" exact component={Useroptions}/>
            <Route path="/useroptionslist" exact component={Useroptionslist}/>
        </Switch>
    );
};
