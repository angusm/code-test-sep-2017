/** @type {string} */
const template = `
<div class="progress-indicator" ng-if="$ctrl.isLoading()">
    <div class="progress-indicator__spinner"></div>
    <div>Loading...</div>
</div>
`;

export default template;
