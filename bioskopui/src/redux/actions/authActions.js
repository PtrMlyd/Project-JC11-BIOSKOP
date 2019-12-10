export const loginSuccessAction=(dataUser)=>{
    return{
        type:'LOGIN_SUCCESS',
        payload:dataUser //payload untuk mengirim data ke user
    }
}