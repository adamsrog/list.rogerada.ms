Todos = new Meteor.Collection('todos');

if (Meteor.isClient) {
  Template.TodosPanel.helpers({
    items: function() {
      return Todos.find({}, {
        sort: {
          created_at: -1
        }
      });
    },

    isDoneClass: function() {
      return this.is_done ? 'done' : '';
    }
  });

  Template.TodoItem.helpers({
    isDoneChecked: function() {
      return this.is_done ? 'checked' : '';
    }
  });

  Template.TodoItem.events({
    'click [name=is_done]': function(e, tmpl) {
      var id = this._id;
      var isDone = tmpl.find('input').checked;
      Todos.update({_id: id}, {
        $set: {
          is_done: isDone
        }
      });
    }
  });

  Template.CreateTodoItem.events({
    'submit form': function(e, tmpl) {
      // prevent the default action from occuring (post to server)
      e.preventDefault();

      // get user's text
      var subject = tmpl.find('input').value;
      
      // add to database
      Todos.insert({
        subject: subject,
        created_at: new Date,
        is_done: false
      });

      // clear the textbox
      var form = tmpl.find('form');
      form.reset();
    }
  });

  Template.TodosCount.helpers({
    completedCount: function () {
      return Todos.find({is_done: true}).count();
    },

    totalCount: function() {
      return Todos.find({}).count();
    }
  });
}

if (Meteor.isServer) {

}
