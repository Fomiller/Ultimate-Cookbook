$(document).ready(function(){
    let searchForm = $('.search-form');
    let searchInput = $('#search-input');

    searchForm.on('submit', function(event){
      event.preventDefault();
      let search = searchInput.val().trim();
      // if search field is empty dont do anything.
      if (!search) {
        alert('please enter a value');
        return;
      }
      // redirect to html route '/search/:recipe
      window.location.replace(`/search/${search}`);
    });
  });