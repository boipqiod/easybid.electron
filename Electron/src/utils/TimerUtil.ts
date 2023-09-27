export class TimerUtil{
    private timer: NodeJS.Timeout | undefined
    private readonly delay: number
    private readonly callback: () => void | (() => Promise<void>)

    constructor(time: number, callback: () => void | (() => Promise<void>)) {
        this.delay = time
        this.callback = callback
    }

    start = () =>{
        this.stop()
        this.timer = setInterval(this.callback, this.delay)
    }
    stop = () =>{
        if(this.timer) clearInterval(this.timer)
    }
}