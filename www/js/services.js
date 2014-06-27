var employeeServices = angular.module("employeeServices", []);
employeeServices.service('Employee',['$http','$q',function($http, $q) {
var url = 'json/employees.json';
var employees = [];
this.callWebService = function(httpMethod, url, action, params, data){
		var deferred = $q.defer();
		if(typeof params == "undefined"){
			params = "";
		}
		
		//Sample params {params:{fname: "fname", lname: "lname"}}
		var httpDict = {};
 		httpDict.url = url;
 		httpDict.method = httpMethod;
 		if(httpMethod == 'GET' || httpMethod == 'DELETE'){
 			httpDict.params = params;
 		}
 		else if(httpMethod == 'POST' || httpMethod == 'PUT'){
 			httpDict.data = params;
  		};
 	 			
		$http(httpDict).success(function(response, status) {
	    	deferred.resolve(response);
		}).error(function(errors, status) {
			// please note the type of error expecting is array
			// so form error as array if you modifying it
			if(status == 406){ // 406- Network error
				deferred.reject(errors);
			}
			else if(status == 500){ // 500- Internal Server Error
				deferred.reject(['Internal server error occured']);
			}
			else if(status == 401){ // 401- Unauthorized
				console.log('lets redirect');
				// so lets redirect to login page
			}else{
				deferred.reject(errors);
			}
		    
		});
		return deferred.promise;	    	
	};

   	this.list = function() {
    	return this.callWebService("GET", url, "list");
   	};
    
    
   	this.delete = function(eid) {
   		var reqObj = {};
   		reqObj.empId = eid;
   		return this.callWebService("POST", url, "delete", reqObj);
   	};
   
}]);