angular.module('shortly.services', [])

.factory('Links', function ($http) {
  // Your code here
// Simple GET request example:
  var getAll = function () {
    console.log ("FLY NYAN FLY");
      return $http({
      method: 'GET',
      url: '/api/links'
    })
    .then(function (res) {
      console.log("res data is ", res.data);
      return res.data;
    });
  };
  var addOne = function (newlink) {
    console.log("starting POST with ", newlink);
    return $http({
      method: 'POST',
      url: '/api/links',
      data: newlink
    })
    .then(function (resp) {
      console.log("returning response from data server");
      return resp;
    });
  };
  var navLink = function (link) {
    console.log('This is the params: ', link.code);
    return $http({
      method: 'GET',
      url: '/' + link.code,
      params: link,
      headers: {'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With' }
    })
    .then(function (res) {

      console.log('Leaving Site!');
    });
  };

//define NavToLink function and connect in links.js
//$http has a params key.  set this to the passed in object.code.
// send a GET request to '/:code', the response SHOULD be the
// link we should navigate to.
  return {
    getAll: getAll,
    addOne: addOne,
    navLink: navLink
  };
})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
