const fetch = require("node-fetch");
const { expect } = require("chai");
const nock = require('nock');

describe("POST Login API", () => {
  before(() => {
    nock('https://reqres.in')
      .post('/api/login', { email: 'eve.holt@reqres.in', password: 'cityslicka' })
      .reply(200, { token: 'QpwL5tke4Pnpja7X4' });
  });

  after(() => {
    nock.cleanAll();
  });
  it("Should login successfully", async () => {
    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      body: JSON.stringify({
        email: "eve.holt@reqres.in",
        password: "cityslicka"
      })
    });

    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error('Non-JSON response body:\n', text.slice(0, 1000));
      throw new Error('Expected JSON response but received non-JSON (status ' + response.status + ')');
    }

    // Assertion Status Code
    expect(response.status).to.equal(200);

    // Assertion Response Body
    expect(result).to.have.property("token");
  });
});
