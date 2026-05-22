{{#if showTracking }}
    <div class="order-history-list-tracking-number-control">
        <button class="order-history-list-tracking-number-control-button" data-toggle="dropdown">
            {{translate 'Track Packages'}}
            <i class="order-history-list-tracking-number-control-toggle-icon"></i>
        </button>
        <div class="order-history-list-tracking-number-control-numbers collapsed">
            <ul>
                {{#each trackingNumbers}}
                    <li>
                        <a target="_blank" class="order-history-list-tracking-number-control-numbers-link" data-action="tracking-number" href="{{trackingNumber.value}}">{{translate 'Track Shipment' }}</a>
                    </li>
                {{/each}}
            </ul>
        </div>
    </div>
{{/if}}
