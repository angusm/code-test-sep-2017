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
        <product-inline-advertisement
            advertisement="productGroup.getAdvertisement()"
            ng-if="productGroup.getAllProducts().length >= 20">
        </product-inline-advertisement>
    </div>
</div>
<progress-indicator on-visibility-change="$ctrl.setProgressIndicatorVisibility.bind($ctrl)">
</progress-indicator>
`;

export default template;
