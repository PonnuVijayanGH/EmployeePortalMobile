var empControllers = angular.module('empControllers',[]);
var employees;
var employee;
empControllers.controller('empListController',['$scope','Employee',
	function($scope,Employee){
		if(employees == null) {
			getEmployees();
		}
		$scope.employees = employees;

		function getEmployees() {
		 	Employee.list().then(function(data){
				$scope.employees = employees = data;
			})
		}
	}]);

empControllers.controller('empDetailController',['$scope','$state','$ionicPopup','$stateParams',
	function($scope,$state,$ionicPopup,$stateParams){
		$scope.isEditMode = ($stateParams.eid== '');
		employee = ($stateParams.eid== '') ? initEmp() : angular.copy(getDetail($stateParams.eid));
		$scope.employee = employee;//getDetail($stateParams.eid);
		$scope.save = function(emp){
			if($stateParams.eid== '') {
					//add emp
					employees.push(emp);
			}
			else {
					//edit emp
				for (i in employees) {
			        if (employees[i].id == emp.id) {
			           for (var key in emp) {
			           	 employees[i][key] = emp[key];
			           }
			        }
    			}
			}
			
    		$state.go('list');
		}		

		$scope.confirm = function() {
			var confirmPopup = $ionicPopup.confirm({
				title : 'Delete',
				template : 'Are you sure you want to delete this employee ?'
			});

			confirmPopup.then(function(res){
				if(res){
					//delete employee
					for (i in employees) {
				        if (employees[i].id == employee.id) {
				           employees.splice(i,1);
				        }
    				}
					//go back to list view
					$state.go('list');
				}
				else {

				}
			})
		}

		function getDetail(eid) {
			 for (i in employees) {
		        if (employees[i].id == eid) {
		            return employees[i];
		        }
    		}
    		return null;
    	}

    	function initEmp() {
    		var emp = {};
    		emp = {
				"name" : "",
				"designation" : "",
				"email" : "",
				"phone" : "",
				"date" : "",
				"id" : Math.random(),
				"image" : "emp01.jpg",
				"contactInfo" : [
				{
					"name" : "Address",
					"value" : ""
				},
				{
					"name" : "Phone",
					"value" : ""
				},
				{
					"name" : "Email",
					"value" : ""
				}
		],
		"projectInfo" : [
				{
					"name":"",
					"details" : [
						{
							"name" : "Technology",
							"value" : ""
						},
						{
							"name" : "Description",
							"value" : ""
						}
					]

				},
				{
					"name":"",
					"details" : [
						{
							"name" : "Technology",
							"value" : ""
						},
						{
							"name" : "Description",
							"value" : ""
						}
					]
				}
			],
		"eduInfo" : [
				{
					"name" : "Secondary",
					"value" : ""
				},
				{
					"name" : "Higher Secondary",
					"value" : ""
				},
				{
					"name" : "Degree",
					"value" : ""
				}
			]
	};
	return emp;
    	}

	}]);