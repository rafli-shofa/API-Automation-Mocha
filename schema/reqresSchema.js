const schema_login = {
  type: "object",
  required: ["token"],
  additionalProperties: false,
  properties: {
    token: {
      type: "string",
      minLength: 8
    },
    user: {
      type: "object",
      required: ["id", "email"],
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        email: { type: "string", format: "email" },
        name: { type: "string" }
      }
    }
  }
};

const schema_createnewuser = {
  type: "object",
  required: ["data"],
  properties: {
    page: { type: "number" },
    per_page: { type: "number" },
    total: { type: "number" },
    total_pages: { type: "number" },
    data: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "email"],
        properties: {
          id: { type: "number" },
          email: { type: "string", format: "email" },
          first_name: { type: "string" },
          last_name: { type: "string" },
          avatar: { type: "string", format: "uri" }
        }
      }
    }
  }
};

export { schema_login, schema_createnewuser };

export default { schema_login, schema_createnewuser };

