class NetworkProgressObserver {

    public title; 
    public thumbnail: File|string;
    public percentage;

    constructor() {
        this.title = "";
        this.thumbnail = "";
        this.percentage = 0;
    }

    getNetworkInfo() {
        return {
            title: this.title,
            thumbnail: this.thumbnail,
            percentage: this.percentage
        }
    }

    setNetworkInfo(title: string, thumbnail: File, percentage: number) {
        this.title = title;
        this.thumbnail = thumbnail;
        this.percentage = percentage;
    }

    updateNetworkPercentage(percentage: number) {
        this.percentage = percentage;
    }
}

const NPObserver = new NetworkProgressObserver();
export default NPObserver;