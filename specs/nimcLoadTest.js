import http from "k6/http";
import { sleep} from 'k6';
import { verify } from "../utils/verify.js";

export const options = {
    "vus": 300,
    "duration": "3m",
    "thresholds": {
        "http_req_duration": ["p(95) < 400"]
    }
}

const nimcLoadTest =()=> {
    let url = "https://kycuat.gloworld.com:8443/biocapture/verification/api/verify/single-search";
    let params = {
        headers: {
            "Content-Type": "application/json",
            "User-Agent":"Biocapture Smart Client, 1.0, Release Date: 2012-03-30",
            "User-UUID":"8c247ac9-d722-496c-b346-9cb405a6bc5d",
            "sc-auth-key":"AHVZ0xixAcuNsOyetrkZSovWzjqK5IhQK2gKtOjJh6gbL-xCq0EvVEJ1c0RnpiOeZuUgQkU6BgK9wg6ydiLlpM487XW2Ub6LPYZlXXdRXNNKKTRBVlM0reo",
            "Client-ID":"smartclient",
            "kit-tag":"kit-tag-1",
            "Device-ID":"device-id-1",
            "agent-email":"email@email.com"
        }
    }
    let payload = {
        "searchFieldValue": "QW49333423900332",
        "ninMaxCheckRequired": false,
        "configType": "A",
        "processType": "RR",
        "regType": "RRI",
        "nimcSearchType": "VNIN_SEARCH",
        "msisdn": "08077521398"
    }

    const res = http.post(url, JSON.stringify(payload), params);
    verify(res)
    sleep(1);
    return JSON.parse(res.body);
}
export default nimcLoadTest;