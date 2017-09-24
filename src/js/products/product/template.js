const template = `
<div class="product">
    <div class="product__face"
        ng-style="$ctrl.getProduct().getFaceStyle()"
        ng-bind="$ctrl.getProduct().getFace()"></div>
    <div class="product__size">
        <span class="product__label">Size:</span>
        <span ng-bind="$ctrl.getProduct().getSize()"></span>
    </div>
    <div class="product__price">
        <span class="product__label">Price:</span>
        <span ng-bind="$ctrl.getProduct().getPriceInDollars()"></span>
    </div>
    <div class="product__date">
        <span class="product__label">Date:</span>
        <span ng-bind="$ctrl.getProduct().getDisplayDate()"></span>
    </div>
    <div class="product__id">
        <span class="product__label">ID:</span>
        <span ng-bind="$ctrl.getProduct().getId()"></span>
    </div>
</div>
`;

export default template;
