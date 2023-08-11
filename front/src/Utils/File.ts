import * as XLSX from 'xlsx';
import swal from 'sweetalert';
import {BidItem} from "../common/tpye";

export default class File {
    exportExcel = async (items: BidItem[]) => {
        const bool = await swal({
            text: "현재까지 정보를 엑셀로 저장합니다.",
            buttons: ["취소", "저장"],
        });
        if(!bool) return;

        type ExcelData = {name: string, data: string[][]};

        const excelData: ExcelData[] = [];

        for (const item of items) {
            for (const client of item.clients) {
                const data = excelData.find((value) => value.name === client.name);

                if (data) {
                    data.data.push(["", item.name, client.amount.toString(), item.price.toString(), (client.amount * item.price).toString(), client.note ?? ""]);
                } else {
                    excelData.push({
                        name: client.name,
                        data: [["고객명", "상품 이름", "수량", "개당 금액", "금액", "비고"], [client.name, item.name, client.amount.toString(), item.price.toString(), (client.amount * item.price).toString(), client.note ?? ""]],
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

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const filename = `${year}-${month}-${day}.xlsx`;

        XLSX.writeFile(workbook, filename);
    }
}