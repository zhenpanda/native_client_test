$(document).ready(function() {
  /* running before user action*/
  console.log("loaded bro");

  var login = function() {
    var namez = $("#username").val();
    var psw = $("#psw").val(); ;
    //console.log(name, psw);

    
    $.ajax({
      type: "POST",
      dataType: "json",
      url: '/login',
      data: { n: namez, p : psw }
    })
    .done(function(data) {
      console.log(data);
    })
    .fail(function() {
      console.log("Sorry. Server unavailable.");
    });
    
  };

  $("#login").on('click', function() {
    console.log("login clicked");
    login();
  });

  var fetchData = function() {
    $.ajax({
      type: "POST",
      url: '/fetch'
    }).done(function(data) {
      console.log(data);
    }).fail(function() {
      alert("Sorry. Server unavailable.");
    });
  };
  fetchData();

});
