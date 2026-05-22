define('Profile.Model.HidePrices', [
    'Profile.Model',
    'underscore'
], function ProfileModelHidePrices(
    ProfileModel,
    _
) {
    _.extend(ProfileModel.prototype, {
        hidePrices: _.wrap(ProfileModel.prototype.hidePrices, function hidePrices(fn) {
            var ret = fn.apply(this, _.toArray(arguments).slice(1));
            var customfields = this.get('customfields');
            var pricingDisabled = customfields && _.findWhere(customfields, {
                name: 'custentity_pricing_disabled'
            });
            var disabled = pricingDisabled && pricingDisabled.value === 'T';

            return disabled || ret;
        })
    });
});
