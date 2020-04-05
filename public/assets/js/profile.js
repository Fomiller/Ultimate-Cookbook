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
  // variables for updating Recipes
  let deleteRecipeBtn = $('.del-btn');
  let editRecipeBtn = $('.edit-btn');
  let updateRecipeBtn = $('.save-btn');
  let recipeInfo = $('.recipe-info');
  // variables for updating info
  let editInfoBtn = $('#edit-info');
  let updateInfoBtn = $('#update-info');
  let userInfoInputs = $('.info-input');
  let userInfo = $('.user-info');

  // delete Recipe
  function deleteRecipe(id) {
    $.ajax({
      method: 'DELETE',
      url: '/api/recipes/' + id
    }).then(function() {
      // return res.json(data);
      window.location.replace('/profile');
    });
  }

  // update Recipe
  function updateRecipe(recipe) {
    $.ajax({
      method: 'PUT',
      url: '/api/recipes',
      data: recipe
    }).then(function(data) {
      window.location.replace('/profile');
    });
  }

  // Update User Bio
  function updateinfo(info){
    //make an ajax call to update the user bio
    $.ajax({
        method: 'PUT',
        url:'/api/users',
        data:info
      })
    .then(function(data) {
      window.location.replace('/profile');
    }).catch(err=> console.log(err));
  }

  // Delete Recipe button
  deleteRecipeBtn.on('click', function() {
    let btnId = $(this).data('id');
    deleteRecipe(btnId);
  });

  // edit Recipe Button
  editRecipeBtn.on('click', function() {
    let btnId = $(this).data('id');
    let save = $(this).siblings('.save-btn');
    let recipeInputs = document.querySelectorAll(`[data-edit='${btnId}']`);
    // toggles display classes for the inputs of that recipe.
    recipeInputs.forEach(o => {
      if (o.style.display === 'none') {
        o.style.display = 'block';
      } else {
        o.style.display = 'none';
      }
    });
    // display the save button
    save.toggle();
    recipeInfo.toggle();
  });


  // toggleing display attributes for input fields and submit button.
  updateRecipeBtn.hide();
  updateInfoBtn.hide();
  editInfoBtn.on('click', function(){
    updateInfoBtn.toggle();
    userInfoInputs.toggle();
    userInfo.toggle();
  });

  // update Recipe Button
  updateRecipeBtn.on('click', function() {
    let btnId = $(this).data('id');
    let descInput = $(`#desc-form${btnId}`).val();
    let instInput = $(`#inst-form${btnId}`).val();
    let ingredInput = $(`#ingred-form${btnId}`).val();
    let chefInput = $(`#chef-form${btnId}`).val();
    let dataOBJ = {
      id: btnId,
      description: descInput,
      instructions: instInput,
      ingredients: ingredInput,
      chefComments: chefInput,
    };
    updateRecipe(dataOBJ);
  });

  userInfoInputs.hide();
  // Update User Bio on click event
  updateInfoBtn.on('click', function(){
    userInfoInputs.toggle();
    // event.preventDefault();
    let id = $(this).data('id');
    let userNameInput = $(`#username${id}`).val();
    let firstNameInput = $(`#first${id}`).val();
    let lastNameInput = $(`#last${id}`).val();
    let bioInput = $(`#bio${id}`).val();
    let dataOBJ = {
      id: id,
      username:userNameInput,
      firstName:firstNameInput,
      lastName:lastNameInput,
      bio:bioInput,
    };
    console.log(dataOBJ);
    updateinfo(dataOBJ);
  });

  $.get('/api/userData').then( function(data){
    // console.log('userdata', data.id);
    usernameField.text(data.username);
    firstnameField.text(data.firstName);
    lastnameField.text(data.lastName);
    bioField.text(data.bio);
    return UserId = data.id;
  });

  // Add Recipe Form
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