export function PostData(type, userData){
    let BaseUrl = "http://18.191.185.248/api/user/";

    return new Promise((resolve, reject)=>{
        fetch(BaseUrl+type,{
            method : "POST",
            body : JSON.stringify(userData)
        })
        .then((res)=>res.json())
        .then((responseJson)=>{
            // console.log(responseJson);
            resolve(responseJson)
        })
        .catch((error)=>{
            reject(error);
        })
    })
}