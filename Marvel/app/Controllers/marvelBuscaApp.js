angular.module("marvelBuscaApp").controller("indexController",function($scope  , marvelService ,  config ){
    $scope.mainTitle = "Bem Vindo !";
    const baseurl ="http://gateway.marvel.com/";
    const apipublickey="5a237863b3cc2061003cbbc4fe20dc06";
    const apiprivatekey="fbf255068eccea6d0ef951b9f25626b57ab2fe72";
    listagemCharacters="/v1/public/characters";

    $scope.HeroesList = [];
    $scope.HeroesListShow = [];
    $scope.HeroInfo = null;

    $scope.init = () => {
       
    }

    $scope.GerByname = (param) => {
       
        var timestamp = Date.now().toString();      
        var hashcode = Gethash(timestamp)
        var offset = 4;
        const urlAPI = baseurl+listagemCharacters+"?limit=100&offset="+offset+"&nameStartsWith="+param+"&ts="+timestamp+"&apikey="+apipublickey+"&hash="+hashcode;
       
         marvelService.GetTeste(urlAPI).then(function(response){
                if(response){
                    $scope.HeroesList = response.data;
                    $scope.HeroesListShow = $scope.HeroesList.results;
                    console.log($scope.HeroesList.results);
                  
                }
         });    
    }

    $scope.GetInfo = (id) => {
        if(id != null){
            
            console.log(id);
            $scope.HeroInfo = null;
            var timestamp = Date.now().toString();      
            var hashcode = Gethash(timestamp)
            var offset = 4;
            const urlAPI = "https://gateway.marvel.com:443/v1/public/characters/"+id+"&ts="+timestamp+"&apikey="+apipublickey+"&hash="+hashcode;
            console.log(urlAPI);
    
            marvelService.GetById(urlAPI).then(function(response){
                if(response){
                    $scope.HeroInfo = response.data;
                  
                    console.log($scope.HeroInfo)
                }
         });    
        }
       

    }

    $scope.GetCharacter = (param) => {
        if(param != null){
            $scope.HeroesListShow = $scope.HeroesList.filter(function(item){
                if(item.startwith(param))
                    return item;
            });

            console.log( $scope.HeroesListShow);
        }
    }


    $scope.getHeroes = () => {
      
        var timestamp = Date.now().toString();      
        var hashcode = Gethash(timestamp)
        var offset = 4;
        const urlAPI = baseurl+listagemCharacters+"?limit=100&offset="+offset+"&ts="+timestamp+"&apikey="+apipublickey+"&hash="+hashcode;
       
         marvelService.GetTeste(urlAPI).then(function(response){
                if(response){
                    $scope.HeroesList = response.data;
                    console.log($scope.HeroesList.results)
                }
         });    
      
    }

    var  Gethash =  (timestamp) => {
       
        const hashed =  timestamp + apiprivatekey + apipublickey;
        const  hashedcode = CryptoJS.MD5(hashed);
        return hashedcode;
    }
});