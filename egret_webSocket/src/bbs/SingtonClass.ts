/**单例基类 */
class SingtonClass extends egret.HashObject {
    public constructor() {
        super();
    }
    /**
     * 获取一个单例
     * @returns {any}
     */
    protected static getSingtonInstance(...param: any[]): any {
        let Class: any = this;
        if (!Class._instance) {
            Class._instance = new Class(...param);
        }
        return Class._instance;
    }
}