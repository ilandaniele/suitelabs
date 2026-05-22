define('CaseForm.Case.Model', [
    'underscore',
    'Case.Model',
    'Case.Fields.Model',
    'Utils'
], function CaseFormCaseModel(
    _,
    CaseModel,
    CaseFieldsModel,
    Utils
) {
    'use strict';

    _.extend(CaseModel.CaseModel.prototype, {
        sync: _.wrap(CaseModel.CaseModel.prototype.sync, function sync(fn) {
            var original = _.toArray(arguments).slice(1);
            original[1].urlRoot = function urlRoot() { return Utils.getAbsoluteUrl(getExtensionAssetsPath('services/CaseForm.Case.Service.ss')); };
            return fn.apply(this, original);
        })
    });

    _.extend(CaseFieldsModel.CaseFieldsModel.prototype, {
        sync: _.wrap(CaseFieldsModel.CaseFieldsModel.prototype.sync, function sync(fn) {
            var original = _.toArray(arguments).slice(1);
            original[2].urlRoot = function urlRoot() { return Utils.getAbsoluteUrl(getExtensionAssetsPath('services/CaseForm.Case.Service.ss')); };
            return fn.apply(this, original);
        })
    });
});
