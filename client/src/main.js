import Vue from 'vue';

Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{todo.text}}</li>'
});

export var app7 = new Vue({
  el: '#app7',
  data: {
    groveryList: [
      { text: 'Vegetables' },
      { text: 'Cheese' },
      { text: 'Whatever else humans are supposed to eat' }
    ]
  }
});
export     var app = new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue!'
      }
    });
export     var app2 = new Vue({
      el: '#app2',
      data: {
        message: 'Hover'
      }
    });
export     var app3 = new Vue({
      el: '#app3',
      data: {
        seen: true
      }
    });
export     var app4 = new Vue({
      el: '#app4',
      data: {
        todos: [{
          text: 'Learn javascript'
        }, {
          text: 'Learn Vue'
        }, {
          text: 'Build'
        }]
      }
    });
export     var app5 = new Vue({
      el: '#app5',
      data: {
        message: 'Hello Vue.js'
      },
      methods: {
        reverseMessage: function() {
          this.message = this.message.split(' ').reverse().join(' ');
        }
      }
    });
export     var app6 = new Vue({
      el: '#app6',
      data: {
        message: 'Hello Vue'
      }
    });