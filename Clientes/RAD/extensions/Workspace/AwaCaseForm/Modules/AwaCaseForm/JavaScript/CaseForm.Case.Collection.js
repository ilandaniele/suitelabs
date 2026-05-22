define('CaseForm.Case.Collection', [
    'underscore',
    'Case.Collection',
    'Utils'
], function CaseFormCaseCollection(
    _,
    CaseCollection,
    Utils
) {
    'use strict';

    _.extend(CaseCollection.CaseCollection.prototype, {
        sync: _.wrap(CaseCollection.CaseCollection.prototype.sync, function sync(fn) {
            var original = _.toArray(arguments).slice(1);
            original[1].url = Utils.getAbsoluteUrl(getExtensionAssetsPath('services/CaseForm.Case.Service.ss'));
            return fn.apply(this, original);
        })
    });
});
