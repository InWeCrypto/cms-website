var fs = require("fs");
var NODE_ENV = process.env.NODE_ENV;
var str = {
	isOtherUser: true
};
if (NODE_ENV != "otheruser") {
	str.isOtherUser = false;
}
fs.writeFileSync("./useConfig.json", JSON.stringify(str));
