function debug (message)
{
  nlapiLogExecution('DEBUG', 'Example Scriptable Cart', message);
}

function customRecalc ()
{
  debug('recalc called!')
}

function customValidateLine (type)
{
  if (type = 'item')
  {
    var itemId = nlapiGetCurrentLineItemValue('item', 'item');
    debug('Line validated: ' + itemId);
  }

  return true
}

function getContext ()
{
  return nlapiGetContext().getExecutionContext();
}


function customPageInit ()
{
  if (getContext() === 'webstore')
  {
    debug('You\'re in the frontend!');
  }
  else if (getContext() === 'userinterface')
  {
    debug('You\'re in the backend!');
  }
  
  var userId = nlapiGetFieldValue('entity');
  if (parseInt(userId) === 0)
  {
    debug('Guest user');
  }
  else
  {
    debug('User id: ' + userId);
  }
}


function customSaveRecord ()
{
  // nlapiSetFieldValue('custbody_used_scriptable_cart', 'T');
  return true
}