import http from "k6/http";
import {check, sleep} from 'k6';
import { verify } from "../utils/verify.js";

const getAllUsers = (page= 1, token)=> {
    let url = `http://restapi.adequateshop.com/api/users?page=${page}`;
    let params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`
        }
    }

    const res = http.get(url, params);
    verify(res);
    sleep(1);
    return JSON.parse(res.body);
}
export default getAllUsers;