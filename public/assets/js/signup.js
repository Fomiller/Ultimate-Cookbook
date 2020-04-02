$document.ready(function() {
    let signupForm = $('form.signup');
    let emailInput = $('input#email-input');
    let passwordInput = $('input#password-input');

    // creates and alert with the err Message
    // set fade in time
    function handleLoginErr(err) {
        $('#alert .msg').text(err.responseJSON);
        $('#alert').fadeIn(500);
    }
    // signup the user if email and password are present.
    function signUpUser(email, password) {
        $.post('api/signup', {
            email: email,
            password: password
        }).then(function() {
            // if signup is successful then the window is redirected to the /members endpoint.
            window.location.replace('/members');
        }).catch(handleLoginErr);
    }

    // check to see if email and password are not blank
    signupForm.on('submit', function(event) {
        event.preventDefault();
        let userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };
        if (!userData.email || !userData.password) {
            return;
          }
        //if both email and password are not null then signupuser()
          signUpUser(userData.email, userData.password);
          emailInput.val('');
          passwordInput.val('');
    });
});