(function(){

    "use strict";

    angular
    .module('ngClassifieds')
    .factory('classifiedsFactory', function($http){

        function getClassifieds(){
            return $http.get('data/classifieds.json');
        }
        return{
             /*property*/ getClassifieds: getClassifieds /*function that is going to return*/
        }
    });
})();