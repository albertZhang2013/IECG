/**
 * Module dependencies.
 */
var mongo = require('mongodb')
  , Db = mongo.Db
  , Connection = mongo.Connection
  , Server = mongo.Server
  , BSON = mongo.BSON
  , ObjectID = mongo.ObjectID
  , appConfig = require('../appConfig.json');


function Mongo(name, host, port, callback) {
  var databaseConfig = appConfig.database;

  this.db = new Db(name || databaseConfig.name, new Server(host || databaseConfig.host, port || databaseConfig.port, {auto_reconnect: false, poolSize: 4}), {native_parser: false});

}

Mongo.prototype.getCollection = function(collectionName, callback) {
  var me = this;

  me.db.open(function (error, db) {
    if(error)
      callback(error);
    else
      db.collection(collectionName, function(error, collection) {
        if(error)
          callback(error);
        else
          callback(null, collection);
      });
  });
};

Mongo.prototype.findAll = function(collectionName, callback) {
  this.getCollection(collectionName, function(error, collection) {
    if(error)
      callbackWithClose(collection.db, error, null, callback);
    else {
      collection.find().toArray(function(error, results) {
        if(error)
          callbackWithClose(collection.db, error, null, callback);
        else
          callbackWithClose(collection.db, null, results, callback);
      });
    }
  });
};

Mongo.prototype.findById = function(collectionName, id, callback) {
  this.getCollection(collectionName, function(error, collection) {
    if(error)
      callbackWithClose(collection.db, error, null, callback);
    else{
      collection.findOne({_id: collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
        if(error)
          callbackWithClose(collection.db, error, null, callback);
        else
          callbackWithClose(collection.db, null, result, callback);
      });
    }
  });
};

/*
Mongo.prototype.save = function(articles, callback) {
  this.getCollection(function(error, article_collection) {
    if(error)
      callback(error);
    else {
      if(typeof(articles.length) == 'undefined')
        articles = [articles];
      for(var i=0; i<articles.length; i++){
        article = articles[i];
        article.create_at = new Date();
        if(article.comments === undefined)
          article.comments = [];
        for(var j=0; j<article.comments.length; j++){
          article.comments[j].created_at = new Date();
        }
      }

      article_collection.insert(articles, function(){
        callback(null, articles);
      });
    }
  });
};

Mongo.prototype.addCommentToArticle = function(articleId, comment, callback){
  this.getCollection(function(error, article_collection){
    if(error) callback(error);
    else {
      article_collection.update(
        {_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(articleId)},
        {"$push": {comments: comment}},
        function(error, article){
          if( error ) callback(error);
          else callback(null, article)
        });
    }
  });
};*/

exports.db = new Mongo();

function callbackWithClose (db, error, resluts, callback) {
  if (error)
    callback(error, null);

  else
    callback(null, resluts);

  db.close();
}
