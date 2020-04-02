$(document).ready(function(){
    $('.submit').on('click',function(){
        event.preventDefault();
        let email = $('#email').val().trim();
        let password = $('#password').val().trim();
        console.log(email, password);
    });
});