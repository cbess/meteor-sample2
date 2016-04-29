import { Meteor } from 'meteor/meteor';

import { Tasks } from '../tasks.js';

Meteor.publish('tasks', () => {
  // only publish tasks that are public or belong to the current user
  return Tasks.find({
    $or: [
      {private: {$ne: true}},
      {owner: this.userId},
    ]
  });
});
