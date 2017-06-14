const chai = require('chai'),
      request = require('supertest'),
      config = require('config'),
      app = require('../app');

const should = chai.should();

describe(config.prefix + '/info/:id', () => {
    let server = null,
        sandbox;

    before(async () => {
        server = await app(done);
    });
    after(() => {
        server.close();
    });

    it('should return 200 OK', (done) => {
        const {body} = await request(server)
            .get('/info/1')
            .expect(200);
        body.should.have.property('packageJson');
        body.should.have.property('config');
    });
});
