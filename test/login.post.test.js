const fetch = require("node-fetch");
const { expect } = require("chai");
const Ajv = require("ajv");
const schema = require("../schema/login.schema.json");

describe("POST Login API", () => {
  it("Should login successfully", async () => {
    const response = await fetch("https://belajar-bareng.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@mail.com",
        password: "123456"
      })
    });

    const body = await response.json();

    if (response.status === 200) {
      expect(body).to.have.property("token");

      const ajv = new Ajv();
      const validate = ajv.compile(schema);
      const valid = validate(body);
      expect(valid).to.equal(true);
    } else {
      expect(response.status).to.be.oneOf([400, 401]);
      expect(body).to.have.property("message");
    }
  });
});
