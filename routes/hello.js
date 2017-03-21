/**
 * Created by chenliming on 2017/3/16.
 */

//require("css-loader!../public/stylesheets/style.css")
function setName(name){
    console.log(name);
    console.log("-----over----")
}
function getName(){
    var a = "nba"
    console.log(a)
    return a;
}


module.exports = {
    setNames:setName,
    getNames:getName
};

//module.exports = getName;