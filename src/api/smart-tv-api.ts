import axios from "axios"


const instance = axios.create({
    baseURL: 'https://api.antideo.com'
})

export const validationAPI = {
    validate: (number:string) => {
        return instance.get<{valid: boolean}>(`/phone/ru/${number}?apiKey=d0c79e40375e273a9003233f9bb39f8c`
        )
    }
}

