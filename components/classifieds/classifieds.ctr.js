// Immediately invoked Java script functions (FE)
(function () {
    "use strict";

    angular.module('ngClassifieds')
        .controller('classifiedsCtrl', function ($scope, $state, $stateParams, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

            var vm = this; // vm = view model

            vm.categories;
            vm.classified;
            vm.classifieds;
            vm.closeSideBar = closeSideBar;
            vm.deleteClassified = deleteClassified;
            vm.editing;
            vm.editClassified = editClassified;
            vm.openSideBar = openSideBar;
            vm.saveClassified = saveClassified;
            //vm.saveEdit = saveEdit;


            classifiedsFactory.getClassifieds().then(function (classifieds /*data coming back from GET request*/) {
                vm.classifieds = classifieds.data; // in classifieds data property we are retrieving
                // CATEGORIES 
                vm.categories = getCategories(vm.classifieds);
            });


            $scope.$on('newClassified', function (event, classified) {
                classified.id = vm.classifieds.length + 1;
                vm.classifieds.push(classified);
                showToast('Classified Saved!')
            });

            // CONTACT                 
            var contact = {
                name: 'Pavan',
                phone: '(123)-456-7890',
                email: 'chilupa@outlook.com'
            }

            // NEW classified 
            function openSideBar() {
                $state.go('classifieds.new')
            };

            function closeSideBar() {
                $mdSidenav('left').close();
            };

            // SAVE CLASSIFIED 
            function saveClassified(classified) {
                if (classified) {
                    classified.contact = contact;
                    vm.classifieds.push(classified);
                    vm.classified = {};
                    closeSideBar();
                    showToast("Classified Saved !")
                }
            }; // End of SaveClassified


            $scope.$on('editSaved', function (event, message) {
                showToast(message);
            });

            // EDIT Classified 
            function editClassified(classified /*classifiedForEditing*/) {
             
                $state.go('classifieds.edit', {
                    id: classified.id,
                    classified: classified
                });
            };






            // SAVE EDIT 
            function saveEdit() {
                vm.editing = false;
                vm.classified = {};
                closeSideBar();
                showToast("Edit saved !")
            }

            // DELETE Classified
            function deleteClassified(event, classified) {
                var confirm = $mdDialog.confirm()
                    .title('Are you sure you want to delete ' + classified.title + '?')
                    .ok('Yes')
                    .cancel('No')
                    .targetEvent(event);

                $mdDialog.show(confirm).then(function () {
                    var index = vm.classifieds.indexOf(classified);
                    vm.classifieds.splice(index, 1);
                }, function () {

                });
            }

            // SHOW TOAST 
            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(message)
                        .position('top, right')
                        .hideDelay(3000)
                )
            };


            // GET unique categories using LODASH 
            function getCategories(classifieds) {
                var categories = [];
                angular.forEach(classifieds, function (item) {
                    angular.forEach(item.categories, function (category) {
                        categories.push(category);
                    });
                });

                return _.uniq(categories);
            }
        });
})();