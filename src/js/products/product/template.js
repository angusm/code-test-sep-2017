const template = `
<div class="product">
    <div class="product__face"
        ng-style="$ctrl.getFaceStyle()"
        ng-bind="$ctrl.getFace()"></div>
    <div class="product__size">
        <span class="product__label">Size:</span>
        <span ng-bind="$ctrl.getSize()"></span>
    </div>
    <div class="product__price">
        <span class="product__label">Price:</span>
        <span ng-bind="$ctrl.getPrice()"></span>
    </div>
    <div class="product__date">
        <span class="product__label">Date:</span>
        <span ng-bind="$ctrl.getDate()"></span>
    </div>
</div>
`;

export default template;
