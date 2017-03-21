
import "../stylesheets/style.css";
import "../stylesheets/lesstest.less";
//定义类
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		alert(x+"--"+y);
	}

	toString() {
		return '(' + this.x + ', ' + this.y + ')';
	}

}
new Point(3,5);