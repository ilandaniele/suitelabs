{{#if showFaqTab}}
<div class="faq-fixed-tab">
	<div><a href="/faq" data-touchpoint="home" data-hashtag="#/faq">FAQ</a></div>
</div>
{{/if}}
<div data-view="Global.BackToTop"></div>
<div class="footer-content">
	<div class="footer-primary-section">
		<div id="navigation-footer" data-cms-area="global_navigation_footer" data-cms-area-filters="global"></div>
		<!--BE IXF: For your website, the location is after/before ...-->	
		<div class="be-ix-link-block"></div>
		<div id="email-footer-2"></div>
		<!--BE IXF: end -->
		<div class="footer-email-signup-column">
			<div class="email-signup-label collapsed" {{#if isPhoneDevice}}data-toggle="collapse" data-target="#footer-email-signup-panel"{{/if}}>
				<span>Email Signup</span>
				<i class="icon-chevron-up"></i>
				<i class="icon-chevron-down"></i>
			</div>
			<div id="footer-email-signup-panel" {{#if isPhoneDevice}}class="collapse"{{/if}}>
				<div class="footer-email-signup-cms-area content-banner banner-footer" data-cms-area="global_email_footer_left" data-cms-area-filters="global"></div>
				<div class="footer-social-icon-cms-area text-center col-xs-12" data-cms-area="global_block_footer_one" data-cms-area-filters="global"></div>
				<div class="RR_Reviews_Widget_Wrapper_Container">
					<div id="RR_Reviews_Widget_Wrapper_Content" class="RR_Reviews_Widget_Wrapper_Content">
						<div id="RR_Reviews_Widget_Wrapper" class="RR_Reviews_Widget_Wrapper"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="content-banner banner-footer footer-row container">
		<div id="copyright-footer" class="copyright-column" data-cms-area="global_copyright_footer" data-cms-area-filters="global"></div>
		<div id="logo-footer" class="third-party-logos-column" data-cms-area="global_logo_footer" data-cms-area-filters="global"></div>
	</div>
</div>
{{#if false}}
<div class="footer-content container">
	<div id="email-footer" class="footer-row row">
		<div id="banner-footer-left" class="col-sm-6 content-banner banner-footer email-footer" data-cms-area="global_email_footer_left" data-cms-area-filters="global"></div>
		<div id="banner-footer-right" class="col-xs-12 col-sm-3 social-footer">
			<div id="block-footer-one" class="col-xs-offset-2 col-sm-offset-0 col-xs-2 col-sm-3 social-footer-icon" data-cms-area="global_block_footer_one" data-cms-area-filters="global"></div>
			<div id="block-footer-two" class="col-xs-2 col-sm-3 social-footer-icon" data-cms-area="global_block_footer_two" data-cms-area-filters="global"></div>
			<div id="block-footer-three" class="col-xs-2 col-sm-3 social-footer-icon" data-cms-area="global_block_footer_three" data-cms-area-filters="global"></div>
			<div id="block-footer-four" class="col-xs-2 col-sm-3 social-footer-icon" data-cms-area="global_block_footer_four" data-cms-area-filters="global"></div>
		</div>
	</div>

	<div class="footer-row row">               
		<div class="RR_Reviews_Widget_Wrapper_Container col-sm-3 col-sm-offset-0">
			<div id="RR_Reviews_Widget_Wrapper_Content" class="RR_Reviews_Widget_Wrapper_Content">
				<div id="RR_Reviews_Widget_Wrapper" class="RR_Reviews_Widget_Wrapper" >
				</div>
			</div>
		</div>
		
		<div id="navigation-footer" class="col-sm-7" data-cms-area="global_navigation_footer" data-cms-area-filters="global"></div>
		<div id="logo-footer" class="col-sm-2" data-cms-area="global_logo_footer" data-cms-area-filters="global"></div>
	</div>

	<div id="copyright-footer" class="content-banner banner-footer footer-row row" data-cms-area="global_copyright_footer" data-cms-area-filters="global"></div>
	<!--BE IXF: For your website, the location is after/before ...-->	
	<div class="be-ix-link-block"><!--Link Equity Target Div--></div>	
	<!--BE IXF: end -->
</div>

{{/if}}


<!-- Shopping Guarantee Seal 
<script type="text/javascript" src="//nsg.symantec.com/Web/Seal/gjs.aspx?SN=965986950"></script>
-->
{{!----
Use the following context variables when customizing this template:

	showFooterNavigationLinks (Boolean)
	footerNavigationLinks (Array)
	
----}}
