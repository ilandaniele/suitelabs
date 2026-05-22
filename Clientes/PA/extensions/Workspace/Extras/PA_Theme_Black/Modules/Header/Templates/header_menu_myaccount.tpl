<div class="header-menu-myaccount-signout">
    <a class="header-menu-myaccount-anchor-account-overview desktop" tabindex="-1" href="?lang=en_US" data-touchpoint="customercenter" data-hashtag="#/overview" name="Overview">
        {{translate 'Account Overview'}}
    </a>
    {{#if showRequestAQuoteLink}}
        <a class="header-menu-myaccount-anchor-account-overview desktop" href="#" data-hashtag="#request-a-quote" data-touchpoint="customercenter" title="{{requestAQuoteLinkTitle}}">
            {{requestAQuoteLinkTitle}}
        </a>
    {{/if}}
    <a class="header-menu-myaccount-anchor-account-overview desktop" href="#" data-touchpoint="logout" name="signout">
        {{translate 'Log Out'}}
    </a>
    <!-- <a class="header-menu-myaccount-signout-link" href="#" data-touchpoint="logout" name="signout">
        <i class="header-menu-myaccount-signout-icon"></i>
        {{translate 'Sign Out'}}
    </a> -->
</div>
<a class="header-menu-myaccount-anchor collapsed" href="#" name="myaccount" data-toggle="collapse" data-target="#my-account-menus">
    {{translate 'My Account'}}
    <i class="header-menu-myaccount-menu-accordion-icon"></i>
</a>
<ul class="header-menu-myaccount" id="my-account-menus">
	{{!-- <li>
		<a href="#" class="header-menu-myaccount-back" data-action="pop-menu" name="back">
			<i class="header-menu-myaccount-pop-icon "></i>
			{{translate 'Back'}}
		</a>
	</li> --}}

    {{#each entries}}
    <li class="header-menu-myaccount-item-level2 {{name}}" {{#if permission}}data-permissions="{{permission}}"{{/if}} {{#if permissionOperator}}data-permissions-operator="{{permissionOperator}}"{{/if}}>
        {{#if url}}
        <a  class="header-menu-myaccount-anchor-level2" tabindex="-1" href="#" {{#if children.length}}data-action="push-menu"{{/if}} data-touchpoint="customercenter" data-hashtag="#{{url}}" name="{{name}}">
            {{translate name}}
            {{#if children.length}}<i class="header-menu-myaccount-menu-push-icon"></i>{{/if}}
        </a>
        {{else}}
        <span  class="header-menu-myaccount-span-level2" tabindex="-1" {{#if children.length}}data-action="push-menu"{{/if}} name="{{name}}">
            {{translate name}}
            {{#if children.length}}<i class="header-menu-myaccount-menu-push-icon"></i>{{/if}}
        </span>
        {{/if}}

        {{#if children.length}}
        <ul class="header-menu-myaccount-level3">
            <li>
                <a href="#" class="header-menu-myaccount-back" data-action="pop-menu" name="back-level3">
                    <i class="header-menu-myaccount-pop-icon "></i>
                    {{!-- {{translate 'Back'}} --}}
                    {{name}}
                </a>
                <a href="#" class="header-menu-myaccount-close" data-action="header-sidebar-hide">
                    <i class="icon-times"></i>
                </a>
            </li>
            {{#each children}}
            <li {{#if permission}}data-permissions="{{permission}}"{{/if}} {{#if permissionOperator}}data-permissions-operator="{{permissionOperator}}"{{/if}}>
                <a class="header-menu-myaccount-anchor-level3" tabindex="-1" href="#" data-touchpoint="customercenter" data-hashtag="#{{url}}" name="{{name}}">{{translate name}}</a>
            </li>
            {{/each}}
        </ul>
        {{/if}}
    </li>
    {{/each}}

</ul>



{{!----
Use the following context variables when customizing this template:

	isProductListsEnabled (Boolean)
	isSingleList (Boolean)
	isCaseModuleEnabled (Boolean)
	productListsReady (Boolean)
	productLists (Array)
	purchasesPermissions (String)
	returnsPermissions (String)

----}}
