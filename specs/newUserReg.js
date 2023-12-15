import http from "k6/http";
import { sleep} from 'k6';
import { verify } from "../utils/verify.js";

export const options = {
    "vus": 5,
    "duration": "3s"
}

const newUserRegRequest =()=> {
    let url = "http://restapi.adequateshop.com";
    let params = {
        headers: {
            "Content-Type": "application/json" 
        }
    }
    let payload = {
        "name": "tester1",
        "email": "tester1@gmail.com",
        "password": 123456
    }

    const res = http.post(url, JSON.stringify(payload), params);
    verify(res)
    sleep(1);
    return JSON.parse(res.body);
}
export default newUserRegRequest;