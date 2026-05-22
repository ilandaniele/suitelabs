<div class="modal-dialog global-views-modal {{modalDialogClass}}">
	<div class="global-views-modal-content">
		<!--Modal-Header -->
		<div id="modal-header" class="global-views-modal-content-header">
			<button type="button" class="global-views-modal-content-header-close" {{#unless closeAction}}data-dismiss="modal" aria-hidden="true"
				{{else}}data-action="{{closeAction}}"{{/unless}}>
				&times;
			</button>
			{{#if showPageHeader}}
				<h2 class="global-views-modal-content-header-title">
					{{pageHeader}}
				</h2>
			{{/if}}
		</div>
		<!--Modal-content -->
		<div id="modal-body" data-type="modal-body" class=" global-views-modal-content-body" data-view="Child.View">
		</div>
	</div>
</div>



{{!----
Use the following context variables when customizing this template:

	pageHeader (String)
	showPageHeader (Boolean)
	modalDialogClass (String)

----}}
