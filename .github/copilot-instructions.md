# AI Copilot Instructions - API Automation Testing Framework

## Project Overview
**Purpose**: REST API testing automation using Mocha, Chai, and JSON Schema validation  
**Target API**: https://belajar-bareng.onrender.com  
**Test Framework**: Mocha (CLI runner) with Chai (BDD assertions) and AJV (JSON Schema validation)

## Architecture & Key Patterns

### Three-Layer Validation Pattern (CRITICAL)
Every API test follows a consistent 3-layer validation approach:
1. **HTTP Status Code** - Assert response status with Chai: `expect(response.status).to.equal(200)`
2. **Response Structure** - Validate data type/shape: `expect(body).to.be.an("array")` or `to.have.property("token")`
3. **JSON Schema** - Compile and validate response against schema file using AJV:
```javascript
const ajv = new Ajv();
const validate = ajv.compile(schema);
expect(validate(body)).to.equal(true);
```

### File Organization
- **`test/{resource}.{method}.test.js`** - Test files using naming convention (e.g., `login.post.test.js`, `users.get.test.js`)
- **`schema/{resource}.schema.json`** - One JSON Schema per endpoint, named to match test file
- **`report/`** - Generated HTML test reports (from mochawesome)

### Schema Structure
Schemas use JSON Schema Draft 7. Example patterns:
- **Object responses**: Include `required` array and `properties` object
- **Array responses**: Use `type: "array"` with `items` defining object structure
- See [schema/login.schema.json](schema/login.schema.json) and [schema/users.schema.json](schema/users.schema.json)

## Development Workflows

### Running Tests
- **Default reporter**: `npm test` - Outputs to console
- **HTML report**: `npm run report` - Generates [report/index.html](report/index.html) with test results

### Adding New Tests
1. Create test file: `test/{resource}.{method}.test.js`
2. Create matching schema: `schema/{resource}.schema.json`
3. Follow the three-layer validation pattern
4. Use `const fetch = require("node-fetch")` for HTTP requests
5. Use `async/await` for asynchronous test functions

### Schema Validation Workflow
- AJV compiles schema once per test (can optimize with schema caching if tests expand)
- Always validate array responses with `items` property defining element structure
- Mark required properties in schema to enforce strict validation

## Code Patterns & Conventions

### Test File Template
```javascript
const fetch = require("node-fetch");
const { expect } = require("chai");
const Ajv = require("ajv");
const schema = require("../schema/{resource}.schema.json");

describe("{ACTION} {Resource} API", () => {
  it("Should {expected behavior}", async () => {
    const response = await fetch("https://belajar-bareng.onrender.com/api/{endpoint}");
    const body = await response.json();

    expect(response.status).to.equal({expected_code});
    expect(body).to.{assertion}; // Structure validation
    
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    expect(validate(body)).to.equal(true);
  });
});
```

### HTTP Request Patterns
- **GET requests**: `fetch(url)` - No method needed (defaults to GET)
- **POST requests**: Pass `method: "POST"` and `body: JSON.stringify(data)` with header `"Content-Type": "application/json"`
- Always call `.json()` on response to parse body

### Dependencies & Versions
- `mocha@^11.7.5` - Test runner
- `chai@^6.2.2` - BDD assertions
- `ajv@^8.17.1` - JSON Schema validation
- `node-fetch@^3.3.2` - Fetch API for Node.js
- `mochawesome@^7.1.4` - HTML report generation

## Testing Best Practices for This Project

1. **Assertion Order**: Status → Response Structure → Schema Validation (maintains clarity of failure point)
2. **Descriptive Test Names**: Use "Should {expected behavior}" format in `it()` descriptions
3. **Schema Completeness**: Include all response properties in schema; use `required` to enforce critical fields
4. **Endpoint Consistency**: Always target https://belajar-bareng.onrender.com base URL
5. **Error Handling**: Test failures typically indicate API contract changes or bad test data - check API response format

## Integration Points
- **External API**: https://belajar-bareng.onrender.com (handles /api/login and /api/users endpoints)
- **Report Generation**: Mochawesome creates static HTML in report/ after test runs
- **Schema Files**: AJV reads JSON Schema files synchronously; must be valid JSON

## Common Commands Reference
```bash
npm test              # Run all tests, console output
npm run report        # Run with mochawesome reporter → report/index.html
npm install           # Install dependencies
```
