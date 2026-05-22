/*
	© 2024 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="PaymentWizard.Module.PaymentMethod.ACH"/>

import { OrderWizardModulePaymentMethodACH } from '../../OrderWizard.Module.PaymentMethod/JavaScript/OrderWizard.Module.PaymentMethod.ACH';
import { Configuration } from '../../SCA/JavaScript/Configuration';

export class PaymentWizardModulePaymentMethodACH extends OrderWizardModulePaymentMethodACH {
    public isActive(): boolean {
        const isAchEnabledInPayment = Configuration.get('paymentInstrumentACHEnabled');

        return this.checkCommonIsActiveConditions() && isAchEnabledInPayment;
    }
}
