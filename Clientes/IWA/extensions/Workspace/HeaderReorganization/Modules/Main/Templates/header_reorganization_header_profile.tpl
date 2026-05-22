{{#if showExtendedMenu}}
	<ul class="header-profile-menu-login">
		<li class="header-profile-menu-item header-profile-menu-item-track">
			<a href="/orders" data-hashtag="orders" data-touchpoint="home">
				{{translate 'Track Order'}}
			</a>
		</li>
		<li class="header-profile-menu-item  header-profile-menu-login-register">
			<a class="header-profile-link-welcome" href="#" data-toggle="dropdown">
				{{translate 'Welcome <strong class="header-profile-welcome-link-name">$(0)</strong>' displayName}}
			</a>
			{{#if showMyAccountMenu}}
				<ul class="header-profile-menu-myaccount-container">
					<li data-view="Header.Menu.MyAccount"></li>
				</ul>
			{{/if}}
		</li>
		{{#if headerWelcomeText}}
			<li class="header-profile-menu-item-break"></li>
			<li class="header-profile-message header-profile-menu-item">
				{{headerWelcomeText}}
			</li>
		{{/if}}
	</ul>
{{else}}
	{{#if showLoginMenu}}
		{{#if showLogin}}
			<div class="header-profile-menu-login-container">
				<ul class="header-profile-menu-login">
					<li class="header-profile-menu-item header-profile-menu-item-track">
						<a href="/orders" data-hashtag="orders" data-touchpoint="home">
							{{translate 'Track Order'}}
						</a>
					</li>
					<li class="header-profile-menu-item header-profile-menu-login-register">
						<a class="header-profile-login-link" data-touchpoint="login" data-hashtag="login-register" href="#">
							{{translate 'Login'}}
						</a>
						<span class="header-profile-menu-pipe">|</span>
						{{#if showRegister}}
							<a class="header-profile-register-link" data-touchpoint="register" data-hashtag="login-register" href="#">
								{{translate 'Register'}}
							</a>
						{{/if}}
					</li>
					{{#if headerWelcomeText}}
						<li class="header-profile-menu-item-break"></li>
						<li class="header-profile-message header-profile-menu-item">
							{{headerWelcomeText}}
						</li>
					{{/if}}
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
