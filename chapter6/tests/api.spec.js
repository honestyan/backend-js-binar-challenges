const request = require("supertest");
const app = require("../app");
let token = "";
let adminToken = "";
const randString = Math.random().toString(36).substring(7);

// endpoint POST /auth/login true
describe("POST /auth/login", () => {
  test("should return 200 OK", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "username",
      password: "password1234",
    });
    expect(res.body.status).toEqual(true);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    token = res.body.data.token;
  });
});

// endpoint POST /auth/login false password
describe("POST /auth/login", () => {
  test("should return 401 Unauthorized", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "username",
      password: "password12345",
    });
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message");
  });
});

// endpoint POST /auth/login false username
describe("POST /auth/login", () => {
  test("should return 404 Not Found", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "usernamee",
      password: "password12345",
    });
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message");
  });
});

// endpoint POST /auth/register true
describe("POST /auth/register", () => {
  let username = randString;
  let email = `${randString}@gmail.com`;
  let password = randString;
  test("should return 201 Created", async () => {
    const res = await request(app).post("/auth/register").send({
      username,
      email,
      password,
    });
    expect(res.body.status).toEqual(true);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
  });
});

// endpoint POST /auth/register duplicate username
describe("POST /auth/register", () => {
  let username = "username";
  let email = `${randString}@gmail.com`;
  let password = randString;
  test("should return 409 Duplicate", async () => {
    const res = await request(app).post("/auth/register").send({
      username,
      email,
      password,
    });
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty("message");
  });
});

// endpoint POST /auth/register duplicate email
describe("POST /auth/register", () => {
  let username = randString;
  let email = "user@gmail.com";
  let password = randString;
  test("should return 409 Duplicate", async () => {
    const res = await request(app).post("/auth/register").send({
      username,
      email,
      password,
    });
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty("message");
  });
});

//endpoint POST /admin/login true
describe("POST /admin/login", () => {
  test("should return 200 OK", async () => {
    const res = await request(app).post("/admin/login").send({
      username: "admin",
      password: "admin123",
    });
    expect(res.body.status).toEqual(true);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    adminToken = res.body.data.token;
  });
});

// endpoint POST /admin/login false password
describe("POST /admin/login", () => {
  test("should return 401 Unauthorized", async () => {
    const res = await request(app).post("/admin/login").send({
      username: "admin",
      password: "admin1234",
    });
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message");
  });
});

// endpoint PUT /auth/changePassword true
describe("PUT /auth/changePassword", () => {
  test("should return 200 OK", async () => {
    const res = await request(app)
      .put("/auth/changePassword")
      .set("Authorization", `${token}`)
      .send({
        oldPassword: "password1234",
        newPassword: "password1234",
        confirmNewPassword: "password1234",
      });
    expect(res.body.status).toEqual(true);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});

//endpoint PUT /auth/changePassword false oldPassword
describe("PUT /auth/changePassword", () => {
  test("should return 401 ", async () => {
    const res = await request(app)
      .put("/auth/changePassword")
      .set("Authorization", `${token}`)
      .send({
        oldPassword: "password1234false",
        newPassword: "password1234",
        confirmNewPassword: "password1234",
      });
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message");
  });
});

//endpoint PUT /auth/changePassword new password doesnt match
describe("PUT /auth/changePassword", () => {
  test("should return 400 Bad Request", async () => {
    const res = await request(app)
      .put("/auth/changePassword")
      .set("Authorization", `${token}`)
      .send({
        oldPassword: "password1234",
        newPassword: "password1234",
        confirmNewPassword: "password1234false",
      });
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
  });
});

//endpoint PUT /auth/changePassword unauthorized token
describe("PUT /auth/changePassword", () => {
  test("should return 401 Unauthorized", async () => {
    const res = await request(app)
      .put("/auth/changePassword")
      .set("Authorization", `false`)
      .send({
        oldPassword: "password1234",
        newPassword: "password1234",
        confirmNewPassword: "password1234",
      });
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message");
  });
});

//create sample registration
let sampleToken;
describe("POST /auth/register", () => {
  test("should return 201 Created", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "sample_username",
      email: "sample_usergame@gmail.com",
      password: "samplepassword",
    });
    expect(res.body.status).toEqual(true);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
  });
});

//endpoint sample login
describe("POST /auth/login", () => {
  test("should return 200 OK", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "sample_username",
      password: "samplepassword",
    });
    expect(res.body.status).toEqual(true);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    sampleToken = res.body.data.token;
  });
});

//endpoint DELETE /auth/deleteAccount
describe("DELETE /auth/deleteAccount", () => {
  test("should return 200 OK", async () => {
    const res = await request(app)
      .delete("/auth/deleteAccount")
      .set("Authorization", `${sampleToken}`);
    expect(res.body.status).toEqual(true);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});

//endpoint POST addbiodata /biodata
describe("POST /biodata", () => {
  test("should return 201 Created", async () => {
    const res = await request(app)
      .post("/biodata")
      .set("Authorization", `${token}`)
      .send({
        fullname: "John Doe",
        dob: "2000-12-25",
        phone: "08212345678",
        gender: "male",
        address: "Jl. Basuki Rahmat 60a",
      });
    expect(res.body.status).toEqual(true);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
  });
});

//endpoint POST addbiodata /biodata no token
describe("POST /biodata", () => {
  test("should return 401 Unauthorized", async () => {
    const res = await request(app).post("/biodata").send({
      fullname: "John Doe",
      dob: "2000-12-25",
      phone: "08212345678",
      gender: "male",
      address: "Jl. Basuki Rahmat 60a",
    });
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message");
  });
});

//endpoint POST addbiodata /biodata not authorized
describe("POST /biodata", () => {
  test("should return 401 Unauthorized", async () => {
    const res = await request(app)
      .post("/biodata")
      .set("Authorization", `false`)
      .send({
        fullname: "John Doe",
        dob: "2000-12-25",
        phone: "08212345678",
        gender: "male",
        address: "Jl. Basuki Rahmat 60a",
      });
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message");
  });
});

//endpoint PUT /biodata edit biodata true
describe("PUT /biodata", () => {
  test("should return 200 OK", async () => {
    const res = await request(app)
      .put("/biodata")
      .set("Authorization", `${token}`)
      .send({
        fullname: "John Connor",
      });
    expect(res.body.status).toEqual(true);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});

//endpoint PUT /biodata edit biodata unauthorized
describe("PUT /biodata", () => {
  test("should return 401 Unauthorized", async () => {
    const res = await request(app)
      .put("/biodata")
      .set("Authorization", `false`)
      .send({
        fullname: "John Connor",
      });
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message");
  });
});

//endpoint GET /biodata get biodata true
describe("GET /biodata", () => {
  test("should return 200 OK", async () => {
    const res = await request(app)
      .get("/biodata")
      .set("Authorization", `${token}`);
    expect(res.body.status).toEqual(true);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});

//endpoint GET /biodata get biodata unauthorized
describe("GET /biodata", () => {
  test("should return 401 Unauthorized", async () => {
    const res = await request(app)
      .get("/biodata")
      .set("Authorization", `false`);
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message");
  });
});

//endpoint POST /history addHistory-point true
describe("POST /history", () => {
  test("should return 201 Created", async () => {
    const res = await request(app)
      .post("/history")
      .set("Authorization", `${token}`)
      .send({
        action: "point",
        value: 100,
      });
    expect(res.body.status).toEqual(true);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
  });
});

//endpoint POST /history addHistory-stage true
describe("POST /history", () => {
  test("should return 201 Created", async () => {
    const res = await request(app)
      .post("/history")
      .set("Authorization", `${token}`)
      .send({
        action: "stage",
        value: 1,
      });
    expect(res.body.status).toEqual(true);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
  });
});

//endpoint POST /history addHistory-stage action not found
describe("POST /history", () => {
  test("should return 400 Bad Request", async () => {
    const res = await request(app)
      .post("/history")
      .set("Authorization", `${token}`)
      .send({
        action: "test",
        value: 1,
      });
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
  });
});

//endpoint POST /history addHistory-stage unauthorized
describe("POST /history", () => {
  test("should return 401 Unauthorized", async () => {
    const res = await request(app)
      .post("/history")
      .set("Authorization", `false`)
      .send({
        action: "stage",
        value: 1,
      });
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message");
  });
});

//endpoint getUserBiodataHistory GET /detail get detail true
describe("GET /detail", () => {
  test("should return 200 OK", async () => {
    const res = await request(app)
      .get("/detail")
      .set("Authorization", `${token}`);
    expect(res.body.status).toEqual(true);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});

//endpoint getUserBiodataHistory GET /detail get no token
describe("GET /detail", () => {
  test("should return 401 Unauthorized", async () => {
    const res = await request(app).get("/detail");
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("data");
  });
});

//endpoint getUserBiodataHistory GET /detail get detail unauthorized
describe("GET /detail", () => {
  test("should return 401 Unauthorized", async () => {
    const res = await request(app).get("/detail").set("Authorization", `false`);
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message");
  });
});

//endpoint getAllUserDetail GET /admin/getAllUserDetail/ true
describe("GET /admin/getAllUserDetail", () => {
  test("should return 200 OK", async () => {
    const res = await request(app)
      .get("/admin/getAllUserDetail")
      .set("Authorization", `${adminToken}`);
    expect(res.body.status).toEqual(true);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});

//endpoint getAllUserDetail GET /admin/getAllUserDetail/ no token
describe("GET /admin/getAllUserDetail", () => {
  test("should return 401 Unauthorized", async () => {
    const res = await request(app).get("/admin/getAllUserDetail");
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("data");
  });
});

//endpoint getAllUserDetail GET /admin/getAllUserDetail/ unauthorized
describe("GET /admin/getAllUserDetail", () => {
  test("should return 401 Unauthorized", async () => {
    const res = await request(app)
      .get("/admin/getAllUserDetail")
      .set("Authorization", `false`);
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message");
  });
});

//endpoint getAllUserDetail GET /admin/getAllUserDetail/:id true
let userId = 3;
describe("GET /admin/getAllUserDetail/:id", () => {
  test("should return 200 OK", async () => {
    const res = await request(app)
      .get(`/admin/getAllUserDetail/${userId}`)
      .set("Authorization", `${adminToken}`);
    expect(res.body.status).toEqual(true);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});

//endpoint getAllUserDetail GET /admin/getAllUserDetail/:id not admin
describe("GET /admin/getAllUserDetail/:id", () => {
  test("should return 401 Unauthorized", async () => {
    const res = await request(app)
      .get(`/admin/getAllUserDetail/${userId}`)
      .set("Authorization", `${token}`);
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty("data");
  });
});

//endpoint get lost
describe("GET /getlost", () => {
  test("should return 401 Unauthorized", async () => {
    const res = await request(app)
      .get(`/getlost/${userId}`)
      .set("Authorization", `${token}`);
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message");
  });
});
