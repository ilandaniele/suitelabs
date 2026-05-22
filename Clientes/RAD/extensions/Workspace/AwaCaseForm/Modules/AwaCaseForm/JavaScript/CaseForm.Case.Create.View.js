define('CaseForm.Case.Create.View', [
    'Case.Create.View',
    'SC.Configuration',
    'FileUpload.File.View',
    'jQuery',
    'underscore'
], function CaseFormCaseCreateView(
    CaseCreateView,
    Configuration,
    FileUploadFileView,
    jQuery,
    _
) {
    'use strict';

    _.extend(CaseCreateView.CaseCreateView.prototype, {
        getEvents: _.wrap(CaseCreateView.CaseCreateView.prototype.getEvents, function getEvents(fn) {
            var originalReturn = fn.apply(this, _.toArray(arguments).slice(1));
            originalReturn['change [data-action="change-category"]'] = 'changeCategory';
            return originalReturn;
        }),
        getChildViews: function getChildViews() {
            return {
                'FileUpload.View': function childViewImageUpload() {
                    return new FileUploadFileView({
                        application: this.application,
                        model: this.formModel
                    });
                }
            };
        },
        changeCategory: function changeCategory(e) {
            var type;
            this.typesOfInquiries = Configuration.get('cases.uploadFileTypesOfInquiries') || [];
            type = _.findWhere(this.typesOfInquiries, { id: jQuery(e.target).val() });
            if (type) {
                this.$('#file_upload').removeClass('hidden', type);
            } else {
                this.$('#file_upload').addClass('hidden', type);
            }
        }
    });
});
