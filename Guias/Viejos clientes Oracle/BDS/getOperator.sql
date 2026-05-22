SELECT TOP (1000) [ID_OPR], 
	[PW_ACS_OPR], 
	[FL_ENC], 
	[InvalidAttempts], 
	[LockedOut], 
	[Active]
FROM [RAPOS].[dbo].[PA_OPR] where ID_OPR = 'Idaniele'
