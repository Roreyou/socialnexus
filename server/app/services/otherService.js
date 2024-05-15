class  otherService{
    static async getCurrentTime(){
        const currentTime = new Date();
        const formattedTime = currentTime.toISOString();
        return formattedTime;
    }

    static async IdInt2String(IdName, event){
         // 检查事件对象是否存在
        if (!event) {
            return event;
        }
        // 遍历事件对象的每个属性
        for (const key in event) {
            // 如果属性名等于指定的 IdName，则将其值转换为字符串类型
            console.log("debug key:",key);
            if (key === IdName && typeof event[key] === 'number') {
                event[key] = event[key].toString();
                break;
            }        
        }
        console.log("debug 01:",IdName);
        console.log("debug 02", event);
        return event;
    }
}

module.exports = otherService;