$(document).readY(function() {

    $('.logout').on('click', function(){
        $.get('/logout');
    });
});