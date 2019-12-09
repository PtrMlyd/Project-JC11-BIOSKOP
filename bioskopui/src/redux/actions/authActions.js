export const loginSuccessAction=(dataUSer)=>{
    return{
        type:'LOGIN_SUCCESS',
        payload:dataUSer //payload untuk mengirim data ke user
    }
}