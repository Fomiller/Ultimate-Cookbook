$(document).ready(function() {
    let loginForm = $('form.login');
    let emailInput = $('input#email-input');
    let passwordInput =$('input#password-input');

    // declare login function to use below
    function loginUser(email, password) {
        $.post('/api/login', {
            email: email,
            password: password
        }).then(function() {
            window.location.replace('/members');
        }).catch(function(err) {
            console.log(err);
        });
    }

    loginForm.on('submit', function(event) {
        event.preventDefault();
        console.log(emailInput.val(), passwordInput.val());
        let userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };
        if (!userData.email || !userData.password) {
            return;
        }
        // if there is an an email and a password then we try to log the user in
        loginUser(userData.email, userData.password);
        // this will reset the input fields to null
        emailInput.val('');
        passwordInput.val('');
    });
});


