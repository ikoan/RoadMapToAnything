var Roadmap = require('./roadmapModel.js'),
    User = require('../users/userModel.js'),
    ObjectId = require('mongoose').Types.ObjectId,
    handleError = require('../../util.js').handleError,
    handleQuery = require('../queryHandler.js'),
    getAuthHeader = require('basic-auth');
    

module.exports = {

  createRoadmap : function (req, res, next) {
    var author = getAuthHeader(req).name;
    var newRoadmap = req.body;
    console.log('API: creating roadmap');
    console.log('API: author', author);
    console.log('API: creating roadmap', newRoadmap);

    User.findOne({username: author})
      .then(function (user) {
        newRoadmap.author = user._id;
        return Roadmap(newRoadmap).save();
      })
      .then(function(dbResults){
        res.status(201).json({data: dbResults});
      })
      .catch(
        function(){
          console.log('API: error creating roadmap');
          handleError(next)
        });
  },

  getRoadmaps : function (req, res, next) {
    var dbArgs = handleQuery(req.query);

    Roadmap.find(dbArgs.filters, dbArgs.fields, dbArgs.params)
      .populate('author nodes')
      .then(function(dbResults){
        res.json({data: dbResults});
      })
      .catch(handleError(next));
  },

  getRoadmapByID : function (req, res, next) {
    var _id = req.params.roadmapID;
    Roadmap.findById(_id)
      .populate('author nodes')
      .then(function(dbResults){
        res.json({data: dbResults});
      })
      .catch(handleError(next));
  },

  updateRoadmap : function (req, res, next) {
    var _id = req.params.roadmapID;
    var updateCommand = req.body;
    Roadmap.findByIdAndUpdate(_id, updateCommand, {new: true})
      .populate('author nodes')
      .then(function(dbResults){
        res.json({data: dbResults});
      })
      .catch(handleError(next));
  },

  deleteRoadmap : function (req, res, next) {
    var _id = req.params.roadmapID;
    Roadmap.findOne({_id:_id})
      .populate('author nodes')
      .then(function(roadmap){
        if (roadmap) roadmap.remove();
        res.json({data: roadmap});
      })
      .catch(handleError(next));
  },

  // Function for voting on map
  voteRoadmap : function (req, res, next) {
    // Take in the request
    // Look up the roadmapID
    Roadmap.findOne({_id:_id})
      /* When id is found, add userId to the appropriate array (upvote, downvote);
      addToSet ensures that no duplicate items are added to set and does not affect 
      existing duplicate elements
      */
      .addToSet({upvote: userId})
      .addToSet({downvote: userId})
      //send the data back for the updated upvotes and downvotes
      .then(function(){})
      .catch(handleError(next));
  }
};