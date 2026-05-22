<div class="bulk_order_page_wrapper">    
    <div class="container">
        <div class="bulk_order_header">
            <h2 class="bulk_order_page_title">Bulk Order Request</h2>
        </div>

        <div id="alert" style="display: none;"></div>
        
        <form>
            <div class="form-group">
                <label for="item">Choose an item:</label>
                <div class="dropdown_wrapper" data-validation="control">
                    {{#if selectedItemTitle}}
                        <button class="dropdown_btn" data-action="selectItem">
                            <img src={{selectedItemImg}} alt={{selectedItemTitle}}>
                            <span>
                                {{selectedItemTitle}}
                            </span>
                        </button>
                    {{else}}
                        <button class="dropdown_btn" data-action="selectItem">
                            <span>
                                Choose an item
                            </span>
                        </button>
                    {{/if}}

                   
                     <ul class="dropdown_box" id="item" hidden>
                            <li>Choose an Item</li>
                            {{#each items}}
                                <li data-value={{internalId}}>
                                    <img src={{itemImage}}>
                                    <span>{{pageTitle}}</span>
                                </li>
                            {{/each}}
                    </ul>
                </div>
            </div>

            <div class="form-group">
                <label for="quantity">Quantity</label>
                <div data-validation="control">
                    <input type="number" class="form-control" id="quantity" placeholder="5" data-action="addQuantity" value={{quantity}}>
                </div>
            </div>

            <div class="form-group">
                <label for="email">Email address</label>
                <div data-validation="control">
                    <input disabled type="email" class="form-control" id="email" placeholder="name@example.com" data-action="addEmail" value={{email}}>
                </div>
            </div>

            <button disabled type="submit" class="btn btn-primary w-100 submitBtn">Submit</button>
        </form>
    </div>
</div>