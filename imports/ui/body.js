import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';

import './tasks.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

const incompleteTasksQuery = {checked: {$ne: true}};

Template.body.helpers({
  tasks() {
    var query = {};
    if (Template.instance().state.get('hideCompleted')) {
      query = incompleteTasksQuery;
    }

    return Tasks.find(query, {sort: {createdAt: -1}});
  },

  incompleteCount() {
    return Tasks.find(incompleteTasksQuery).count();
  }
});

Template.body.events({
  'submit .new-task'(evt) {
    evt.preventDefault();

    const target = evt.target;
    const text = target.text.value;

    // insert the task
    Meteor.call('tasks.insert', text);

    // clear the form
    target.text.value = '';
  },
  'change .hide-completed input'(evt, instance) {
    instance.state.set('hideCompleted', evt.target.checked);
  }
});
