<{{tag}} class="order-wizard-title" {{attributes}}>
	{{title}} {{#ifCond title '!=' 'Comments'}}<span class="case-new-form-required hide">*</span>{{/ifCond}}
</{{tag}}>
{{#if showDetails}}
	<p>
		{{details}}
	</p>
{{/if}}



{{!----
Use the following context variables when customizing this template: 
	
	tag (String)
	attributes (String)
	details (String)
	title (String)
	showDetails (Boolean)

----}}
