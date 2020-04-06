$(document).ready(function() {
	let signupForm = $('form.signup');
	let emailInput = $('input#email-input');
	let passwordInput = $('input#password-input');
	let usernameInput = $('input#username-input');
	let firstNameInput = $('input#first-name-input');
	let lastNameInput = $('input#last-name-input');

	// creates and alert with the err Message
	// set fade in time
	function handleLoginErr(err) {
			$('#alert .msg').text(err.responseJSON);
			$('#alert').fadeIn(500);
	}
	// signup the user if email and password are present.
	function signUpUser(email, password, username, firstName, lastName) {
			$.post('/api/signup', {
					email: email,
					password: password,
					username: username,
					firstName: firstName,
					lastName:lastName
			}).then(function() {
					// if signup is successful then the window is redirected to the /members endpoint.
					window.location.replace('/login');
			}).catch(handleLoginErr);
	}

	// check to see if email and password are not blank
	signupForm.on('submit', function(event) {
			event.preventDefault();
			let userData = {
					email: emailInput.val().trim(),
					password: passwordInput.val().trim(),
					username: usernameInput.val().trim(),
					firstName: firstNameInput.val().trim(),
					lastName: lastNameInput.val().trim(),
			};
			// if one of the fields is not filled out return.
			if (!userData.email || !userData.password || !userData.username || !userData.firstName || !userData.lastName) {
					return;
				}
			//if all fields are not null then signUpUser()
				signUpUser(userData.email, userData.password, userData.username, userData.firstName, userData.lastName);
				emailInput.val('');
				passwordInput.val('');
				usernameInput.val('');
				firstNameInput.val('');
				lastNameInput.val('');
	});
});