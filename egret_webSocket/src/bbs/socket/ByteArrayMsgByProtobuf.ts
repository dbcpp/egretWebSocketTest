/**
 * Created by yangsong on 15-3-25.
 */
class ByteArrayMsgByProtobuf extends ByteArrayMsg {
    private msgClass: any = null;
    private protoConfig: any = null;
    private protoConfigSymmetry: any = null;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        this.msgClass = {};
        this.protoConfig = `simple_config`;
        this.protoConfigSymmetry = {};
        var keys = Object.keys(this.protoConfig);
        for (var i: number = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            var value = this.protoConfig[key];
            this.protoConfigSymmetry[value] = key;
        }
    }

    /**
     * 获取msgID对应的类
     * @param key
     * @returns {any}
     */
    private getMsgClass(key: string): any {
        var cls: any = this.msgClass[key];
        if (cls == null) {
            cls = egret.getDefinitionByName(key);
            this.msgClass[key] = cls;
        }
        return cls;
    }

    /**
     * 获取msgID
     * @param key
     * @returns {any}
     */
    private getMsgID(key: string): number {
        return this.protoConfigSymmetry[key];
    }

    /**
     * 获取msgKey
     * @param msgId
     * @returns {any}
     */
    private getMsgKey(msgId: number) {
        return this.protoConfig[msgId];
    }

    /**
     * 消息解析
     * @param msg
     */
    public decode(msg: any): any {
        var msgID = msg.readShort();
        var len = msg.readShort();
        if (msg.bytesAvailable >= len) {
            var bytes: egret.ByteArray = new egret.ByteArray();
            msg.readBytes(bytes, 0, len);

            var obj: any = {};
            obj.key = this.getMsgKey(msgID);
            obj.body = this.getMsgClass(obj.key).decode(bytes.buffer);
            console.log("收到数据：", "[" + msgID + " " + obj.key + "]", obj.body);
            return obj;
        }
        return null;
    }

    /**
     * 消息封装
     * @param msg
     */
    public encode(msg: any): any {
        var msgID = this.getMsgID(msg.key);
        var msgClass = this.getMsgClass(msg.key);
        var msgBody = msgClass.fromObject(msg.body);
        var msgBuffer = msgClass.encode(msgBody).finish();

        var bodyBytes: egret.ByteArray = new egret.ByteArray(msgBuffer);
        console.log("发送数据：", "[" + msgID + " " + msg.key + "]", msg.body);


        var sendMsg: egret.ByteArray = new egret.ByteArray();
        sendMsg.writeShort(msgID);
        sendMsg.writeShort(bodyBytes.length);
        sendMsg.writeBytes(bodyBytes);
        return sendMsg;
    }
}