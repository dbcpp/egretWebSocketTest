var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by yangsong on 2014/11/25.
 * Socket使用常量
 */
var SocketConst = (function () {
    function SocketConst() {
    }
    /**
     * Socket已经连接上
     * @type {string}
     */
    SocketConst.SOCKET_CONNECT = "SOCKET_CONNECT";
    /**
     * Socket重新连接上
     * @type {string}
     */
    SocketConst.SOCKET_RECONNECT = "SOCKET_RECONNECT";
    /**
     * Socket开始重新连接上
     * @type {string}
     */
    SocketConst.SOCKET_START_RECONNECT = "SOCKET_START_RECONNECT";
    /**
     * Socket已关闭
     * @type {string}
     */
    SocketConst.SOCKET_CLOSE = "SOCKET_CLOSE";
    /*
     * socket收到消息
     * */
    SocketConst.SOCKET_DATA = "SOCKET_DATA";
    /**
     * Socket不能连接上
     * @type {string}
     */
    SocketConst.SOCKET_NOCONNECT = "SOCKET_NOCONNECT";
    /**
     * Socketdebug的消息
     * @type {string}
     */
    SocketConst.SOCKET_DEBUG_INFO = "SOCKET_DEBUG_INFO";
    return SocketConst;
}());
__reflect(SocketConst.prototype, "SocketConst");
