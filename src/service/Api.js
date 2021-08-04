import axios from 'axios'
import Notification from "../notification";

const host = process.env.VUE_APP_API_HOST

export default {
    get (path, params) {
        return axios.get(host + path + generateParams(params))
            .catch(err => {
                if (err.response.status === 404) {
                    badRequestNotifications( 'ERRO: 404','não encontrado')
                } else {
                    badRequestNotifications( `ERRO: ${err.response.status}`,'Erro ao executar API')
                }
                throw err
            })
    }
}

const generateParams = (params) => {
    if (params){
        let paramConverted = '?'
        Object.keys(params)
            .forEach((param) => {
                paramConverted = `${paramConverted}${param}=${params[param]}&`
            })
        return paramConverted.slice(0, -1)
    }
    return ''
}

const badRequestNotifications = (header, content) => {
    Notification.send(header, content, 'error')
}
