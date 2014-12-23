/**
 * Created by rajesh on 12/23/14.
 */
$(document).ready(function(){
    $("body").on('click',"#create-new", function(e){
        e.preventDefault();

        $.get('/reminders/new', function(res){
            $('.modal .modal-body').html(res);
            $('#myModal').modal('show');

        });


    });
})

