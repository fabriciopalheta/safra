

angular.module("marvelBuscaApp").factory("marvelService" , function($http , $q){
    return{
       

        GetTeste : function(url)
        {
            var deferred = $q.defer();
            $http.get(url)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });

            return deferred.promise;
        },

        GetById : function(url)
        {
            $http.get(url)
            .success(function (response) {
                deferred.resolve(response);
            })
            .error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

       
    }
})