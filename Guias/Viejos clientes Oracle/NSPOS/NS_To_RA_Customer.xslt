<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:q1="urn:relationships_2011_1.lists.webservices.netsuite.com" xmlns:messages="urn:messages_2011_1.platform.webservices.netsuite.com" xmlns:listEmp="urn:employees_2011_1.lists.webservices.netsuite.com" xmlns:platformCore="urn:core_2011_1.platform.webservices.netsuite.com" version="2.0" exclude-result-prefixes="xs fn q1 platformCore messages listEmp">
<xsl:output method="xml" indent="yes"/>
<!-- 
  Use This file to override templates from the standard file. For usage information please consult
    the NS Adapter Customizing Interface Files documentation.
    
    2013/07/30 mrb: created this Customer File
    2013/04/10 mrb: Created Prompt for Price Customization
-->
<xsl:template name="Ref02">
	<xsl:for-each select="*:customFieldList/*:customField[@scriptId='custentity_nspos_salary']">
		<xsl:value-of select="*:value"/>
    </xsl:for-each>
</xsl:template>
</xsl:stylesheet>


