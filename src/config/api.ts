import axios from "axios";
import 'dotenv/config'

const instance = axios.create({
    baseURL: 'https://nikandrovvanfak.amocrm.ru/api/v4/',
    headers: {
        common: {
            'Authorization': `Bearer ${process.env.TOKEN}`,
            'Content-Type': 'application/json',
        },
    },
    timeout: 10000
});

export default instance
