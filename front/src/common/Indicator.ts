export class Indicator {
    static get instance(): Indicator {
        if (!Indicator._instance) {
            Indicator._instance = new Indicator();
        }
        return Indicator._instance;
    }
    private static _instance: Indicator;

    indicatorEle: HTMLDivElement

    private constructor() {
        this.indicatorEle = document.getElementById('indicator') as HTMLDivElement
    }

    setIndicator(show: boolean){
        if(show) this.indicatorEle.style.display = "block"
        else this.indicatorEle.style.display = "none"
    }
}

