/**
 * 
 */
'user strict';

angular.module('myApp').factory('UserService',['$http','$q',function($http,$q){
	
	var REST_SERVICE_URI = 'http://localhost:8080/myangular/user/';
	
	var factory = {
			fetchAllUsers: fetchAllUsers,
			createUser: createUser,
			updateUser: updateUser,
			deleteUser: deleteUser
	};
	
	return factory;
	
	function fetchAllUsers(){
		var deferred = $q.defer(); //defer는 비동기로 promise가 만들어지도록 하는 것  $q->비동기통신을 위한 것 
		$http.get(REST_SERVICE_URI)
		.then(
				function(response){
					deferred.resolve(response.data); // resolve : 올바르게 데이터를 받았다
				},
				function(errResponse){
					console.error('Error while fetching Users');
					deferred.reject(errResponse); // reject: 데이터를 못받았다. 
				}
				);
		return deferred.promise; //result of an action
	}
	
	function createUser(user){
		var deferred = $q.defer();
		$http.post(REST_SERVICE_URI, user)
		.then(
				function(response){
					deferred.resolve(response.data);
				},
				function(errResponse){
					console.error('사용자 등록중 에러');
					deferred.reject(errResponse);
				}
				);
		return deferred.promise;
	}
	
	function updateUser(user,id){
		var deferred = $q.defer();
		
		$http.put(REST_SERVICE_URI+id, user)
		.then(
				function(response){
					deferred.resolve(response.data);
				},
				function(errResponse){
					console.error('사용자 수정중 에러');
					deferred.reject(errResponse);
				});
		return deferred.promise;
	}
	
	function deleteUser(id){
		var deferred = $q.defer();
		$http.delete(REST_SERVICE_URI + id)
		.then(
				function(response){
					deferred.resolve(response.data);
				},
				function(errResponse){
					console.error('사용자 삭제중 에러');
					deferred.reject(errResponse);
				});
		return deferred.promise;
	}
}]);