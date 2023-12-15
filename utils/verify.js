import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js';
export const verify = (res)=> {
    expect(res.status).to.equal(200);
    expect(res).to.have.validJsonBody();
    expect(JSON.parse(res.body).code).to.equal(0);
}