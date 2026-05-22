<style>
        input.input-large,
        select.input-large {
            line-height: normal;
            width: 100%;
            min-width: unset;
        }

        .cooling-calculator-layout input::placeholder {
            color: rgba(0, 0, 0, 0.4);
        }

        .cooling-calculator-layout input:disabled,  .cooling-calculator-layout select:disabled {
            color: rgba(0, 0, 0, 0.4);
            border-color: rgba(0, 0, 0, 0.4);
            background-color: rgba(0, 0, 0, 0.1);
        }

        .cooling-calculator-layout label {
            height: 40px;
            display: flex;
            align-items: center;
        }

        .cooling-calculator-layout label small {
            margin-left: 5px;
        }

        p[data-validation-error=block] {
            text-wrap: nowrap;
            margin-bottom: 10px;
        }

        .cooling-calc-header,
        .cooling-calc-description {
            margin-bottom: 20px;
        }

        .cooling-calc-bg-container {
            margin: 20px 0;
            padding: 15px 0;
            background-color: #e7e5dd;
        }

        .cooling-calc-title {
            text-align: center;
            color: #3d2820;
            font-family:"Minion Variable Concept", "Minion Pro Regular", "FontAwesome", "Adobe Gurmukhi", serif;
            font-weight: 500;
            font-size: 36px;
            margin: 0;
        }

        .cooling-calc-smaller-title {
            text-align: center;
            color: #3d2820;
            font-family:"Minion Variable Concept", "Minion Pro Regular", "FontAwesome", "Adobe Gurmukhi", serif;
            font-weight: 500;
            font-size: 26px;
            margin: 0;
        }

        .cooling-calc-table-container {
            text-align: center;
            font-size: 0.75rem;
        }

        .cooling-calc-table-container select,
        #cooling-calc-cellar-size-info select {
            line-height: normal;
        }

        .visible-xs-inline {
            display: none;
        }

        input[type="text"].cooling-calc-field::placeholder {
            opacity: 50%;
        }

        .cooling-calc-field {
            font-size: 0.75rem;
        }

        .cooling-calc-field-container input {
            max-width: 75px;
        }

        .cooling-calc-project-field-container input,
        .cooling-calc-project-field-container label,
        .cooling-calc-project-field-container select {
            margin: 0;
            line-height: normal;
            text-wrap: nowrap;
            width: auto;
        }

        #cooling-calc-cellar-submit {
            margin-bottom: 20px;
        }

        #cooling-calc-cellar-submit button {
            margin-top: 20px;
        }

        #additionalNotes {
            min-width: unset;
        }

        #vaporBarrier {
            height: 40px;
            margin: 0;
        }

        @media (min-width: 1600px) {
            .col-lg-4 {
                width: calc((3 / 12) * 100%);
            }
        }

        @media (min-width: 992px) {
            .cooling-calc-table-container {
                margin-left: auto;
                margin-right: auto;
                padding: 0 15px;
            }

            .cooling-calc-table-container .message-error {
                width: fit-content;
                margin-left: auto!important;
                margin-right: auto!important;
            }
        }

        @media (min-width: 768px) {
            .cooling-calc-table-header-container {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                background-color: #e7e5dd;
                color: #3d2820;
                padding: 10px 0;
                font-size: 0.9rem;
                font-weight: bold;
            }

            .cooling-calc-row-header {
                font-size: 0.9rem;
                font-weight: bold;
            }

            .cooling-calc-table-container select {
                width: 100%;
            }

            .cooling-calc-shrink-container {
                display: flex;
                justify-content: center;
            }
        }

        @media (max-width: 767px) {
            .cooling-calc-shrink-container {
                width: 70%;
                margin-left: auto;
                margin-right: auto;
            }

            .cooling-calc-table-container {
                text-align: left;
            }

            .cooling-calc-table-container .row {
                border: 1px solid black;
                padding-bottom: 10px;
                margin-bottom: 10px;
            }

            .cooling-calc-field-container {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
            }

            .cooling-calc-field-container span {
                min-width: 100px;
            }

            .cooling-calc-field-container input,
            .cooling-calc-field-container select {
                margin-bottom: 0;
            }

            .cooling-calc-col-bg {
                background-color: #e7e5dd;
            }

            .cooling-calc-row-header {
                text-align: center;
                color: #3d2820;
                margin-bottom: 10px;
                padding: 5px 0;
            }

            .cooling-calc-field {
                width: auto;
                display: inline;
            }

            .visible-xs-inline {
                display: inline;
            }

            .hidden-xs {
                display: none;
            }
        }
    </style>

    <section class="cooling-calc-header">
        <div class="cooling-calc-bg-container">
            <h1 class="cooling-calc-title">Wine Cellar Cooling Calculator</h1>
        </div>
    </section>

    <section class="cooling-calc-description">
        <p>
        Our thermal load calculator can help you select a wine cooling unit that is properly sized for your wine cellar. After you submit the information below, the calculator will calculate the thermal load (BTUH) and display the recommended cooling units for your cellar. You also will receive an email summary of your inputs, with a link to the recommended units. If you have problems using the calculator, or your cellar isn't rectangular, please <a href="/contact" style="color:#a31629;">contact us</a> and we'll be glad to assist you! 
        </p>
    </section>

    <section id="cooling-calc-cellar-project-info">
        <div class="cooling-calc-bg-container">
            <h2 class="cooling-calc-smaller-title">Project Information</h2>
        </div>

        <div class="row">
            <div class="col-md-9">
                <div class="row">
                    <div class="col-md-2">
                        <label for="project">
                            Project Name <small>*</small> 
                            <i data-tooltip="custrecord_tlc_project_name"></i>
                        </label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    data-validate-required 
                                    data-validate-required-message="Project Name is required" 
                                    id="project" 
                                    name="project" 
                                    type="text" value="" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <label for="zipcode">
                            Project Zip Code <small>*</small>
                        </label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    data-validate-required 
                                    data-validate-required-message="Zip Code is required" 
                                    id="zipcode" 
                                    name="zipcode" 
                                    type="text" value="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="cooling-calc-cellar-size-info">
        <div class="cooling-calc-bg-container">
            <h2 class="cooling-calc-smaller-title">Wine Cellar Size</h2>
        </div>

        <div class="row">
            <div class="col-md-11">
                <div class="row">
                    <div class="col-md-1">
                        <label for="shape">
                            Shape <small>*</small>
                            <i data-tooltip="custrecord_tlc_cellar_shape"></i>
                        </label>
                    </div>
                    <div class="col-md-2">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <select
                                    data-validate-required 
                                    data-validate-required-message="Shape is required"
                                    data-list-id="customrecord_cellar_shapes" 
                                    data-hide-option="" 
                                    id="shape" 
                                    name="shape">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-1">
                        <label for="volume">
                            Volume
                            <i data-tooltip="custrecord_tlc_volume"></i>
                        </label>
                    </div>
                    <div class="col-md-2">
                        <input class="input-large"
                            disabled
                            id="volume" 
                            name="volume" 
                            type="number" 
                            step="any" value="" />
                    </div>
                </div>
            
                <div class="row">
                    <div class="col-md-1">
                        <label for="width">
                            Width <small>*</small>
                            <i data-tooltip="custrecord_tlc_cellar_width"></i>
                        </label>
                    </div>
            
                    <div class="col-md-2">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    data-validate-required 
                                    data-validate-required-message="Width is required" 
                                    id="width" 
                                    name="width" 
                                    type="number"
                                    min="0.1" max="99"
                                    placeholder="Feet" 
                                    step="any" value="" />
                            </div>
                        </div>
                    </div>
            
                    <div class="col-md-1">
                        <label for="depth">
                            Depth <small>*</small>
                            <i data-tooltip="custrecord_tlc_cellar_depth"></i>
                        </label>
                    </div>
            
                    <div class="col-md-2">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    data-validate-required 
                                    data-validate-required-message="Depth is required" 
                                    id="depth" 
                                    name="depth" 
                                    type="number"
                                    min="0.1" max="99"
                                    placeholder="Feet"  
                                    step="any" value="" />
                            </div>
                        </div>
                    </div>
            
                    <div class="col-md-1">
                        <label for="height1">
                            Height <small>*</small>
                            <i data-tooltip="custrecord_tlc_cellar_height"></i>
                        </label>
                    </div>
            
                    <div class="col-md-2">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    data-validate-required 
                                    data-validate-required-message="Height is required" 
                                    id="height1" 
                                    name="height1" 
                                    type="number"
                                    min="0.1" max="99"
                                    placeholder="Feet" 
                                    step="any" value="" />
                            </div>
                        </div>
                    </div>
            
                    <div class="cooling-calc-height2-container" style="display: none;">
                        <div class="col-md-1" >
                            <label for="height2" style="text-wrap: nowrap;">
                                Height 2 <small>*</small>
                                <i data-tooltip="custrecord_tlc_cellar_height_second"></i>
                            </label>
                        </div>
                
                        <div class="col-md-2">
                            <div data-validation="control-group">
                                <div data-validation="control">
                                    <input class="input-large"  
                                        id="height2" 
                                        name="height2" 
                                        type="number"
                                        min="0" max="50"
                                        placeholder="Feet"
                                        step="any" value="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="cooling-calc-construction-info">
        <div class="cooling-calc-bg-container">
            <h2 class="cooling-calc-smaller-title">Wine Cellar Construction</h2>
        </div>

        <div class="cooling-calc-table-container container-fluid">
            <div class="row hidden-xs">
                <div class="cooling-calc-table-header-container">
                    <div class="col-sm-offset-1 col-sm-2">
                        <span>Wall Area</span>
                    </div>
                    <div class="col-sm-2">
                        <span>Insulation <sup>1</sup></span>
                    </div>
                    <div class="col-sm-1">
                        <span>Thickness <sup>2</sup></span>
                    </div>
                    <div class="col-sm-1">
                        <span>R-Value</span> <sup>3</sup></span>
                    </div>
                    <div class="col-sm-2">
                        <span>Exposure <sup>4</sup></span>
                    </div>
                    <div class="col-sm-1">
                        <span>Area of Glass</span>
                    </div>
                    <div class="col-sm-2">
                        <span>Type of Glass <sup>5</sup></span>
                    </div>
                </div>
            </div>
        
            <div class="row">
                <div class="col-sm-1 cooling-calc-col-bg">
                    <div class="cooling-calc-row-header">
                        <span>Front</span>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Wall Area</span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="frontWallArea" id="frontWallArea" placeholder="Sq Ft" data-label="Wall Area">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Insulation <sup>1</sup></span>
                            <select class="cooling-calc-field" 
                                data-list-id="customrecord_tlc_materials" 
                                id="frontWallInsulation" 
                                name="frontWallInsulation"
                                data-hide-option=""
                                data-label="Insulation"
                                data-default-value="23">
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-1">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Thickness <sup>2</sup></span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="frontWallThickness" id="frontWallThickness" disabled="disabled" placeholder="Inches" min="0.1" max="50" step="any" data-default-value="4" data-label="Thickness">
                        </div>
                    </div>
                </div>
                <div class="col-sm-1">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">R-Value <sup>3</sup></span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="frontWallRValue" id="frontWallRValue" min="1" max="1000" step="any" value="1" data-label="R-Value" data-default-value="1">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Exposure <sup>4</sup></span>
                            <select class="cooling-calc-field" 
                                data-list-id="customrecord_wall_locations" 
                                id="frontWallExposure" 
                                name="frontWallExposure"
                                data-label="Exposure"
                                data-hide-option=",4">
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-1">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Area of Glass</span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="frontWallGlassArea" id="frontWallGlassArea" placeholder="Sq Ft" min="0" max="1000" step="any" value="0" data-label="Area of Glass">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Type of Glass <sup>5</sup></span>
                            <select class="cooling-calc-field" 
                                data-list-id="customrecord_glass_types" 
                                id="frontWallGlassType" 
                                name="frontWallGlassType"
                                disabled="disabled"
                                data-label="Type of Glass"
                                data-hide-option="">
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-1 cooling-calc-col-bg">
                    <div class="cooling-calc-row-header">
                        <span>Left</span>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Wall Area</span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="leftWallArea" id="leftWallArea" placeholder="Sq Ft" data-label="Wall Area">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Insulation <sup>1</sup></span>
                            <select class="cooling-calc-field" 
                                data-list-id="customrecord_tlc_materials" 
                                id="leftWallInsulation" 
                                name="leftWallInsulation"
                                data-hide-option=""
                                data-label="Insulation"
                                data-default-value="23">
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-1">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Thickness <sup>2</sup></span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="leftWallThickness" id="leftWallThickness" disabled="disabled" placeholder="Inches" min="0.1" max="50" step="any" data-default-value="4" data-label="Thickness">
                        </div>
                    </div>
                </div>
                <div class="col-sm-1">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">R-Value <sup>3</sup></span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="leftWallRValue" id="leftWallRValue" min="1" max="1000" step="any" value="1" data-label="R-Value" data-default-value="1">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Exposure <sup>4</sup></span>
                            <select class="cooling-calc-field" 
                                data-list-id="customrecord_wall_locations" 
                                id="leftWallExposure" 
                                name="leftWallExposure"
                                data-label="Exposure"
                                data-hide-option=",4">
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-1">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Area of Glass</span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="leftWallGlassArea" id="leftWallGlassArea" placeholder="Sq Ft" min="0" max="1000" step="any" value="0" data-label="Area of Glass">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Type of Glass <sup>5</sup></span>
                            <select class="cooling-calc-field" 
                                data-list-id="customrecord_glass_types" 
                                id="leftWallGlassType" 
                                name="leftWallGlassType"
                                disabled="disabled"
                                data-label="Type of Glass"
                                data-hide-option="">
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-1 cooling-calc-col-bg">
                    <div class="cooling-calc-row-header">
                        <span>Rear</span>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Wall Area</span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="rearWallArea" id="rearWallArea" placeholder="Sq Ft" data-label="Wall Area">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Insulation <sup>1</sup></span>
                            <select class="cooling-calc-field" 
                                data-list-id="customrecord_tlc_materials" 
                                id="rearWallInsulation" 
                                name="rearWallInsulation"
                                data-hide-option=""
                                data-label="Insulation"
                                data-default-value="23">
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-1">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Thickness <sup>2</sup></span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="rearWallThickness" id="rearWallThickness" disabled="disabled" placeholder="Inches" min="0.1" max="50" step="any" data-default-value="4" data-label="Thickness">
                        </div>
                    </div>
                </div>
                <div class="col-sm-1">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">R-Value <sup>3</sup></span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="rearWallRValue" id="rearWallRValue" min="1" max="1000" step="any" value="1" data-label="R-Value" data-default-value="1">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Exposure <sup>4</sup></span>
                            <select class="cooling-calc-field" 
                                data-list-id="customrecord_wall_locations" 
                                id="rearWallExposure" 
                                name="rearWallExposure"
                                data-label="Exposure"
                                data-hide-option=",4">                            
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-1">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Area of Glass</span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="rearWallGlassArea" id="rearWallGlassArea" placeholder="Sq Ft" min="0" max="1000" step="any" value="0" data-label="Area of Glass">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Type of Glass <sup>5</sup></span>
                            <select class="cooling-calc-field" 
                                data-list-id="customrecord_glass_types" 
                                id="rearWallGlassType" 
                                name="rearWallGlassType"
                                disabled="disabled"
                                data-label="Type of Glass"
                                data-hide-option="">
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-1 cooling-calc-col-bg">
                    <div class="cooling-calc-row-header">
                        <span>Right</span>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Wall Area</span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="rightWallArea" id="rightWallArea" placeholder="Sq Ft" data-label="Wall Area">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Insulation <sup>1</sup></span>
                            <select class="cooling-calc-field" 
                                data-list-id="customrecord_tlc_materials" 
                                id="rightWallInsulation" 
                                name="rightWallInsulation"
                                data-hide-option=""
                                data-label="Insulation"
                                data-default-value="23">
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-1">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Thickness <sup>2</sup></span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="rightWallThickness" id="rightWallThickness" disabled="disabled" placeholder="Inches" min="0.1" max="50" step="any" data-default-value="4" data-label="Thickness">
                        </div>
                    </div>
                </div>
                <div class="col-sm-1">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">R-Value <sup>3</sup></span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="rightWallRValue" id="rightWallRValue" min="1" max="1000" step="any" value="1" data-label="R-Value" data-default-value="1">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Exposure <sup>4</sup></span>
                            <select class="cooling-calc-field" 
                                data-list-id="customrecord_wall_locations" 
                                id="rightWallExposure" 
                                name="rightWallExposure"
                                data-label="Exposure"
                                data-hide-option=",4">
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-1">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Area of Glass</span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="rightWallGlassArea" id="rightWallGlassArea" placeholder="Sq Ft" min="0" max="1000" step="any" value="0" data-label="Area of Glass">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Type of Glass <sup>5</sup></span>
                            <select class="cooling-calc-field" 
                                data-list-id="customrecord_glass_types" 
                                id="rightWallGlassType" 
                                name="rightWallGlassType"
                                disabled="disabled"
                                data-label="Type of Glass"
                                data-hide-option="">
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-1 cooling-calc-col-bg">
                    <div class="cooling-calc-row-header">
                        <span>Ceiling</span>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Wall Area</span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="ceilingArea" id="ceilingArea" placeholder="Sq Ft" data-label="Wall Area">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Insulation <sup>1</sup></span>
                            <select class="cooling-calc-field" 
                                data-list-id="customrecord_tlc_materials" 
                                id="ceilingInsulation" 
                                name="ceilingInsulation"
                                data-hide-option=""
                                data-label="Insulation"
                                data-default-value="23">
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-1">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Thickness <sup>2</sup></span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="ceilingThickness" id="ceilingThickness" disabled="disabled" placeholder="Inches" min="0.1" max="50" step="any" data-default-value="6" data-label="Thickness">
                        </div>
                    </div>
                </div>
                <div class="col-sm-1">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">R-Value <sup>3</sup></span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="ceilingRValue" id="ceilingRValue" min="1" max="1000" step="any" value="1" data-label="R-Value" data-default-value="1">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Exposure <sup>4</sup></span>
                            <select class="cooling-calc-field" 
                                data-list-id="customrecord_wall_locations" 
                                id="ceilingExposure" 
                                name="ceilingExposure"
                                data-label="Exposure"
                                data-hide-option=",4">                            
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-1 cooling-calc-col-bg">
                    <div class="cooling-calc-row-header">
                        <span>Floor</span>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Wall Area</span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="floorArea" id="floorArea" placeholder="Sq Ft" data-label="Wall Area">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Insulation <sup>1</sup></span>
                            <select class="cooling-calc-field" 
                                data-list-id="customrecord_tlc_materials"
                                id="floorInsulation" 
                                name="floorInsulation"
                                data-hide-option=""
                                data-label="Insulation"
                                data-default-value="13"
                                data-trigger="change"
                                data-freeze="T">
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-1">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Thickness <sup>2</sup></span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="floorThickness" id="floorThickness" placeholder="Inches" min="0.1" max="50" step="any" data-default-value="6" value="6" data-label="Thickness">
                        </div>
                    </div>
                </div>
                <div class="col-sm-1">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">R-Value <sup>3</sup></span>
                            <input class="cooling-calc-field" type="number" inputmode="decimal" name="floorRValue" id="floorRValue" disabled="disabled" min="1" max="1000" step="any" value="" data-label="R-Value">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="cooling-calc-shrink-container">
                        <div class="cooling-calc-field-container">
                            <span class="visible-xs-inline">Exposure <sup>4</sup></span>
                            <select class="cooling-calc-field" 
                                data-list-id="customrecord_wall_locations" 
                                id="floorExposure" 
                                name="floorExposure"
                                data-label="Exposure"
                                data-hide-option=""
                                data-default-value="4">
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <ol style="text-align: left; font-size: 0.9rem;">
                    <li><b>Insulation:</b> If the entire wall is glass, select the insulation and thickness used in the other walls of the cellar. If you don't know the type and thickness of insulation used, or if the surface is insulated with multiple materials, select "Enter R Value" and enter the total R-Value of the wall.</li>
                    <li><b>Thickness:</b> Common interior wall thicknesses are 4 inches. Common exterior wall thicknesses are 6 inches. Common floor and ceiling thicknesses range from 6 to 12 inches.</li>
                    <li><b>R-Value:</b> Instead of entering the insulation type and thickness, you may enter the R-Value here. If the wall is entirely glass, enter any R-Value. If the wall is partial glass, enter the R-Value of the non-glass portion of the wall.</li>
                    <li><b>Exposure:</b> If the wall is an interior wall exposed to indoor, conditioned space, select "Interior / Conditioned"; if the wall is exposed to the exterior or a non-conditioned space (e.g. garage, attic space, crawlspace), select "Exterior / Non-Conditioned";  if the wall is built against the earth and is below grade by 3 feet or more, select "Below Grade"; if the wall is against the earth and on grade without any crawlspace or gaps, select "On Grade".</li>
                    <li><b>Type of Glass:</b> If the glass resembles a shower, with frameless door(s), select "Single Pane". Dual-pane glass (also called "insulated glass"), will have multiple panes of glass and the doors will always be framed.</li>
                </ol>
            </div>
        </div>
    </section>

    <section id="cooling-calc-cellar-environment-info">
        <div class="cooling-calc-bg-container">
            <h2 class="cooling-calc-smaller-title">Wine Cellar Environment</h2>
        </div>

        <div class="row">
            <div class="col-md-9">
                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="desiredCellarTemp">
                            Desired Cellar Temperature (ºF) <small>*</small>
                            <i data-tooltip="custrecord_tlc_desired_temp"></i>
                        </label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    data-validate-required 
                                    data-validate-required-message="Desired Cellar Temperature is required" 
                                    id="desiredCellarTemp" 
                                    name="desiredCellarTemp" 
                                    min="45" max="62"
                                    type="number" value="55" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="ambientTemperature">
                            Peak Ambient Temperature (ºF) <small>*</small>
                            <i data-tooltip="custrecord_tlc_peak_int"></i>
                        </label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    data-validate-required 
                                    data-validate-required-message="Peak Ambient Temperature is required" 
                                    id="ambientTemperature" 
                                    name="ambientTemperature"
                                    min="75" max="110"
                                    type="number" value="75" />
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="exteriorTemperature">
                            Peak Exterior Temperature (ºF) <small>*</small>
                            <i data-tooltip="custrecord_tlc_peak_ext"></i>
                        </label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    data-validate-required 
                                    data-validate-required-message="Peak Exterior Temperature is required" 
                                    id="exteriorTemperature" 
                                    name="exteriorTemperature" 
                                    max="110"
                                    type="number" value="95" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="ambientHumidity">
                            Peak Ambient Humidity (%RH) <small>*</small>
                            <i data-tooltip="custrecord_tlc_humidity"></i>
                        </label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    data-validate-required 
                                    data-validate-required-message="Peak Ambient Humidity is required" 
                                    id="ambientHumidity" 
                                    name="ambientHumidity" 
                                    type="number"
                                    min="10" max="99"  
                                    step="any" value="50" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="altitude">
                            Altitude (Ft) <small>*</small>
                            <i data-tooltip="custrecord_tlc_altitude"></i>
                        </label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    data-validate-required 
                                    data-validate-required-message="Altitude is required" 
                                    id="altitude" 
                                    name="altitude" 
                                    type="number" 
                                    min="0" max="8000"  
                                    value="0" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="vaporBarrier" style="background-color:#ffe600;padding-left:10px;">
                            Vapor Barrier / Airtight <small>*</small>
                            <i data-tooltip="custrecord_tlc_vapor_barrier"></i>
                        </label>
                    </div>
                    <div class="col-md-2">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input id="vaporBarrier" 
                                    name="vaporBarrier" 
                                    type="checkbox" 
                                    value="T" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="cooling-calc-cellar-ducting-info">
        <div class="cooling-calc-bg-container">
            <h2 class="cooling-calc-smaller-title">Cold - Side Ducting</h2>
        </div>

        <div class="row">
            <div class="col-md-9">
                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="ductLength">
                            Combined Duct Length (Ft) <small>*</small>
                            <i data-tooltip="custrecord_tlc_duct_length"></i>
                        </label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    data-validate-required 
                                    data-validate-required-message="Combined Duct Length is required" 
                                    id="ductLength" 
                                    name="ductLength" 
                                    type="number" 
                                    min="0" max="1000"  
                                    value="0" />
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="numberOfBends">
                            Total Number of Bends <small>*</small>
                            <i data-tooltip="custrecord_tlc_duct_bends"></i>
                        </label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    data-validate-required 
                                    data-validate-required-message="Total Number of Bends is required" 
                                    id="numberOfBends" 
                                    name="numberOfBends" 
                                    type="number" 
                                    min="0" max="10"  
                                    value="0" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="ductPeakAmbientTemperature">
                            Peak Ambient Temperature (ºF) <small>*</small>
                            <i data-tooltip="custrecord_tlc_duct_ambient"></i>
                        </label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    data-validate-required 
                                    data-validate-required-message="Peak Ambient Temperature is required" 
                                    id="ductPeakAmbientTemperature" 
                                    name="ductPeakAmbientTemperature" 
                                    type="number" 
                                    min="75" max="110"  
                                    value="95" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="cooling-calc-cellar-additional-info">
        <div class="cooling-calc-bg-container">
            <h2 class="cooling-calc-smaller-title">Additional Questions</h2>
        </div>

        <div class="row">
            <div class="col-md-9">
                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="residentialOrCommercial">
                            Residential vs Commercial Use
                            <i data-tooltip="custrecord_tlc_cellar_type"></i>
                        </label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <select class="input-large" 
                                    data-validate-required 
                                    data-validate-required-message="Residential vs Commercial Use is required"
                                    data-list-id="customrecord_cellar_types" 
                                    id="residentialOrCommercial" 
                                    name="residentialOrCommercial"
                                    data-hide-option="">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="internalLoad">
                            Heat Inside the Cellar (Watts)
                            <i data-tooltip="custrecord_tlc_internal_watts"></i>
                        </label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    id="internalLoad" 
                                    name="internalLoad" 
                                    min="0"
                                    type="number" value="0" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="usagePerDay">
                            Hours per Day
                            <i data-tooltip="custrecord_tlc_internal_hours"></i>
                        </label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    id="usagePerDay" 
                                    name="usagePerDay"
                                    min="0" max="24"
                                    type="number" value="0" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="unitType">
                            Unit Type
                            <i data-tooltip="custrecord_tlc_split_type"></i>
                        </label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <select class="input-large" 
                                    data-list-id="customrecord_split_types" 
                                    id="unitType" 
                                    name="unitType"
                                    data-default-label="All">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="interiorExterior">
                            Interior/Exterior Exposure
                            <i data-tooltip="custrecord_tlc_interior_exterior"></i>
                        </label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <select class="input-large" 
                                    data-list-id="customrecord_interior_exterior" 
                                    id="interiorExterior" 
                                    name="interiorExterior"
                                    data-default-label="All">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="units">
                            Number of Units
                            <i data-tooltip="custrecord_tlc_units"></i>
                        </label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    id="units" 
                                    name="units" 
                                    min="1"
                                    type="number" value="1" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="tier">
                            Tier
                            <i data-tooltip="custrecord_tlc_tier"></i>
                        </label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <select class="input-large" 
                                    data-list-id="customrecord_tiers" 
                                    id="tier" 
                                    name="tier"
                                    data-hide-option="">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="additionalNotes">
                            Is there anything else we should know?
                            <i data-tooltip="custrecord_tlc_additional_questions"></i>
                        </label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <textarea name="additionalNotes" id="additionalNotes"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="cooling-calc-cellar-contact-info">
        <div class="cooling-calc-bg-container">
            <h2 class="cooling-calc-smaller-title">Contact Information</h2>
        </div>

        <div class="row">
            <div class="col-md-9">
                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="firstname">First Name <small>*</small></label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    data-validate-required 
                                    data-validate-required-message="First Name is required" 
                                    id="firstname" 
                                    name="firstname" 
                                    type="text" value="" />
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="lastname">Last Name <small>*</small></label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    data-validate-required 
                                    data-validate-required-message="Last Name is required" 
                                    id="lastname" 
                                    name="lastname" 
                                    type="text" value="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="email">Email <small>*</small></label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large"
                                    data-ccid
                                    data-validate-required 
                                    data-validate-required-message="Email is required" 
                                    id="email" 
                                    name="email" 
                                    type="text" value="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-5 col-lg-4">
                        <label for="phone">Phone <small>*</small></label>
                    </div>
                    <div class="col-md-4">
                        <div data-validation="control-group">
                            <div data-validation="control">
                                <input class="input-large" 
                                    data-validate-required 
                                    data-validate-required-message="Phone is required" 
                                    id="phone" 
                                    name="phone" 
                                    type="tel" value="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="cooling-calc-cellar-submit" data-trigger-before-submit="true" data-prevent-clear-fields="false">
        <div class="row">
            <div class="col-md-9">
                <div class="cooling-calc-buttons-wrapper">
                    <div class="reusable-components">
                        <p class="secondary-cta remove-mb">
                            <button class="btn" type="button" id="preview-button">Preview Results</button>
                        </p>
                        <p class="reusable-left">
                            Review your preliminary results without submitting. You can continue making edits afterward by returning to this page.
                        </p>
                    </div>

                    <div class="reusable-components">
                        <p class="remove-mb">
                            <button class="btn" type="submit">Finalize & Submit</button>
                        </p>
                        <p class="reusable-left">
                            Submit your assumptions to finalize results. You’ll receive a confirmation email with a summary of your assumptions and recommended units.
                        </p>
                    </div>
                </div>

                <input type="hidden" name="custentity_ccalc_id" value="">
                <input type="hidden" name="custentity_ccalc_data" value="">
                <input type="hidden" name="custentity_ccalc_preview" value="">
            </div>
        </div>
    </section>

    <script type="text/javascript">
        window.dispatchEvent(new Event('afterShowCoolingCalculatorForm'));    
    </script>