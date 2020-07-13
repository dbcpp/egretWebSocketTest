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
 * Created by yangsong on 2014/11/25.
 * Socket类
 */
var Socket = (function (_super) {
    __extends(Socket, _super);
    /**
     * 构造函数
     */
    function Socket() {
        var _this = _super.call(this) || this;
        _this._needReconnect = false;
        _this._maxReconnectCount = 10;
        _this._reconnectCount = 0;
        return _this;
    }
    /**
     * 添加事件监听
     */
    Socket.prototype.addEvents = function () {
        this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this._socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this._socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    };
    /**
     * 移除事件监听
     */
    Socket.prototype.removeEvents = function () {
        this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this._socket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this._socket.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    };
    /**
     * 服务器连接成功
     */
    Socket.prototype.onSocketOpen = function () {
        this._reconnectCount = 0;
        this._isConnecting = true;
        if (this._connectFlag && this._needReconnect) {
            //暂时隐藏-- 发送消息
            // App.MessageCenter.dispatch(SocketConst.SOCKET_RECONNECT);
        }
        else {
            //暂时隐藏-- 发送消息
            // App.MessageCenter.dispatch(SocketConst.SOCKET_CONNECT);
        }
        this._connectFlag = true;
    };
    /**
     * 服务器断开连接
     */
    Socket.prototype.onSocketClose = function () {
        this._isConnecting = false;
        if (this._needReconnect) {
            //暂时隐藏-- 发送消息
            // App.MessageCenter.dispatch(SocketConst.SOCKET_START_RECONNECT);
            this.reconnect();
        }
        else {
            //暂时隐藏-- 发送消息
            // App.MessageCenter.dispatch(SocketConst.SOCKET_CLOSE);
        }
    };
    /**
     * 服务器连接错误
     */
    Socket.prototype.onSocketError = function () {
        if (this._needReconnect) {
            this.reconnect();
        }
        else {
            //暂时隐藏-- 发送消息
            // App.MessageCenter.dispatch(SocketConst.SOCKET_NOCONNECT);
        }
        this._isConnecting = false;
    };
    /**
     * 收到服务器消息
     * @param e
     */
    Socket.prototype.onReceiveMessage = function (e) {
        this._msg.receive(this._socket);
    };
    /**
     * 初始化服务区地址
     * @param host IP
     * @param port 端口
     * @param msg 消息发送接受处理类
     */
    Socket.prototype.initServer = function (host, port, msg) {
        this._host = host;
        this._port = port;
        this._msg = msg;
    };
    /**
     * 开始Socket连接
     */
    Socket.prototype.connect = function () {
        // if (App.DeviceUtils.IsHtml5) {
        //     if (!window["WebSocket"]) {
        //         Log.error("不支持WebSocket");
        //         return;
        //     }
        // }
        this._socket = new egret.WebSocket();
        if (this._msg instanceof ByteArrayMsg) {
            this._socket.type = egret.WebSocket.TYPE_BINARY;
        }
        console.log("WebSocket: " + this._host + ":" + this._port);
        this.addEvents();
        this._socket.connect(this._host, this._port);
    };
    /**
     * 重新连接
     */
    Socket.prototype.reconnect = function () {
        this.closeCurrentSocket();
        this._reconnectCount++;
        if (this._reconnectCount < this._maxReconnectCount) {
            this.connect();
        }
        else {
            this._reconnectCount = 0;
            if (this._connectFlag) {
                //暂时隐藏-- 发送消息
                // App.MessageCenter.dispatch(SocketConst.SOCKET_CLOSE);
            }
            else {
                //暂时隐藏-- 发送消息
                // App.MessageCenter.dispatch(SocketConst.SOCKET_NOCONNECT);
            }
        }
    };
    /**
     * 发送消息到服务器
     * @param msg
     */
    Socket.prototype.send = function (msg) {
        this._msg.send(this._socket, msg);
    };
    /**
     * 关闭Socket连接
     */
    Socket.prototype.close = function () {
        this._connectFlag = false;
        this.closeCurrentSocket();
    };
    /**
     * 清理当前的Socket连接
     */
    Socket.prototype.closeCurrentSocket = function () {
        this.removeEvents();
        this._socket.close();
        this._socket = null;
        this._isConnecting = false;
    };
    /**
     * Socket是否在连接中
     * @returns {boolean}
     */
    Socket.prototype.isConnecting = function () {
        return this._isConnecting;
    };
    /**
     * Debug信息
     * @param str
     */
    Socket.prototype.debugInfo = function (str) {
        //暂时隐藏-- 发送消息
        // App.MessageCenter.dispatch(SocketConst.SOCKET_DEBUG_INFO, str);
    };
    return Socket;
}(SingtonClass));
__reflect(Socket.prototype, "Socket");
