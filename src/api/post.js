import { endpoint } from './api'

export async function postData(url = "", data = {}) {
    const mainurl = endpoint + url;
    try{
        const response = await fetch(mainurl, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        })
        return response.json();
    }catch(error){
        return { message: "Unexpected Error Occured" }
    }
}