class  otherService{
    static async getCurrentTime(){
        const currentTime = new Date();
        const formattedTime = currentTime.toISOString();
        return formattedTime;
    }
}

module.exports = otherService;