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
 * Created by yangsong on 15-3-25.
 */
var ByteArrayMsgByProtobuf = (function (_super) {
    __extends(ByteArrayMsgByProtobuf, _super);
    /**
     * 构造函数
     */
    function ByteArrayMsgByProtobuf() {
        var _this = _super.call(this) || this;
        _this.msgClass = null;
        _this.protoConfig = null;
        _this.protoConfigSymmetry = null;
        _this.msgClass = {};
        _this.protoConfig = "simple_config";
        _this.protoConfigSymmetry = {};
        var keys = Object.keys(_this.protoConfig);
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            var value = _this.protoConfig[key];
            _this.protoConfigSymmetry[value] = key;
        }
        return _this;
    }
    /**
     * 获取msgID对应的类
     * @param key
     * @returns {any}
     */
    ByteArrayMsgByProtobuf.prototype.getMsgClass = function (key) {
        var cls = this.msgClass[key];
        if (cls == null) {
            cls = egret.getDefinitionByName(key);
            this.msgClass[key] = cls;
        }
        return cls;
    };
    /**
     * 获取msgID
     * @param key
     * @returns {any}
     */
    ByteArrayMsgByProtobuf.prototype.getMsgID = function (key) {
        return this.protoConfigSymmetry[key];
    };
    /**
     * 获取msgKey
     * @param msgId
     * @returns {any}
     */
    ByteArrayMsgByProtobuf.prototype.getMsgKey = function (msgId) {
        return this.protoConfig[msgId];
    };
    /**
     * 消息解析
     * @param msg
     */
    ByteArrayMsgByProtobuf.prototype.decode = function (msg) {
        var msgID = msg.readShort();
        var len = msg.readShort();
        if (msg.bytesAvailable >= len) {
            var bytes = new egret.ByteArray();
            msg.readBytes(bytes, 0, len);
            var obj = {};
            obj.key = this.getMsgKey(msgID);
            obj.body = this.getMsgClass(obj.key).decode(bytes.buffer);
            console.log("收到数据：", "[" + msgID + " " + obj.key + "]", obj.body);
            return obj;
        }
        return null;
    };
    /**
     * 消息封装
     * @param msg
     */
    ByteArrayMsgByProtobuf.prototype.encode = function (msg) {
        var msgID = this.getMsgID(msg.key);
        var msgClass = this.getMsgClass(msg.key);
        var msgBody = msgClass.fromObject(msg.body);
        var msgBuffer = msgClass.encode(msgBody).finish();
        var bodyBytes = new egret.ByteArray(msgBuffer);
        console.log("发送数据：", "[" + msgID + " " + msg.key + "]", msg.body);
        var sendMsg = new egret.ByteArray();
        sendMsg.writeShort(msgID);
        sendMsg.writeShort(bodyBytes.length);
        sendMsg.writeBytes(bodyBytes);
        return sendMsg;
    };
    return ByteArrayMsgByProtobuf;
}(ByteArrayMsg));
__reflect(ByteArrayMsgByProtobuf.prototype, "ByteArrayMsgByProtobuf");
