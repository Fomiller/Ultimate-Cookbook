$(document).ready(function(){
    let recipeName = $('#recipe-name');
    let ingredients = $('#ingredients');
    let instructions = $('#instructions');
    let description = $('#description');
    let chefComments = $('#chef-comments');

    function addRecipe(recipeObj){
        $.post('/api/add-recipe', recipeObj)
        .then(function(data){
            console.log(data);
            window.location.replace('/');
        })
        .catch(err => console.log(err));
    }


    $('#add-recipe').on('click', function(){
        event.preventDefault();
        let recipe = {
            recipeName: recipeName.val().trim(),
            ingredients: ingredients.val().trim(),
            instructions: instructions.val().trim(),
            description: description.val().trim(),
            chefComments: chefComments.val().trim()
        };
        console.log(recipe);
        addRecipe(recipe);
    });

});