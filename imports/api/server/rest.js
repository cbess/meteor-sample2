import { JsonRoutes } from 'meteor/simple:json-routes';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../tasks.js';

JsonRoutes.add('get', 'api/tasks/:id', function(req, res) {
  const id = req.params.id;

  JsonRoutes.sendResult(res, {
    data: Tasks.findOne({_id: id})
  });
});

Meteor.method('api-tasks', (taskId) => {
  return Tasks.findOne({_id: taskId});
}, {
  url: 'api/my-tasks/:0',
  httpMethod: 'get'
});
