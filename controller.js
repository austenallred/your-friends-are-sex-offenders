app.controller('appController',['$scope', 'appFactory', function($scope, appFactory){
  $scope.input = 'Hi there!';

  $scope.resultsArr = [];

  $scope.submit = function() {

    $scope.data = $scope.input;
    friendArray = $scope.input.split(', ');
    appFactory.processData(friendArray, function(response){
      if(response.records !== 0){
        for(var i = 0; i < response.records.length; i++){
        $scope.resultsArr.push(response.records[i]);
        }
      }
      $scope.$apply();
      console.log('RESULTS', $scope.resultsArr);
    });

  };

}]);