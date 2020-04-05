$(document).ready(function() {
  let usernameField = $('#username');
  let firstnameField = $('#first-name');
  let lastnameField = $('#last-name');
  let bioField = $('#user-bio');
  // add recipe variables
  let recipeNameInput = $('#recipe-name');
  let ingredientsInput = $('#ingredients');
  let instructionsInput = $('#instructions');
  let descriptionInput = $('#description');
  let chefCommentsInput = $('#chef-comments');
  let addRecipeForm = $('form.add-recipe');


  $.get('/api/userData').then( function(data){
    // console.log('userdata', data.id);
    usernameField.text(data.username);
    firstnameField.text(data.firstName);
    lastnameField.text(data.lastName);
    bioField.text(data.bio);
    return UserId = data.id;
  });

  addRecipeForm.on('submit', function(event) {
    event.preventDefault();
    let recipeData = {
      recipeName: recipeNameInput.val().trim(),
      ingredients:ingredientsInput.val().trim(),
      instructions:instructionsInput.val().trim(),
      description:descriptionInput.val().trim(),
      chefComments:chefCommentsInput.val().trim(),
    };

    if (!recipeData.recipeName || !recipeData.ingredients || !recipeData.instructions || !recipeData.description) {
      alert('please fill out the form completely');
      return;
    }

    function addRecipe(recipeName, ingredients, instructions, description, chefComments) {
      $.post('/api/add-recipe', {
        recipeName: recipeName,
        ingredients: ingredients,
        instructions: instructions,
        description: description,
        chefComments: chefComments,
      }).then(function(data) {
        // reload page
        console.log('profile.js');
        window.location.replace('/profile');
      }).catch(err => res.status(401).json(err));
    }

    addRecipe(recipeData.recipeName, recipeData.ingredients, recipeData.instructions, recipeData.description, recipeData.chefComments);
    // reset form values to empty
    recipeNameInput.val('');
    ingredientsInput.val('');
    instructionsInput.val('');
    descriptionInput.val('');
    chefCommentsInput.val('');
  });
});