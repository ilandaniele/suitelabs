<div class="blue-label-content">
    {{#unless isQuickView}}
    <div class="blue-label-header">
        <div class="blue-label-title">
            <span class="blue-label-image approved"></span>
            <span class="blue-label-title-text">Program Approval Process</span>
        </div>
        {{#unless isQuickView}}
        <div class="add-to-cart-blue-label" data-view="AddToCart.BlueLabel"></div>
        {{/unless}}
    </div>
    {{/unless}}
    <!-- <div data-type="alert-placeholder" class="global-views-message global-views-message-error alert error-box" role="alert">
        <div>Please select below required options.</div>
        <button class="global-views-message-button" data-action="close-message" type="button">×</button>
    </div> -->
    <div class="blue-label-body">
        <ul>
            <li class="blue-label-input-wrappers">
                <input type="checkbox" name="texas_resident" id="texas_resident" data-option-id="custcol_glock_resident_of_texas" {{#ifEquals custcol_glock_resident_of_texas "T"}}checked{{/ifEquals}}>
                <label for="texas_resident"> <small>*</small> I am a resident of the State of Texas and I am willing to provide proof of residency in the form of valid, government issued identification.</label>
            </li>
            <li class="blue-label-input-wrappers">
                <input type="checkbox" name="not_more_than_one" id="not_more_than_one" data-option-id="custcol_not_more_than_one_purchase" {{#ifEquals custcol_not_more_than_one_purchase "T"}}checked{{/ifEquals}}>
                <label for="not_more_than_one"> <small>*</small> I have not purchased more than one (1) Glock Blue Label firearm during this calendar year from <strong style="color: black;"><u>any</u></strong> GLOCK Dealer.</label>
            </li>
            <li>
                <small>*</small> <b>I will provide valid proof that I meet one (1) or more of the following qualifications.</b> (Do <b>NOT</b> copy, scan or send copies of Federal Credentials. If you are using Federal Credentials or cannot, legally, submit copies of your credentials, please schedule your purchase to be picked up in our Storefront, or visit another GLOCK Blue Label dealer in your area.)
            </li>
            <li class="blue-label-input-wrappers width-half">
                <input type="radio" name="blue_label" value="sworn_law_enforcement_officer" id="sworn_law_enforcement_officer" data-option-id="custcol_sworn_law_enforcement_officer" {{#ifEquals custcol_sworn_law_enforcement_officer "T"}}checked{{/ifEquals}}>
                <label for="sworn_law_enforcement_officer"> A Sworn Law Enforcement officers with powers of arrest, including Federal, State, County &amp; City also includes retired L.E. officers with "retired" credentials <b>(LE Agency or Retired Picture ID front &amp; back. Do NOT reproduce Federal Credentials – View and Verify, ONLY.)</b></label>
            </li>
            <li class="blue-label-input-wrappers width-half">
                <input type="radio" name="blue_label" value="military_personnel" id="military_personnel" data-option-id="custcol_military_personnel" {{#ifEquals custcol_military_personnel "T"}}checked{{/ifEquals}}>
                <label for="military_personnel"> Military personnel including Reservists and National Guard with I.D also includes retired Military with "retired" credentials <b>(Military picture ID. Do NOT reproduce Federal Credentials – View and Verify, ONLY.)</b></label>
            </li>
            <li class="blue-label-input-wrappers width-half">
                <input type="radio" name="blue_label" value="corrections_officer" id="corrections_officer" data-option-id="custcol_corrections_officer" {{#ifEquals custcol_corrections_officer "T"}}checked{{/ifEquals}}>
                <label for="corrections_officer"> A Corrections Officer, including Parole and Probation Officers <b>(LE Agency Picture ID front and back. Do NOT reproduce Federal Credentials – View and Verify, ONLY.)</b></label>
            </li>
            <li class="blue-label-input-wrappers width-half">
                <input type="radio" name="blue_label" value="nationally_recognize_officer" id="nationally_recognize_officer" data-option-id="custcol_nationally_recognize_officer" {{#ifEquals custcol_nationally_recognize_officer "T"}}checked{{/ifEquals}}>
                <label for="nationally_recognize_officer"> A Nationally recognized Security Company Security Officer – <b>(Officer Purchase for fulltime armed guards with Picture ID.</b> State licenses, registrations, private investigators are not approved.<b>)</b></label>
            </li>
            <li class="blue-label-input-wrappers width-half">
                <input type="radio" name="blue_label" value="le_academy_cadets" id="le_academy_cadets" data-option-id="custcol_le_academy_cadets" {{#ifEquals custcol_le_academy_cadets "T"}}checked{{/ifEquals}}>
                <label for="le_academy_cadets"> A LE Academy Cadet with enrollment documentation from the Academy.</label>
            </li>
            <li class="blue-label-input-wrappers width-half">
                <input type="radio" name="blue_label" value="active_duty_firefighter" id="active_duty_firefighter" data-option-id="custcol_active_duty_firefighter" {{#ifEquals custcol_active_duty_firefighter "T"}}checked{{/ifEquals}}>
                <label for="active_duty_firefighter"> An Active Duty Firefighter with current Active Duty Department Credentials. <b>(FD Department Picture ID front and back. Do NOT reproduce Federal Credentials – View and Verify, ONLY.)</b></label>
            </li>
            <li class="blue-label-input-wrappers width-half">
                <input type="radio" name="blue_label" value="emt_employed" id="emt_employed" data-option-id="custcol_emt_employed" {{#ifEquals custcol_emt_employed "T"}}checked{{/ifEquals}}>
                <label for="emt_employed"> A Paramedic, Tactical EMT, or EMT employed by a fire department, law enforcement agency, or ambulance service, working in the field, and responding to emergency calls. <b>(Agency/Department/Company Picture ID front and back. Do NOT reproduce Federal Credentials - View and Verify, ONLY. Certifications alone do NOT qualify.)</b></label>
            </li>
            <li class="blue-label-input-wrappers width-half">
                <input type="radio" name="blue_label" value="honorably_discharged_vet" id="honorably_discharged_vet" data-option-id="custcol_honorably_discharged_vet" {{#ifEquals custcol_honorably_discharged_vet "T"}}checked{{/ifEquals}}>
                <label for="honorably_discharged_vet"> A Honorably Discharged Veteran <b>(DD214 and State of Texas Issued Identification.)</b></label>
            </li>
        </ul>
        {{#unless isQuickView}}
        <div class="add-to-cart-blue-label" data-view="AddToCart.BlueLabel"></div>
        {{/unless}}
    </div>
    <!-- {{#unless isQuickView}}
        <div class="modal-footer">
            <div class="add-to-cart-blue-label" data-view="AddToCart.BlueLabel"></div>
        </div>
    {{/unless}} -->
</div>