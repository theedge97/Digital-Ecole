$( document ).ready(function() {
  
    // SUBMIT FORM
      $("#connection").submit(function(event) {
      // Prevent the form from submitting via the browser.
      event.preventDefault();
      ajaxPost();
    });
      
      
      function ajaxPost(){
        
        // PREPARE FORM DATA
        var formData = {
          matricule : $("#lematricule").val(),
          motdepasse :  $("#motdepasse").val(),
          classe : $("#classe").val()
        }
        
        // DO POST
        $.ajax({
        type : "POST",
        contentType : "application/json",
        url : "/forumapprentissage",
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function() {
            alert('Your submission was successful');
        },
        error : function (data) {
            $('#error-group').css('display', 'block');
            var errors = JSON.parse(data.responseText);
            var errorsContainer = $('#errors');
            errorsContainer.innerHTML = '';
            var errorsList = '';
      
            for (var i = 0; i < errors.length; i++) {
              errorsList += '<li>' + errors[i].msg + '</li>';
            }
            errorsContainer.html(errorsList);
          }
      });
        
        // Reset FormData after Posting
        resetData();
   
      }
      
      function resetData(){
        $("#matricule").val("");
        $("#motdepasse").val("");
        $("#classe").val("");
      }
  })