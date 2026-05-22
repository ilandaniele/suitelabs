
<div class="header-secondary-wrapper" data-phone-template="header_sidebar" data-tablet-template="header_sidebar">
    <div class="header-sidebar-wrapper">
    	<div class="header-sidebar-menu-wrapper" data-type="header-sidebar-menu">
    		<ul class="header-sidebar-menu">
    			{{#each firstLevels}}
    				<li class="primary-cell">
                        <a class="title" data-touchpoint="home" data-action="push-menu" name="{{text}}">
						   {{text}}
						   <i class="header-sidebar-menu-push-icon"></i>
					    </a>
    					<ul>
                            {{#if secondLevel.icon}}
                            <li>
                                <div class="category-data">
                                    <figure>
                                        <img src="{{secondLevel.icon.imageUrl}}" alt="{{secondLevel.icon.alt}}"/>
                                    </figure>
                                    <div>
                                        <div class="title primary">
                                            {{secondLevel.title.text}}
                                        </div>
                                        <div class="subtitle">
                                            {{secondLevel.subtitle.text}}
                                        </div>
                                    </div>
                                </div>
                            </li>
                            {{/if}}
    						<li class="secondary-cell">
    							<a href="#" class="header-sidebar-menu-back" data-action="pop-menu" name="back-sidebar">
    								<i class="header-sidebar-menu-pop-icon"></i>
    								{{translate 'Back'}}
    							</a>
    						</li>

    						<li class="secondary-cell">
    							<a href="{{url}}" class="title">
    								{{translate 'Browse $(0)' text}}
    							</a>
    						</li>

    						{{#each secondLevel.links}}
                                {{#unless image}}
    							<li class="secondary-cell">
    								<a class="title" data-action="push-menu">
    								  {{text}}
    								  <i class="header-sidebar-menu-push-icon"></i>
								    </a>

    								<ul>
    									<li>
    										<a href="#" class="header-sidebar-menu-back" data-action="pop-menu">
    											<i class="header-sidebar-menu-pop-icon"></i>
    											{{translate 'Back'}}
    										</a>
    									</li>

    									<li class="terciary-cell">
    										<a href="{{url}}" class="title">
    											{{translate 'Browse $(0)' text}}
    										</a>
    									</li>

    									{{#each thirdLevel}}
    									<li class="terciary-cell">
    										<a href="{{url}}" class="title" name="{{text}}">{{text}}</a>
    									</li>
    									{{/each}}
    								</ul>
    							</li>
                                {{/unless}}
    						{{/each}}
    					</ul>
    				</li>
    			{{/each}}
    		</ul>
    	</div>
    </div>
</div>
