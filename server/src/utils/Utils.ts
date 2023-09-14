export class Utils{
    static delay = async (time: number) =>{
        return new Promise<any>(resolve => {
            setTimeout(resolve, time)
        })
    }

    static formatCurrency = (value: number): string => {
        const formatter = new Intl.NumberFormat("ko-KR", {
            style: "currency",
            currency: "KRW",
        });

        return formatter.format(value);
    };
}