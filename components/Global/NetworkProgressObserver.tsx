class NetworkProgressObserver {

    public title; 
    public thumbnail: File|string;
    public percentage;
    public uploadTimeStamp;
    public status;

    constructor() {
        this.title = "";
        this.thumbnail = "undefined";
        this.percentage = 0;
        this.uploadTimeStamp = 0;
        this.status = 'pending'
    }

    getNetworkInfo() {
        return {
            title: this.title,
            thumbnail: this.thumbnail,
            percentage: this.percentage,
            timeStamp: this.uploadTimeStamp,
            status: this.status
        }
    }

    setNetworkInfo(title: string, thumbnail: File|string, percentage: number) {
        this.title = title;
        this.thumbnail = thumbnail;
        this.percentage = percentage;
        this.status = 'mutating'
    }

    updateNetworkPercentage(percentage: number) {
        this.percentage = percentage;
    }

    registerTimeStamp(stamp: number) {
        this.uploadTimeStamp = stamp
    }

    succeedNetwork() {
        this.status = 'finished'
    }
}

const NPObserver = new NetworkProgressObserver();
export default NPObserver;