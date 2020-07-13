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
/**单例基类 */
var SingtonClass = (function (_super) {
    __extends(SingtonClass, _super);
    function SingtonClass() {
        return _super.call(this) || this;
    }
    /**
     * 获取一个单例
     * @returns {any}
     */
    SingtonClass.getSingtonInstance = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var Class = this;
        if (!Class._instance) {
            Class._instance = new (Class.bind.apply(Class, [void 0].concat(param)))();
        }
        return Class._instance;
    };
    return SingtonClass;
}(egret.HashObject));
__reflect(SingtonClass.prototype, "SingtonClass");
