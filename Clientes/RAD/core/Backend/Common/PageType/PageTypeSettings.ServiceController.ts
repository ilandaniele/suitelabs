/**

	© 2024 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.


 * @NApiVersion 2.x
 * @NModuleScope TargetAccount
 */

import { PageTypeSettingsHandler, PageTypeSettingsHandlerParams } from './PageTypeSettings.Handler';
import { PageTypeSettings } from '../../../ServiceContract/Common/PageType/PageType';
import { HttpResponse } from '../../Common/Controller/HttpResponse';
import { ServiceContext, ServiceController } from '../../Common/Controller/ServiceController';
import { notFoundError, forbiddenError } from '../../Common/Controller/RequestErrors';

class PageTypeSettingsServiceController extends ServiceController {
    public readonly name = 'PageTypeSettings.ServiceController2';

    private PageTypeSettingsHandler: PageTypeSettingsHandler = new PageTypeSettingsHandler();

    public getById(
        id: string,
        params: PageTypeSettingsHandlerParams
    ): HttpResponse<PageTypeSettings> {
        if (!this.PageTypeSettingsHandler.isCustomRecordValid(params.recname)) {
            throw forbiddenError;
        }
        const record: PageTypeSettings = this.PageTypeSettingsHandler.get(id, params);
        if (!record) {
            throw notFoundError;
        }
        return new HttpResponse(record);
    }
}

export = {
    service: function(ctx: ServiceContext): void {
        new PageTypeSettingsServiceController(ctx).initialize();
    }
};