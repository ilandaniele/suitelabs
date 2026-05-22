<form novalidate>
  <fieldset>
    <div class="stocknotifications-subscribe-control-wrapper" data-validation="control-group">
    {{#if showSubscribeToAll }}
    <div>
        <label for="subscribeToAll">
            <input
                    id="subscribeToAll"
                    data-action="stocknotifications-subscribeToAll"
                    class="input-checkbox"
                    type="checkbox"
                    name="subscribeToAll"
                    {{#if subscribeToAll}}
                    checked
                    {{/if}}
            >{{subscribeToAllLabel}}
        </label>
    </div>
    {{/if}}
      <label for="firstname" class="stocknotifications-subscribe-label">
          {{translate nameLabel}}
          {{#if mandatoryName}}
            <small class="stocknotifications-subscribe-required"> {{translate '(required)'}}</small>
          {{/if}}
      </label>
      <input
        id="firstname"
        class="stocknotifications-subscribe-input"
        type="text"
        name="firstname"
        value="{{firstname}}"
        placeholder="{{translate namePlaceholder}}"
        data-validation="control">
      <!--label for="lastname" class="stocknotifications-subscribe-label">
        {{translate lastNameLabel}}
        {{#if mandatoryLastName}}
          <small class="stocknotifications-subscribe-required"> {{translate '(required)'}}</small>
        {{/if}}
      </label-->
      <input
        id="lastname"
        class="stocknotifications-subscribe-input"
        type="text"
        name="lastname"
        value="{{lastname}}"
        placeholder="{{translate lastNamePlaceholder}}"
        data-validation="control">
    </div>
    <div class="stocknotifications-subscribe-control-wrapper" data-validation="control-group">
      <label for="bis-email" class="stocknotifications-subscribe-label" >
        {{translate emailLabel}}
        <small class="stocknotifications-subscribe-required">{{translate '(required)'}}</small>
      </label>
      <input
        id="bis-email"
        class="stocknotifications-subscribe-input"
        type="email"
        name="email"
        value="{{email}}"
        placeholder="{{translate emailPlaceholder}}"
        data-validation="control">
    </div>
    <input
      id="item"
      type="hidden"
      name="item"
      value="{{selectedProduct}}">
    <input
      id="matrix-parent-id"
      type="hidden"
      name="matrixparent"
      value="{{matrixParentId}}">
    <input
      id="subscription-data-helper"
      type="hidden"
      name="datahelper"
      value="{{subscriptionDataHelper}}">
    <!--div>
      <label for="subscribeToMails">
        <input
          id="subscribeToMails"
          class="input-checkbox"
          data-action="stocknotifications-subscribeToMails"
          type="checkbox"
          name="subscribeToMails"
          checked>{{translate agreementLabel}}
      </label>
    </div-->
    <button type="submit" class="stocknotifications-subscribe-submit-button-custom">
      {{translate 'NOTIFY ME!'}}
    </button>
    <div
      class="stocknotifications-subscribe-message stocknotifications-subscribe-message-success"
      data-confirm-bin-message=""
    ></div>
  </fieldset>
</form>
