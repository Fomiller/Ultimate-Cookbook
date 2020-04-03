$(document).ready(function() {
  let usernameField = $('#username');
  let firstnameField = $('#first-name');
  let lastnameField = $('#last-name');
  let bioField = $('#user-bio');

  $.get('/api/userData').then( function(data){

    console.log('userdata', data);
    usernameField.text(data.username);
    firstnameField.text(data.firstName);
    lastnameField.text(data.lastName);
    bioField.text(data.bio);

  });
});