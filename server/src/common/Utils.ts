export class Utils{
    static delay = async (time: number) =>{
        return new Promise<any>(resolve => {
            setTimeout(resolve, time)
        })
    }
}