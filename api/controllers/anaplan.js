'use strict';
var request = require('request');
var util = require('util');

module.exports = {
  getMetaData: getMetaData,
  getFileList: getFileList,
  getTaskList: getTaskList,
  getData: getData,
  getExports: getExports,
  setExportTask: setExportTask,
  getTaskStatus: getTaskStatus
};

var res;
var BASIC_AUTH = 'Basic bWFyd2VsbC5kYWxhbmdpbkBhYm9pdGl6LmNvbTpNIVQzc3REM3YxNDM=';
var WORKSPACE_ID = '8a81b09d5abf5098015b440dc6eb3660';
var MODEL_ID = '133A43E9732145D192EBAF7EAA4A7789';
var BASE_URL = util.format('https://api.anaplan.com/1/3/workspaces/%s/models/%s', WORKSPACE_ID, MODEL_ID);


/**
 * Get the metadata of the specified EXPORT definition
 */
function getMetaData(req, res) {
  var exportId = req.swagger.params.id.value;

  request({
    method: 'GET',
    url: util.format('%s/exports/%s', BASE_URL, exportId),
    headers: {
      'Authorization': BASIC_AUTH,
      'Accept': 'application/json'
    }
  }, function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
    res.json(JSON.parse(body));
  });
}

/**
 * Get the list of export files
 */
function getFileList(req, res) {

  request({
    method: 'GET',
    url: util.format('%s/files', BASE_URL),
    headers: {
      'Authorization': BASIC_AUTH,
      'Accept': 'application/json'
    }
  }, function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
    res.json(JSON.parse(body));
  });
}

/**
 * List the tasks of this export action
 */
function getTaskList(req, res) {
  var exportId = req.swagger.params.id.value;

  request({
    method: 'GET',
    url: util.format('%s/exports/%s/tasks', BASE_URL, exportId),
    headers: {
      'Authorization': BASIC_AUTH,
      'Accept': 'application/json'
    }
  }, function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
    res.json(JSON.parse(body));
  });
}


/** 
 * Get the data in the form of a chunk or chunks
 */
function getData(req, res) {
  var exportId = req.swagger.params.id.value;

  request({
    method: 'GET',
    url: util.format('%s/files/%s/chunks/0', BASE_URL, exportId),
    headers: {
      'Authorization': BASIC_AUTH,
      'Accept': 'application/octet-stream'
    }
  }, function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
    res.json(body);
  });
}

/**
 * Step 1: GET the list of available Export definitions, so you can decide which Export action to execute
 */
function getExports(req, res) {

  request({
    method: 'GET',
    url: util.format('%s/exports', BASE_URL),
    headers: {
      'Authorization': BASIC_AUTH,
      'Accept': 'application/json'
    }
  }, function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
    res.json(JSON.parse(body));
  });
}

/**
 * Step 2: POST the export "task", so that the export action is executed. 
 */
function setExportTask(req, res) {
  var exportId = req.swagger.params.id.value;

  request({
    method: 'POST',
    url: util.format('%s/exports/%s/tasks', BASE_URL, exportId),
    headers: {
      'Authorization': BASIC_AUTH,
      'Content-Type': 'application/json'
    },
    body: "{\"localeName\": \"en_US\"}"
  }, function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
    res.json(JSON.parse(body));
  });
}

/**
 * Step 2b: Get the status of the specified EXPORT task, and check for "taskState": "COMPLETE"
 */
function getTaskStatus(req, res) {
  var taskId = req.swagger.params.task_id.value;
  var exportId = req.swagger.params.export_id.value;

  request({
    method: 'GET',
    url: util.format('%s/exports/%s/tasks/%s', BASE_URL, exportId, taskId),
    headers: {
      'Authorization': BASIC_AUTH,
      'Accept': 'application/json'
    }
  }, function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
    res.json(JSON.parse(body));
  });
}