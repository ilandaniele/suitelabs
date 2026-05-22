{{#if showExtendedMenu}}
	<a class="header-profile-welcome-link" href="#" data-toggle="dropdown">
		<!-- <i class="header-profile-welcome-user-icon"></i> -->
		<img class="pa-icon user-icon-desktop" src="{{getThemeAssetsPathWithDefault userIconDesktop 'img/Icons/icon-zocial-persona.svg'}}" alt="Login">		
		{{translate 'Welcome <strong class="header-profile-welcome-link-name">$(0)</strong>' displayName}}
		<i class="header-profile-welcome-carret-icon"></i>
	</a>
	<!-- <a class="header-profile-signout-link" href="#" data-touchpoint="logout" name="signout">
        <i class="header-menu-myaccount-signout-icon"></i>
        {{translate 'Log Out'}}
    </a> -->
	<a href="http://track.primaryarms.com/" target="_blank" class="header-profile-signout-link header-profile-tracker-link"> 
		<img class="pa-icon icon-trakmy-order" src="{{getThemeAssetsPathWithDefault iconTrackOrder 'img/Icons/track-order-icon.svg'}}" alt="Track My Order" width="20" height="20">
		<span class="pa-caption tracking-order-text pl8">
			{{translate 'Track My Order'}} 
		</span>
	</a>
	<a class="header-menu-myaccount-signout-link" href="#" data-touchpoint="logout" name="signout">
        <i class="header-menu-myaccount-signout-icon"></i>
        {{translate 'Sign Out'}}
    </a>

	{{#if showMyAccountMenu}}
		<ul class="header-profile-menu-myaccount-container">
			<li data-view="Header.Menu.MyAccount"></li>
		</ul>
	{{/if}}

{{else}}

	{{#if showLoginMenu}}
		{{#if showLogin}}
			<div class="header-profile-menu-login-container" data-type="header-sidebar-menu">
				<ul class="header-profile-menu-login">
					<li>
										
						<a class="header-profile-login-link" data-touchpoint="login" data-hashtag="login-register" href="#">
							<!-- <i class="fa fa-user"></i>  -->
							<img class="pa-icon user-icon-desktop" src="{{getThemeAssetsPathWithDefault userIconDesktop 'img/Icons/icon-zocial-persona.svg'}}" alt="Login" width="39" height="33">	
							<img class="pa-icon user-icon-mobile" src="{{getThemeAssetsPathWithDefault userIconMobile 'img/Icons/icon-material-person.svg'}}" alt="Login" width="20" height="20">
							<span class="pa-caption">{{translate ' Sign In'}}</span>
						</a>
					</li>
					{{#if showRegister}}
						<!-- <li class="vertical-divider"> | </li>
						<li>
							<a class="header-profile-register-link" data-touchpoint="register" data-hashtag="login-register" href="#">
								<img class="pa-icon icon-register" src="{{getThemeAssetsPathWithDefault iconRegister 'img/Icons/icon-awesome-registered.svg'}}" alt="Register" width="20" height="20">
								<span class="pa-caption header-profile-register-text">
									{{translate 'Register'}}
								</span>
							</a>
						</li> -->
					{{/if}}
					<li class="vertical-divider"> | </li>
                    <li class="track-order-mobile-only">
						<a href="http://track.primaryarms.com/" class="header-profile-tracker-link-mobile" target="_blank" >
							<span class="pa-caption">
								{{translate 'Track Your Order'}} 
							</span>
						</a>
                    </li>
					<!-- <li class="vertical-divider"> | </li>
					<li class="QuickOrderHeaderLink" data-view="QuickOrderHeaderLink"></li> -->
					{{!-- <li class="vertical-divider"> | </li> --}}
					<li class="mobile-sign-up">
						<a href="/email-sign-up" data-touchpoint="home" data-hashtag="#/email-sign-up">
							<i class="fa fa-envelope" style="color: #393A39"></i> 
							<span class="pa-caption">
								{{translate 'Email Sign Up'}} 
							</span>
						</a>
					</li>
				</ul>
			</div>
		{{/if}}
	{{else}}
		<a class="header-profile-loading-link">
			<i class="header-profile-loading-icon"></i>
			<span class="header-profile-loading-indicator"></span>
		</a>
	{{/if}}

{{/if}}

{{!----
Use the following context variables when customizing this template:

	showExtendedMenu (Boolean)
	showLoginMenu (Boolean)
	showLoadingMenu (Boolean)
	showMyAccountMenu (Boolean)
	displayName (String)
	showLogin (Boolean)
	showRegister (Boolean)

----}}
