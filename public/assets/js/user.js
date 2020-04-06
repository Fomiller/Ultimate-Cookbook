$(document).ready(function(){
    let saveBio = $('#save-bio');
    let bioText = $('#bio');
    let userId = $('#user-id');

    function updateBio(id, text){
        //make an ajax call to update the user bio
        $.ajax({
            method: 'PUT',
            url:`/api/bio/${id}`,
            data:text})
        .then((d)=>{
            console.log(d);
        })
        .catch(err=> console.log(err));
    }

    saveBio.on('click', function(){
        event.preventDefault();
        //create object with the new bio text, pass
        //user id and object to ajax call function
        const bioObj = {bio: bioText.val()}; //use bio key because thats the key in the User table
        updateBio(userId[0].textContent, bioObj);
    });
});