
<div class="ManagePriceDiv" >
    <h3>{{translate 'My Settings'}}</h3>

    <fieldset class="profile-price-privileges" data-role="controlgroup" data-type="horizontal">
        <div class="profile-price-settings-controls-group" data-validation="control-group">
            <label class="profile-price-settings-form-label" for="agent-register-custApprov">
                {{translate 'View Pricing'}}
            </label>
            <label class='profile-price-settings-state-text'>
                {{translate 'On'}}
            </label>
            <label class="switch">
                <input type="checkbox" {{#if priceDisabled}} checked {{/if}} data-action="disablePrice">
                <div class="slider round"></div>
            </label>
            <label class='profile-price-settings-state-text'>
                {{translate 'Off'}}
            </label>
        </div>
        <div class="profile-price-settings-controls-group" data-validation="control-group">
            <label class="profile-price-settings-form-label" for="agent-register-allow-checkout">
                {{translate 'Price Settings'}}
            </label>
            <label class='profile-price-settings-state-text'>
                {{translate 'Regular'}}
            </label>
            <label class="switch">
                <input type="checkbox" {{#if useRetailPriceEnabled}} checked {{/if}} data-action="disableRetailPrice">
                <div class="slider round"></div>
            </label>
            <label class='profile-price-settings-state-text'>
                {{translate 'Retail'}}
            </label>
        </div>

    </fieldset>
</div>
