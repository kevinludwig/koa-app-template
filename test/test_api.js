const chai = require('chai'),
      nock = require('nock'),
      request = require('supertest'),
      config = require('config'),
      app = require('../src/app');

const should = chai.should();

describe(config.prefix + '/info/:symbol', () => {
    let server = null;

    before(async () => {
        server = await app();
    });
    after(() => {
        server.close();
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('should return 200 OK', async() => {
        const scope = nock('http://dev.markitondemand.com')
            .get('/MODApis/Api/v2/Quote/json?quote=MSFT')
            .reply(200, {});

        const {body} = await request(server)
            .get(`${config.prefix}/info/MSFT`)
            .expect(200);
        body.should.have.property('pkg');
        body.should.have.property('conf');
        body.should.have.property('quote');
        scope.isDone().should.be.eql(true);
    });

    it('should 500 if API fails', async() => {
        const scope = nock('http://dev.markitondemand.com')
            .get('/MODApis/Api/v2/Quote/json?quote=MSFT')
            .reply(500, {});

        const {body} = await request(server)
            .get(`${config.prefix}/info/MSFT`)
            .expect(500);
        scope.isDone().should.be.eql(true);
    });

});
