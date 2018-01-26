/**
 * @ngdoc directive
 * @name ng.directive:adminNgEditableSingleSelect
 *
 * @description
 * Upon click on its label, this directive will display an <select> field
 * which will be transformed back into a label on blur.
 *
 * @element field
 * The "params" attribute contains an object with the attributes `id`,
 * `required` and `value`.
 * The "collection" attribute contains a hash of objects (or a promise thereof)
 * which maps values to their labels.
 * The "save" attribute is a reference to a save function used to persist
 * the value.
 *
 * @example
   <doc:example>
     <doc:source>
      <div admin-ng-editable-single-select params="params" save="save" collection="collection"></div>
     </doc:source>
   </doc:example>
 */
angular.module('adminNg.directives')
.directive('adminNgEditableSingleSelect', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        templateUrl: 'shared/partials/editableSingleSelect.html',
        replace: true,
        scope: {
            params:     '=',
            collection: '=',
            ordered:    '=',
            save:       '='
        },
        link: function (scope, element) {

            var mapToArray = function (map) {
                var array = [];

                angular.forEach(map, function (mapValue, mapKey) {

                    array.push({
                        label: mapKey,
                        value: mapValue
                    });
                });

                return array;
            }

            var mapToArrayOrdered = function (map) {
                var array = [];

                angular.forEach(map, function (mapValue, mapKey) {
                    var entry = JSON.parse(mapKey);
                    if (entry.selectable || scope.params.value === mapValue) {
                        array.push({
                            label: entry,
                            value: mapValue
                        });
                    }
                });
                array.sort(function(a, b) {
                    return a.label.order - b.label.order;
                });
                return array.map(function (entry) {
                    return {
                        label: entry.label.label,
                        value: entry.value
                    };
                });
            }


            //transform map to array so that orderBy can be used
            scope.collection = scope.ordered ? mapToArrayOrdered(scope.collection) : mapToArray(scope.collection);

            scope.submit = function () {
                // Wait until the change of the value propagated to the parent's
                // metadata object.
                scope.submitTimer = $timeout(function () {
                    scope.save(scope.params.id);
                });
                scope.editMode = false;
            };

            scope.getLabel = function (searchedValue) {
                var label;

                angular.forEach(scope.collection, function (obj) {
                    if (obj.value === searchedValue) {
                        label = obj.label;
                    }
                });

                return label;
            };

            scope.$on('$destroy', function () {
                $timeout.cancel(scope.submitTimer);
            });

            scope.enterEditMode = function () {
                // Store the original value for later comparision or undo
                if (!angular.isDefined(scope.original)) {
                    scope.original = scope.params.value;
                }
                scope.editMode = true;
                scope.focusTimer = $timeout(function () {
                  if ($('[chosen]')) {
                    element.find('select').trigger('chosen:activate');
                  }
                });
            };

            scope.leaveEditMode = function () {
                // does not work currently, as angular chose does not support ng-blur yet. But it does not break anything
                scope.editMode = false;
            };
       }
    };
}]);
