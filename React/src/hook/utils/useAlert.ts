import swal from 'sweetalert';

export const useAlert = ()=>{
    return {
        showAlert: async (message:string) =>{
            await swal(message)
        },
        showConfirm: async (message: string) =>{
            return await swal({
                text: message,
                buttons: ["취소", "확인"],
            });
        }
    }
}