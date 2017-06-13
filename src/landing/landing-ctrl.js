// To use this, comment the .coffee version and uncomment this one

angular.module('%module%.landing')
.controller('LandingCtrl', function($scope, $http) {

  $scope.users = [];
  $scope.availableRoles = ['USER', 'EDITOR', 'ADMIN'];

  $http.get('data/users.csv')
  .then(function(res) {
    var init_data = Papa.parse(res.data, {
      header: true,
      delimiter: ',',
      dynamicTyping: true,
      skipEmptyLines: true
    }).data;
    //loop through users
    init_data.forEach(function(item) {
      //get initial of each user
      var inls = item.firstname.replace('-', ' ').match(/\b\w/g).join('') + item.lastname[0];
      item.initials = inls.toUpperCase();
      //get roles of each user
      var roles = item.roles.split(';');
      item.roles=[];
      $scope.availableRoles.forEach(function(role) {
        if (roles.indexOf(role)>-1) {
          item.roles.push({name:role, selected:true})
        }
        else {
          item.roles.push({name:role, selected:false})
        }
      })
    });
    $scope.users = init_data;
  });
});
