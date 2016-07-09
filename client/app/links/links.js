angular.module('shortly.links', [])

.controller('LinksController', function ($scope, $location, Links, Auth) {
  // Your code here
  $scope.data = {};

  //if (Auth.isAuth()) {
    Links.getAll()
      .then(function (data) {
        $scope.data.links = data;
      });
    $scope.navtoLink = function (link) {
      console.log('natoLink: ', link);
      Links.navLink(link);
    };
  //} else {
   // $location.path('/signin');
  //}
});
