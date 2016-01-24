process.env.NODE_ENV = 'test'; // disable morgan

var request  = require('supertest'),
    expect   = require('chai').expect,

    server   = require('../../server/server.js'),
    Node     = require('../../server/api/nodes/nodeModel.js'),
    Roadmap  = require('../../server/api/roadmaps/roadmapModel.js');



/* * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * */
/* * * * *       NODE ROUTES           * * * * */
/* * * * *       /api/nodes            * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * */

describe('Node Routes - /api/nodes', function() {
  
  var result;

  var testMap = { 
    title      : 'TestMap',
    description: 'Learn TDD',
    author     : '56a04c964c984dbc4f2544d7',
    nodes      : []
  };

  var testNode = { 
    title        : 'TestNode',
    description  : 'Learn TDD',
    resourceType : 'link',
    resourceURL  : 'https://en.wikipedia.org/wiki/Test-driven_development',
    parentRoadmap: ''
  };


  /* * * * * * * * * * * * * * * * * * * * * 
  *    POST /api/nodes/                    *
  * * * * * * * * * * * * * * * * * * * * */

  describe('POST /api/nodes', function(){

    var testMapID;

    before('Create test Roadmap', function(done) {
      Roadmap(testMap)
        .save()
        .then(function(dbResults){
          testMapID = dbResults._id;
          done();
        })
        .catch(function(err){ throw err; })
    });

    after('Remove test Roadmap and Node', function(done) {
      Node.findOneAndRemove({title: 'TestNode'})
        .then(function(){ 
          return Roadmap.findOneAndRemove({title: 'TestMap'})
        })
        .then(function(){ done(); })
        .catch(function(err){ throw err; })
    });

    it('Should respond with 201 when creating a new Node', function(done){
      testNode.parentRoadmap = testMapID;

      request(server.app)
        .post('/api/nodes')
        .send(testNode)
        .expect(201)
        .end(function(err, serverResponse){
          if (err) throw err;
          delete testNode.parentRoadmap; // reset to original state
          done();
        });
    });
  });

  /* * * * * * * * * * * * * * * * * * * * * 
  *    POST /roadmaps/:roadmapID/nodes     *
  * * * * * * * * * * * * * * * * * * * * */

  describe('POST /api/roadmaps/:roadmapID/nodes', function(){

    var testMapID;

    before('Create test Roadmap', function(done) {
      Roadmap(testMap)
        .save()
        .then(function(dbResults){
          testMapID = dbResults._id;
          done();
        })
        .catch(function(err){ throw err; })
    });

    after('Remove test Roadmap and Node', function(done) {
      Node.findOneAndRemove({title: 'TestNode'})
        .then(function(){ 
          return Roadmap.findOneAndRemove({title: 'TestMap'})
        })
        .then(function(){ done(); })
        .catch(function(err){ throw err; })
    });

    it('Should respond with 201 when creating a new Node', function(done){

      request(server.app)
        .post('/api/roadmaps/'+testMapID+'/nodes')
        .send(testNode)
        .expect(201)
        .end(done);
    });
  });
  /* * * * * * * * * * * * * * * * * * * * * 
  *    GET /api/nodes/                     *
  * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * * * * * * * 
  *    GET /api/nodes/:nodeID              *
  * * * * * * * * * * * * * * * * * * * * */


  /* * * * * * * * * * * * * * * * * * * * * 
  *    PUT /api/nodes/:nodeID              *
  * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * * * * * * * 
  *    DELETE /api/nodes/:nodeID           *
  * * * * * * * * * * * * * * * * * * * * */

});