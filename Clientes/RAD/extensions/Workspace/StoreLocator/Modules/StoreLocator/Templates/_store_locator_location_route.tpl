<section>
    <div class="store-directions-section">
        <h4>
            <span>{{translate 'DIRECTIONS'}}</span>
        </h4>
        <div class="buttons-container">
            <button type="button" data-mode="DRIVING" class="travelMode {{#if isDRIVING}} active {{/if}}" data-action="changeTravelMode"><i
                    class="driving-icon"></i>
            </button>
            <button type="button" data-mode="WALKING" class="travelMode {{#if isWALKING}} active {{/if}}" data-action="changeTravelMode"><i
                    class="walking-icon"></i>
            </button>
            <button type="button" data-mode="BICYCLING" class="travelMode {{#if isBICYCLING}} active {{/if}}" data-action="changeTravelMode"><i
                    class="bicycling-icon"></i>
            </button>
            <button type="button" data-mode="TRANSIT" class="travelMode {{#if isTRANSIT}} active {{/if}}" data-action="changeTravelMode"><i
                    class="transit-icon"></i>
            </button>
        </div>
        <form action="">
            <div class="login-register-register-form-controls-group" data-validation="control-group">
                <label for="route-from">{{translate 'From'}}:</label>
                <div class="login-register-register-form-controls" data-validation="control">
                    <input type="text" name="route-from" id="route-from" data-type="autocomplete-input-route" class="login-register-register-form-input" placeholder="Enter a location">
                </div>
            </div>
            <div class="control-group">
                <button class="getRoute button-small button-cuaternary" type="submit" data-action="getRoute">{{translate 'Go'}}</button>
                <button class="button-small button-primary" type="button" data-action="getCurrentLocation">{{translate 'Use Current Location'}}</button>
            </div>
        </form>
    </div>
    <div class="store-bottom-links">
        <a data-touchpoint="{{touchpoint}}" data-hashtag="storelist" href="storelist">{{translate 'Back to list of stores'}}</a>
        <button type="button" data-action="print">{{translate 'Print directions'}}</button>
    </div>


</section>
