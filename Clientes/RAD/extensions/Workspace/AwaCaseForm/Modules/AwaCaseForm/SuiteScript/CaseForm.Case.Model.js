define('CaseForm.Case.Model', [
    'SC.Model',
    'Application',
    'Utils',
    'underscore',
    'Configuration'
], function CaseFormCaseModel(
    SCModel,
    Application,
    Utils,
    _,
    Configuration
) {
    'use strict';

    return SCModel.extend({
        name: 'Case',
        configuration: Configuration.get('cases'),
        dummy_date: new Date(),

        getNew: function getNew() {
            var caseRecord = nlapiCreateRecord('supportcase');
            var categoryField = caseRecord.getField('category');
            var categoryOptions = categoryField.getSelectOptions();
            var categoryOptionValues = [];

            var originField;
            var originOptions;
            var originOptionValues;

            var statusField;
            var statusOptions;
            var statusOptionValues;

            var priorityField;
            var priorityOptions;
            var priorityOptionValues;

            var newRecord;


            _(categoryOptions).each(function each(categoryOption) {
                var categoryOptionValue = {
                    id: categoryOption.id,
                    text: categoryOption.text
                };

                categoryOptionValues.push(categoryOptionValue);
            });
            originField = caseRecord.getField('origin');
            originOptions = originField.getSelectOptions();
            originOptionValues = [];
            _(originOptions).each(function each(originOption) {
                var originOptionValue = {
                    id: originOption.id,
                    text: originOption.text
                };

                originOptionValues.push(originOptionValue);
            });

            statusField = caseRecord.getField('status');
            statusOptions = statusField.getSelectOptions();
            statusOptionValues = [];
            _(statusOptions).each(function eachFn(statusOption) {
                var statusOptionValue = {
                    id: statusOption.id,
                    text: statusOption.text
                };
                statusOptionValues.push(statusOptionValue);
            });
            priorityField = caseRecord.getField('priority');
            priorityOptions = priorityField.getSelectOptions();
            priorityOptionValues = [];

            _(priorityOptions).each(function eachPriorityOptions(priorityOption) {
                var priorityOptionValue = {
                    id: priorityOption.id,
                    text: priorityOption.text
                };
                priorityOptionValues.push(priorityOptionValue);
            });
            newRecord = {
                categories: categoryOptionValues,
                origins: originOptionValues,
                statuses: statusOptionValues,
                priorities: priorityOptionValues
            };
            return newRecord;
        },

        getColumnsArray: function getColumnsArray() {
            return [
                new nlobjSearchColumn('internalid'),
                new nlobjSearchColumn('casenumber'),
                new nlobjSearchColumn('title'),
                new nlobjSearchColumn('status'),
                new nlobjSearchColumn('origin'),
                new nlobjSearchColumn('category'),
                new nlobjSearchColumn('company'),
                new nlobjSearchColumn('createddate'),
                new nlobjSearchColumn('lastmessagedate'),
                new nlobjSearchColumn('priority'),
                new nlobjSearchColumn('email')
            ];
        },

        get: function get(id) {
            var filters = [
                new nlobjSearchFilter('internalid', null, 'is', id),
                new nlobjSearchFilter('isinactive', null, 'is', 'F')
            ];
            var columns = this.getColumnsArray();
            var result = this.searchHelper(filters, columns, 1, true);

            if (result.records.length >= 1) {
                return result.records[0];
            }

            throw notFoundError;
        },

        search: function search(customerId, listHeaderData) {
            var filters = [
                new nlobjSearchFilter('isinactive', null, 'is', 'F'),
                new nlobjSearchFilter('internalidnumber', 'company', 'equalto', customerId)
            ];
            var columns = this.getColumnsArray();
            var selectedFilter = parseInt(listHeaderData.filter, 10);

            if (!_.isNaN(selectedFilter)) {
                filters.push(new nlobjSearchFilter('status', null, 'anyof', selectedFilter));
            }
            this.setSortOrder(listHeaderData.sort, listHeaderData.order, columns);
            return this.searchHelper(filters, columns, listHeaderData.page, false);
        },

        searchHelper: function searchHelper(filters, columns, page, joinMessages) {
            var self = this;
            var result = Application.getPaginatedSearchResults({
                record_type: 'supportcase',
                filters: filters,
                columns: columns,
                page: page
            });
            result.records = _.map(result.records, function map(caseRecord) {
                var currentRecordId = caseRecord.getId();
                var createdDate = nlapiStringToDate(caseRecord.getValue('createddate'));
                var lastMessageDate = nlapiStringToDate(caseRecord.getValue('lastmessagedate'));
                var supportCase = {
                    internalid: currentRecordId,
                    caseNumber: caseRecord.getValue('casenumber'),
                    title: caseRecord.getValue('title'),
                    grouped_messages: [],
                    status: {
                        id: caseRecord.getValue('status'),
                        name: caseRecord.getText('status')
                    },
                    origin: {
                        id: caseRecord.getValue('origin'),
                        name: caseRecord.getText('origin')
                    },
                    category: {
                        id: caseRecord.getValue('category'),
                        name: caseRecord.getText('category')
                    },
                    company: {
                        id: caseRecord.getValue('company'),
                        name: caseRecord.getText('company')
                    },
                    priority: {
                        id: caseRecord.getValue('priority'),
                        name: caseRecord.getText('priority')
                    },
                    createdDate: nlapiDateToString(createdDate || self.dummy_date, 'date'),
                    lastMessageDate: nlapiDateToString(lastMessageDate || self.dummy_date, 'date'),
                    email: caseRecord.getValue('email')
                };

                if (joinMessages) {
                    self.appendMessagesToCase(supportCase);
                }

                return supportCase;
            });
            return result;
        },
        stripHtmlFromMessage: function stripHtmlFromMessage(message) {
            return message.replace(/<br\s*[\/]?>/gi, '\n').replace(/<(?:.|\n)*?>/gm, '');
        },
        appendMessagesToCase: function appendMessagesToCase(supportCase) {
            var messageColumns = {
                message_col: new nlobjSearchColumn('message', 'messages'),
                message_date_col: new nlobjSearchColumn('messagedate', 'messages').setSort(true),
                author_col: new nlobjSearchColumn('author', 'messages'),
                message_id: new nlobjSearchColumn('internalid', 'messages')
            };
            var messageFilters = [
                new nlobjSearchFilter('internalid', null, 'is', supportCase.internalid),
                new nlobjSearchFilter('internalonly', 'messages', 'is', 'F')
            ];
            var messageRecords = Application.getAllSearchResults('supportcase', messageFilters, _.values(messageColumns));
            var groupedMessages = [];
            var messagesCount = 0;
            var self = this;

            _(messageRecords).each(function each(messageRecord) {
                var customerId = nlapiGetUser();
                var messageDateTmp = nlapiStringToDate(messageRecord.getValue('messagedate', 'messages'));
                var messageDate = messageDateTmp || self.dummy_date;
                var messageDateToGroupBy = messageDate.getFullYear() + '-' + (messageDate.getMonth() + 1) + '-' + messageDate.getDate();
                var message = {
                    author: messageRecord.getValue('author', 'messages') === customerId ? 'You' : messageRecord.getText('author', 'messages'),
                    text: self.stripHtmlFromMessage(messageRecord.getValue('message', 'messages')),
                    messageDate: nlapiDateToString(messageDate, 'timeofday'),
                    internalid: messageRecord.getValue('internalid', 'messages'),
                    initialMessage: false
                };

                if (groupedMessages[messageDateToGroupBy]) {
                    groupedMessages[messageDateToGroupBy].messages.push(message);
                } else {
                    groupedMessages[messageDateToGroupBy] = {
                        date: self.getMessageDate(messageDate),
                        messages: [message]
                    };
                }

                messagesCount++;

                if (messagesCount === messageRecords.length) {
                    message.initialMessage = true;
                }
            });

            supportCase.groupedMessages = _(groupedMessages).values();
            supportCase.messagesCount = messagesCount;
        },
        getMessageDate: function getMessageDate(validJsDate) {
            var today = new Date();
            var todayDd = today.getDate();
            var todayMm = today.getMonth();
            var todayYyyy = today.getFullYear();
            var dd = validJsDate.getDate();
            var mm = validJsDate.getMonth();
            var yyyy = validJsDate.getFullYear();

            if (todayDd === dd && todayMm === mm && todayYyyy === yyyy) {
                return 'Today';
            }
            return nlapiDateToString(validJsDate, 'date');
        },
        create: function create(customerIdAux, dataAux) {
            var newCaseRecord = nlapiCreateRecord('supportcase');
            var customerId = customerIdAux || nlapiGetUser();
            var data = dataAux;
            var defaultValues;
            var caseId;
            if (data.title) {
                newCaseRecord.setFieldValue('title', Utils.sanitizeString(data.title));
            }
            if (data.message) {
                newCaseRecord.setFieldValue('incomingmessage', Utils.sanitizeString(data.message));
            }
            if (data.category) {
                newCaseRecord.setFieldValue('category', data.category);
            }
            if (data.email) {
                newCaseRecord.setFieldValue('email', data.email);
            }
            if (customerId) {
                newCaseRecord.setFieldValue('company', customerId);
            }
            defaultValues = this.configuration.defaultValues;
            newCaseRecord.setFieldValue('status', defaultValues.statusStart.id); // Not Started
            newCaseRecord.setFieldValue('origin', defaultValues.origin.id); // Web
            caseId = nlapiSubmitRecord(newCaseRecord);
            if (data.files && data.files.length) {
                this.setFilesField(data.files, caseId);
            }
            return caseId;
        },
        setFilesField: function setFilesField(files, recordId) {
            var i;
            for (i = 0; i < files.length; i++) {
                if (files[i] && files[i].internalid) {
                    try {
                        nlapiAttachRecord('file', files[i].internalid, 'supportcase', recordId, null);
                    } catch (e) {
                        nlapiLogExecution('DEBUG', 'Error attachRecord files in case ' + recordId, JSON.stringify(e));
                    }
                }
            }
        },
        setSortOrder: function setSortOrder(sort, order, columns) {
            switch (sort) {
            case 'createdDate':
                columns[7].setSort(order > 0);
                break;

            case 'lastMessageDate':
                columns[8].setSort(order > 0);
                break;

            default:
                columns[1].setSort(order > 0);
            }
        },
        update: function update(id, data) {
            if (data && data.status) {
                if (data.reply && data.reply.length > 0) {
                    nlapiSubmitField('supportcase', id, ['incomingmessage', 'messagenew', 'status'], [Utils.sanitizeString(data.reply), 'T', data.status.id]);
                } else {
                    nlapiSubmitField('supportcase', id, ['status'], data.status.id);
                }
            }
        }
    });
});
