/** @type {string} */
const template = `
<label for="products-sort-value">Sort by: </label>
<select name="products-sort-value" 
    ng-options="option for option in $ctrl.getSortOptions()"
    ng-model="$ctrl.sortOption"
    ng-change="$ctrl.updateSortOption()"></select>
<div class="products">
    <div class="product-group"
        ng-repeat="productGroup in $ctrl.getProductGroups()">
        <product ng-repeat="product in productGroup.getAllProducts()"
            product="product">
        </product>
        <advertisement advertisement="productGroup.getAdvertisement()"
            ng-if="productGroup.getAllProducts().length >= 20">
        </advertisement>
    </div>
</div>
<progress-indicator
    ng-if="!$ctrl.hasLoadedLastValue()"
    on-visibility-change="$ctrl.setProgressIndicatorVisibility.bind($ctrl)">
</progress-indicator>
<div class="products-end-of-catalogue" ng-if="$ctrl.hasLoadedLastValue()">
    ~ end of catalogue ~
</div>
`;

export default template;
