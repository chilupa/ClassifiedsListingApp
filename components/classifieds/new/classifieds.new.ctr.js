(function () {
    "use strict";

    angular.module('ngClassifieds')
        .controller('newClassifiedsCtrl', function ($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {

            var vm = this;

            vm.closeSideBar = closeSideBar;
            vm.saveClassified = saveClassified;

            $timeout(function () {
                $mdSidenav('left').open();
            });

            $scope.$watch('vm.sidenavOpen', function (sidenav) {
                if (sidenav === false) {
                    $mdSidenav('left')
                        .close()
                        .then(function () {
                            $state.go('classifieds');
                        });
                }
            });

            function closeSideBar() {
                vm.sidenavOpen = false;
            }


            function saveClassified(classified) {
                if (classified) {

                    // CONTACT                 
                    classified.contact = {
                        name: 'Pavan',
                        phone: '(123)-456-7890',
                        email: 'chilupa@outlook.com'
                    }
                    $scope.$emit('newClassified', classified);
                    vm.sidenavOpen = false;
                }
            }
        }); // End of Controller
})();