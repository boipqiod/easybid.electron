import * as XLSX from 'xlsx';
import swal from 'sweetalert';
import {BidItem} from "../common/tpye";
import Storage from "./Storage";

export default class File {
    exportExcel = async (items: BidItem[]) => {
        const bool = await swal({
            text: "현재까지 정보를 엑셀로 저장합니다.",
            buttons: ["취소", "저장"],
        });
        if(!bool) return;

        type ExcelData = {name: string, data: any[][]};

        const excelData: ExcelData[] = [];

        for (const item of items) {
            for (const client of item.clients) {
                const data = excelData.find((value) => value.name === client.name);

                if (data) {
                    data.data.push(["", item.name, item.price, client.amount, (client.amount * item.price), client.note ?? ""]);
                } else {
                    excelData.push({
                        name: client.name,
                        data: [["고객명", "상품 이름", "개당 금액", "수량", "금액", "비고"], [client.name, item.name, item.price, client.amount, (client.amount * item.price), client.note ?? ""]],
                    });
                }
            }
        }
        console.log(excelData);

        const workbook = XLSX.utils.book_new();

        let i = 1;
        for(const data of excelData){
            const worksheet = XLSX.utils.aoa_to_sheet(data.data);
            XLSX.utils.book_append_sheet(workbook, worksheet, `${i++}번 손님`);
        }

        const productData: any[] = ["이름", "총 판매량", "총 판매 "]

        for(const item of items){
            const saleAmount = item.clients.reduce((total, client) => total + client.amount, 0);

            productData.push(item.name, saleAmount, item.price * saleAmount)

        }

        const productWorksheet = XLSX.utils.aoa_to_sheet(productData);
        XLSX.utils.book_append_sheet(workbook, productWorksheet, '판매 상품 통계')

        const name = Storage.getFileName() ?? "unknown_name"

        XLSX.writeFile(workbook, name);
    }
}