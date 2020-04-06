$(document).ready(function() {
let addCommentBtn = $('.add-comment');

function createComment(comment) {
  $.ajax({
    method: 'POST',
    url: '/api/comments',
    data: comment
  }).then(function(data) {
    window.location.replace('/recipes');
  });
}


addCommentBtn.on('click', function() {
  let btnId = $(this).data('id');
  let commentField = $(`#add-comment${btnId}`).val();
    console.log(btnId);
    console.log(commentField);
  let comment = {
    commentBody: commentField,
    RecipeId: btnId,
  };
  createComment(comment);
  console.log('comment created');
  });
});