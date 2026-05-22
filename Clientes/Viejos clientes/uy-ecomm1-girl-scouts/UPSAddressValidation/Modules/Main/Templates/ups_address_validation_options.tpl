<div class="ups-valid-addresses">
    <h4>{{translate 'You entered:'}}</h4>
    <p class="entered-address">{{currentAdd1}} {{currentAdd2}}, {{currentCity}}, {{currentState}} {{currentZipcode}}.</p>
    <p class="mismatch-message">{{translate 'Several addresses matched the information you provided, make sure that the address you are entering is the correct, you can choice one of the following options to fix it, or you can <a data-dismiss="modal">dismiss</a> this message if you are sure the address is correct.'}}</p>
    <table class="ups-valid-addresses-options-table">
        <tbody>
        {{#each validAddresses}}
            <tr class="recordviews-row" data-action="navigate" data-city="{{city}}" data-state="{{state}}" data-zipcode="{{zipcode}}" data-addr1="{{addr1}}" data-addr2="{{addr2}}">
                <td class="recordviews-title" data-name="title">
                    <span class="recordviews-title-value">
                        <a class="recordviews-title-anchor" href="#">
                            <p>{{addr1}} {{addr2}}, {{city}}, {{state}} {{zipcode}}.</p>
                        </a>
                    </span>
                </td>
            </tr>
        {{/each}}
        </tbody>
    </table>
</div>