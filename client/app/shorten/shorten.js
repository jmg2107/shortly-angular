angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  // Your code here
  $scope.link = {
    url: ''
  };
  $scope.addLink = function (newLink) {
    console.log("in addLink, and parameter passed is: ", newLink);
    Links.addOne(newLink)
    .then(function () {
      console.log("posted new link");
    });
  };
});
