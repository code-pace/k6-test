import http from "k6/http";
import {sleep} from 'k6';
import { verify } from "../utils/verify.js";

const userLogin =()=> {
    let url = "http://restapi.adequateshop.com/api/authaccount/login";
    let params = {
        headers: {
            "Content-Type": "application/json" 
        }
    }
    let payload = {
        "email": "testerqa1@gmail.com",
        "password": 123456
    }

    const res = http.post(url, JSON.stringify(payload), params);
    verify(res);
    sleep(1);
    return JSON.parse(res.body);
}
export default userLogin;