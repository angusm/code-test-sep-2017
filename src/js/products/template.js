const template = `
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
