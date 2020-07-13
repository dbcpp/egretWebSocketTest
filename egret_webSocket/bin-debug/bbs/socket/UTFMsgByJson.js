var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * Created by yangsong on 15-3-20.
 */
var UTFMsgByJson = (function (_super) {
    __extends(UTFMsgByJson, _super);
    /**
     * 构造函数
     */
    function UTFMsgByJson() {
        return _super.call(this) || this;
    }
    /**
     * 消息解析
     * @param msg
     */
    UTFMsgByJson.prototype.decode = function (msg) {
        return JSON.parse(msg);
    };
    /**
     * 消息封装
     * @param msg
     */
    UTFMsgByJson.prototype.encode = function (msg) {
        return JSON.stringify(msg);
    };
    return UTFMsgByJson;
}(UTFMsg));
__reflect(UTFMsgByJson.prototype, "UTFMsgByJson");
