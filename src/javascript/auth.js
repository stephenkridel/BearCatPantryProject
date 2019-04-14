import $ from 'jquery'
import 'jquery-form'
$(function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    var xhr=new XMLHttpRequest();
    xhr.open('POST', '/tokenvalidate');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(`idtoken=${id_token}`);
    $(".g-signin2").css("display", "none");
    $(".data").css("display", "block");
    $('#pic').attr('src', profile.getImageUrl());
    $('#email').text(profile.getEmail());
  });
  $( function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    document.cookie = "userId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "isAdmin= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    auth2.signOut().then(function () {
      alert("You have been successfully signed out");
      $(".g-signin2").css("display", "block");
      $(".data").css("display", "none")
    });
  });

