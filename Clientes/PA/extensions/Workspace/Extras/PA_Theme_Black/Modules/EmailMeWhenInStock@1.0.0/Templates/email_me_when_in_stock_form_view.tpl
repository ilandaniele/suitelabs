<form class="email-when-instock-form" method="POST">
	<fieldset class="email-when-instock-fieldset">
		<div class="email-when-instock-controls-group text-center" data-validation="control-group">
			<label class="email-when-instock-label label-email" for="email-when-instock">
				{{translate 'Enter Your Email Address <small class="email-when-instock-required"></small>'}}
			</label>
			<div class="email-when-instock-controls" data-validation="control">
				<input {{#if hasAutoFocus}} autofocus {{/if}} type="email" name="email" id="email-when-instock" class="email-when-instock-input" placeholder="{{translate 'your@email.com'}}"/>
			</div>
		</div>

		<div class="email-when-instock-controls-group hidden" data-validation="control-group">
			<label class="email-when-instock-label" for="itemid-when-instock">
				{{translate 'Item ID'}}
			</label>
			<div class="email-when-instock-controls" data-validation="control">
				<input type="text" name="itemid" id="itemid-when-instock" class="itemid-when-instock-input" value="{{itemid}}"/>
			</div>
		</div>

		<div class="email-when-instock-controls-group text-center" data-validation="control-group">
			<label class="email-when-instock-label recieve-offers" for="recieve-offers">
				<input type="checkbox" name="recieve-offers" id="recieve-offers" class="email-when-instock-input" />
				{{translate 'Yes, I would like to receive special offers, and to hear about new products and brands.'}}
			</label>
		</div>

		<div class="email-when-instock-controls-group text-center" >
			<button type="submit" class="email-when-instock-submit" >
				{{translate 'Email Me When in Stock'}}
			</button>
		</div>
	</fieldset>
</form>
