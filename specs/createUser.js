import http from "k6/http";
import { sleep} from 'k6';
import { verify } from "../utils/verify.js";

const createUser = (token)=> {
    let url = "http://restapi.adequateshop.com/api/users";
    let params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`
        }
    }
    let payload ={
        "name": "traveler1",
        "email": "traveler1@gmail.com",
        "location": "USA"
    }
    const res = http.post(url,payload, params);
    verify(res);
    sleep(1);
    return JSON.parse(res.body);
}
export default createUser;