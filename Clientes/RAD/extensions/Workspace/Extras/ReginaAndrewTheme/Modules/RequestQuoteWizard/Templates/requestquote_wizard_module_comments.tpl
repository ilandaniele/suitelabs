{{#unless hideContent}}
	<div class="requestquote-wizard-module-comments">
		<div class="requestquote-wizard-module-comments-box">
            <div class="requestquote-wizard-module-comments-title">
                <p>

                        <strong>{{translate 'Note:'}}</strong> {{translate 'You are about to Submit a Quote.'}}<br>
                    {{translate 'Once that happens, the Quote cannot be Edited or Changed without your Salesperson or Customer Care Representative.'}}

                </p>
            </div>
			{{#if isReadOnly}}
				<div class="requestquote-wizard-module-comments-box-message">
					<p>{{breaklines memo}}</p>
				</div>
			{{else}}
				<p>
					<label>{{translate 'Do you have any remarks or comments with this quote request?'}}</label>
					<span>{{translate ' (Optional)'}}</span>
				</p>
				<textarea data-action="validate-textarea-length" maxlength="{{maxLength}}" data-type="memo-input" class="requestquote-wizard-module-comments-box-textarea">{{memo}}</textarea>
				<small class="requestquote-wizard-module-comments-box-textarea-length">{{translate 'Maximum 999 characters.'}}</small>
			{{/if}}
		</div>
	</div>
{{/unless}}



{{!----
Use the following context variables when customizing this template:

	showTitle (Boolean)
	title (String)
	memo (String)
	isReadOnly (Boolean)
	maxLength (Number)

----}}
