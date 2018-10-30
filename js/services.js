
angular.module('starter')

.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == 'ephlux@demo.com' && pw == '111') {
                window.localStorage.setItem("user", '3rdGulshan' );
                deferred.resolve('Welcome ' + name + '!');
            } else if (name == 'jeddah@demo.com' && pw == '111') {
                window.localStorage.setItem("user", '3rdGulshan' );
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
