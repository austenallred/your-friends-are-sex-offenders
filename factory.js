app.factory('appFactory',['$resource', '$http', function($resource, $http){
  var query = 'http://www.iowasexoffender.com/api/search/results.json?';
  
  $http.defaults.useXDomain = true;

  var dataStorage = [];

  var processData = function(friendsArray, cb){
    var resultData = [];
    for(var i = 0; i < friendsArray.length; i++){
      var bothNames = friendsArray[i].split(' ');
      var firstName = bothNames[0];
      var lastName = bothNames[bothNames.length - 1];

      //var url = query + 'firstname=' + firstName + '&lastname=' + lastName;
      resultData.push(apiQuery(firstName, lastName, cb));
    }
    return resultData;
  };



  var apiQuery = function(firstname, lastname, cb){

    var search = new IOWA.SOR();
    var criteria = new IOWA.SOR.CRITERIA();

    criteria.set('firstname',firstname); // any item described in the query section may be used
    criteria.set('lastname', lastname);
    criteria.limit(10); // records per "page"
    criteria.page(1); // default is 1, start on any page


    // execute search, passing the service url, criteria, and a callback funciton
    var data;
    return search.execute('http://www.iowasexoffenders.com/api/search/results.json',criteria, function (response) {
        // response contains full response object as described in the api info page
        dataStorage.push(response);
        return cb(response);
      });
  };


return {
  processData: processData,
  dataStorage: dataStorage
};
}]);

/////TO DO: ADD a server (maybe on Parse.com?) and then refactor my code to be able to make requests to the server.
//This will allow me to get around the cross domain origin request crap.
//I think.
//Maybe there is something else that I can do with the Facebook API.
//Right now it is pretty bare bones but I want to make it work.
//I BETTER doublecheck to make sure that the server is absolutely necessary before I begin writing all that code.
//Get help on this one.