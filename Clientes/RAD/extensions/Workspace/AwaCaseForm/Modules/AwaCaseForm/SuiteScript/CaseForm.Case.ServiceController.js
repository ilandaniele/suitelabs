define('CaseForm.Case.ServiceController', [
    'ServiceController',
    'CaseForm.Case.Model'
], function MessagesCenterCaseServiceController(
    ServiceController,
    CaseModel
) {
    'use strict';

    return ServiceController.extend({
        name: 'Case.ServiceController',
        options: {
            common: {
                requireLogin: true,
                requirePermissions: {
                    list: [
                        'lists.listCase.1'
                    ]
                }
            }
        },
        get: function get() {
            var listHeaderData;
            var id = this.request.getParameter('internalid') || this.data.internalid;
            if (id) {
                return CaseModel.get(id);
            }

            listHeaderData = {
                filter: this.request.getParameter('filter'),
                order: this.request.getParameter('order'),
                sort: this.request.getParameter('sort'),
                from: this.request.getParameter('from'),
                to: this.request.getParameter('to'),
                page: this.request.getParameter('page')
            };
            return CaseModel.search(nlapiGetUser(), listHeaderData);
        },
        post: function post() {
            var newCaseId = CaseModel.create(nlapiGetUser(), this.data);
            return CaseModel.get(newCaseId);
        },
        put: function put() {
            var id = this.request.getParameter('internalid') || this.data.internalid;
            CaseModel.update(id, this.data);
            return CaseModel.get(id);
        }
    });
}
);
