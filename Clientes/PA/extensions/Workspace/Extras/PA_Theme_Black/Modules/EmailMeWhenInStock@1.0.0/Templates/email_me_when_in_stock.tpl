{{#if isPLP}}
    <div class="email-when-in-stock-button-container">
        <span class="product-list-control-button-email-backinstock item-details-back-in-stock-button" onclick="window.open('{{redirect_url}}'); event.stopPropagation(); return false;" >
            <i class="icon-envelope"></i>  Email Me When In Stock
        </span>
    </div>
{{else}}
    <div class="email-when-in-stock-button-container">
        <button class="product-list-control-button-email-backinstock item-details-back-in-stock-button" data-action="email-backinstock" data-toggle="showFlyout" type="button">
            <i class="icon-envelope"></i> Email Me When In Stock
        </button>
    </div>

    <!-- Modal -->
    {{#if isPDP}}
        <div class="modal fade" id="emailModal" tabindex="-1" role="dialog" aria-labelledby="emailModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false" >
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <div class="row">
                <div class="col-sm-6">
                    <h4 class="modal-title" id="emailModalLabel">Email Me When In Stock</h4>
                </div>
                <div class="col-sm-6" style="text-align: right;">
                    <button type="button" class="global-views-modal-content-header-close" data-dismiss="modal" aria-hidden="true" aria-label="Close"> &#10005; </button>
                </div>
                </div>
            </div>
            <div class="modal-body">
                <div class="email-message" id="email-message"></div>
                <div class="email-form form-group" id="email-form">
                <label for="email-input">Enter your email address:</label>
                <input type="email" class="email-input" id="email-input" name="email">
                <p class="receive-offers">
                    <input class="bis-mailing-list-check" id="bis-mailing-list-check" type="checkbox" checked>
                    <span>Yes, I would like to receive special offers, and to hear about new products and brands.</span>
                <p>
                    {{!-- <button data-type="" data-action="send-email" class="item-details-send-button email-send" id="email-send">Send</button> --}}
                    <button data-type="" data-action="send-email" class="btn btn-primary email-send-btn" id="email-send">Send</button>
                    <img class="email-sign-up-direct-add" src="" width="0" height="0" border="0" alt="" style="display: none"/>
                </div>
            </div>
            <div class="modal-footer"> </div>
            </div>
        </div>
        </div>
    {{/if}}
    {{#if isQuickView}}
        <div class="email-form-quick-view" style="display:none">
            <div class="email-message" id="email-message"></div>
            <div class="email-form">
                <div class="form-group">
                    <label for="email">Email address:</label>
                    <input type="email" class="form-control" id="email">
                </div>
                <p class="receive-offers">
                    <input class="bis-mailing-list-check" id="bis-mailing-list-check" type="checkbox" checked>
                    <span>Yes, I would like to receive special offers, and to hear about new products and brands.</span>
                </p>
                <button data-type="" data-action="send-email" class="btn btn-primary email-send-btn" data-item="{{model.item.internalid}}" id="email-send">Send</button>
            </div>
        </div>
    {{/if}}
{{/if}}
