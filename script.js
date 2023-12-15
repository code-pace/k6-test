import http from 'k6/http';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js';
import { sleep } from 'k6';
import newUserRegRequest from './specs/newUserReg.js';
import userLogin from './specs/userLogin.js';
import getAllUsers from './specs/getAllUsers.js';
import createUser from './specs/createUser.js';
import nimcLoadTest from './specs/nimcLoadTest.js';

export const options = {
    discardResponseBodies: true,
  
    scenarios: {
      contacts: {
        executor: 'ramping-arrival-rate',
  
        // Start iterations per `timeUnit`
        startRate: 400,
  
        // Start `startRate` iterations per minute
        timeUnit: '1m',
  
        // Pre-allocate necessary VUs.
        preAllocatedVUs: 400,
  
        stages: [
          // Start 400 iterations per `timeUnit` for the first minute.
          { target: 400, duration: '1m' },
  
          // Linearly ramp-up to starting 600 iterations per `timeUnit` over the following two minutes.
          { target: 600, duration: '2m' },

          // Linearly ramp-down to starting 200 iterations per `timeUnit` over the following two minutes.
          { target: 400, duration: '1m' },
        ],
      },
    },
    thresholds: {
        http_req_duration: ["p(95) < 3000"]
    }
};

export function setUp() {
    const token = userLogin().data.Token;
    return token;
}
export default function() {
    describe('NIMC Verification', ()=> {
        nimcLoadTest();
    })
}