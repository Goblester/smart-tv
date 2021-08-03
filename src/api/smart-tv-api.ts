import axios from "axios"


const instance = axios.create({
    baseURL: 'http://apilayer.net/api'
})

export const validationAPI = {
    validate: (number:string) => {
        return instance.get('/validate', {
            params:{
                access_key: 'c433b46b95aae0cd7e679ee4e0dc23de',
                country_code: 'RU',
                format: 1,
                number
            }
        })
    }
}