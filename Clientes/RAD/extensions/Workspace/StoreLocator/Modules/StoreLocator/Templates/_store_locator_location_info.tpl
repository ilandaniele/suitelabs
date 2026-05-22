<section>
    <div>
        <h3 class="store-title">{{ model.name }}</h3>
    </div>
    <div class="store-address-section">
        <div>
            <h4>{{translate 'STORE ADDRESS'}}</h4>
        </div>
        <div>
            {{model.address1}}
        </div>
        <div>
            {{model.address2}}
        </div>
        <div>
            {{model.city}}, {{ model.state }}, {{ model.zip }}
        </div>
        <div>
            <span>{{ model.country }}</span>
        </div>
    </div>
    <div class="store-phone-section">
        <div>
            <h4>{{translate 'PHONE'}}</h4>
        </div>
        <div>
            {{model.phone}}
        </div>
    </div>
    <div class="store-opening-section">
        <div>
            <h4>{{translate 'OPENING TIMES'}}</h4>
        </div>
        <div>
            {{{ model.openHours }}}
        </div>
    </div>
</section>
