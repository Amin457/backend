let chaiHttp = require("chai-http");
let chai = require("chai");
let app = require("../app.js");
let server = require("../app.js");

chai.should();


const a = { "mail": "Aetos@gmail.com", "mdp": "123456789" }
describe("test post /login", () => {
    it("it should login when data is correct", (done) => {
        chai.request(server)
            .post("/api/admin/login")
            .send(a)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('token');
                done();
            })
    })


    const b = { "mail": "test@test.com", "mdp": "123456789" }
    it("it should not login when data not correct", (done) => {
        chai.request(server)
            .post("/api/admin/login")
            .send(b)
            .end((err, response) => {
                response.should.have.status(401);
                response.body.should.be.a('object');
                response.body.should.have.property('unauthorised').eq(true);
                done();
            })
    })
})


chai.use(chaiHttp);
describe("test GET /getUsers", () => {
    it("it should Get all users with reponse status 200 and return object of all users ", (done) => {
        chai.request(server)
            .get("/api/admin/getUsers")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            })
    })
})

const c = {"cardId": "10400000000000044", "dbId": "RETAIL_TS" }
describe("test post /getPoints", () => {
    it("it should get Points when data is correct", (done) => {
        chai.request(app)
            .post("/api/cartes/getPoints")
            .send(c)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('data');
                done();
            })
    })


     const d = { "cardId": "1212121212122121212", "cardId": "RETAIL_TS" }
    it("it should not getPoints becasuse data not correct", (done) => {
        chai.request(server)
            .post("/api/cartes/getPoints")
            .send(d)
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.be.a('object');
                response.body.should.have.property('message').eq("impossible de trouver la carte "+d.cardId);
                done();
            })
    })
})


const f = {
    "Nom":"ons",
    "Prenom":"mejri",
    "mail":"onsmejri@gmail.com",
    "mdp":"1234567899",
    "dateNaissance":"1999-01-01",
    "img":"",
    "CIN":"11111111",
    "id":200
}
describe("test update user /api/users", () => {
    it("it should update user and return a message of success ", (done) => {
        chai.request(app)
            .patch("/api/users/")
            .send(f)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('message');
                done();
            })
    })

})

const id=27;
describe("test delete promotion", () => {
    it("it should delete promotion and return a message of success ", (done) => {
        chai.request(app)
            .delete("/api/promotions/"+id)
            .send(f)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success');
                done();
            })
    })
})
