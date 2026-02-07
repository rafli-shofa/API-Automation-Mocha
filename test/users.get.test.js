const fetch = require("node-fetch");
const { expect } = require("chai");
const Ajv = require("ajv");
const schema = require("../schema/users.schema.json");

describe("GET Users API", () => {
  it("Should return list of users", async () => {
    const response = await fetch("https://belajar-bareng.onrender.com/api/users");
    const body = await response.json();

    if (response.status === 200) {
      expect(body).to.be.an("array");

      const ajv = new Ajv();
      const validate = ajv.compile(schema);
      const valid = validate(body);
      expect(valid).to.equal(true);
    } else {
      expect(response.status).to.equal(401);
      expect(body).to.have.property("message");
    }
  });
});
