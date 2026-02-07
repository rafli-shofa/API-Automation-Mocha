import fetch from 'node-fetch';
import { expect } from 'chai';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { schema_createnewuser } from '../schema/reqresSchema.js';
import nock from 'nock';

describe("GET Users API", () => {
  before(() => {
    nock('https://reqres.in')
      .get('/api/users')
      .query({ page: '2' })
      .reply(200, {
        page: 2,
        per_page: 6,
        total: 12,
        total_pages: 2,
        data: [
          { id: 7, email: 'michael.lawson@reqres.in', first_name: 'Michael', last_name: 'Lawson' }
        ]
      });
  });

  after(() => {
    nock.cleanAll();
  });
  it("Should return list of users", async () => {
    const response = await fetch("https://reqres.in/api/users?page=2", {
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
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
    expect(result.data).to.be.an("array");

    // Schema validation using Ajv
    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(schema_createnewuser);
    const valid = validate(result);
    expect(valid, 'Ajv validation errors: ' + JSON.stringify(validate.errors)).to.equal(true);
  });
});

