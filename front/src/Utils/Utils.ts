export default class Utils{
    static formatCurrency = (value: number): string => {
        const formatter = new Intl.NumberFormat("ko-KR", {
            style: "currency",
            currency: "KRW",
        })

        return formatter.format(value)
    }
}