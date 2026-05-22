var freeshipping_item = new function freeShippingItemSC ()
{
  var self = this;

  self.needsCommit = false;
  self.isProcessing = false;
  self.updateShipping = false;

  /* Returns a Object structure with specific customer item pricing. */
  this.setCustomizationPricing = function ()
  {
    var freeShipping = nlapiGetCurrentLineItemValue('item', 'custitem185');
    var currentRate = nlapiGetCurrentLineItemValue('item', 'rate');

    if (freeShipping && currentRate)
    {
      self.updateShipping = true;
      nlapiSetCurrentLineItemValue('item', 'price', '-1', true, true);
      nlapiSetCurrentLineItemValue('item', 'rate', '' + giftcardRate, true, true);
      self.needsCommit = true;
    }
  };

  this.loopAndProcessCartLines = function (type, action)
  {
    if (type === 'item' && action === 'commit')
    {
      var lines = nlapiGetLineItemCount('item');

      for (var i = 1; i <= lines; i++)
      {
        nlapiSelectLineItem('item', i);
        self.setCustomizationPricing();

        if (self.needsCommit)
        {
          nlapiCommitLineItem('item');
          self.needsCommit = false;
        }
      }
    }
  };

  this.isFreeShippingItem = function ()
  {
    var lines = nlapiGetLineItemCount('item');
	var i = 1;
	var has = false;
	var freeShipping;
	
    while (i <= lines && !has)
    {
      freeShipping = nlapiGetLineItemValue('item', 'custitem185', i);
	  
	  if(freeShipping) {
		  has = true;
	  }
      i++;
    }

    return has;
  };

  return {
    recalc: function (type, action)
    {
      if (nlapiGetContext().getExecutionContext() !== 'webstore') return true
      if (self.isProcessing) return
	  
	  var shipMethod = nlapiGetField('shipmethod');
	  
	  if(
	  var lines = nlapiGetLineItemCount('item');


      for (var i = 1; i <= lines; i++)
      {
        nlapiSelectLineItem('item', i);
	  }

      self.isProcessing = true;
      self.loopAndProcessCartLines(type, action);
      self.isProcessing = false;

      return true
    },
	
	validateLine: function (type)
    {
      if (nlapiGetContext().getExecutionContext() !== 'webstore') return true

      if (type !== 'item') return true

      var freeShipping = nlapiGetCurrentLineItemValue('item', 'custitem185');

      return true
    },
	
	fieldChange: function (type, name, linenum)
    {
      if (nlapiGetContext().getExecutionContext() !== 'webstore') return true

      if (name === 'shipmethod' || name === 'rate')
      {
        if (self.isProcessing && !self.updateShipping) return true;

        if (self.isFreeShippingItem())
        {
          self.isProcessing = true;
          self.updateShipping = false;
          nlapiSetFieldValue('shippingcost', 0, true, true);
          self.isProcessing = false;
        }
      }
    }, 
	
	postSourcing: function (type, name)
    {
      if (nlapiGetContext().getExecutionContext() !== 'webstore') return true

      if (name === 'shippingtaxcode')
      {
        if (self.isFreeShippingItem())
        {
          if (self.isProcessing) return true

          self.isProcessing = true;
          nlapiSetFieldValue('shippingtax1rate', 0, true, true);
          self.isProcessing = false;
        }
      }
    }
  };
}();


//You created a variable called freeshipping_item, so when you update the record for this script in NetSuite, 
// you need to reference the method names using this name. For example, instead of simply entering 
// recalc in the record's Recalc Function field, you need to enter freeshipping_item.recalc, because these are being returned by the function.