export function getRedirect(type,header){
    let path = ''
    if(type === 'boss'){
        path = '/boss'
    }else{
        path = '/employee'
    }
    if(!header){
        path += 'Info'
    }
    return path
}
//通过type，header判断来跳转。