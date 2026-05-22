<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:fn="http://www.w3.org/2005/xpath-functions"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xmlns:ra="http://retailanywhere.com/"
                version="2.0"
                exclude-result-prefixes="xs fn">

	<xsl:import href="http://localhost/RAFSbyURL/NetSuite/ToNS/RA_To_NS_RetailTransactions.xslt"/>
	<xsl:output method="xml" encoding="UTF-8" indent="yes"/>
	<!--

	Use This file to override templates from the standard file. For usage information please consult
	the NS Adapter Customizing Interface Files documentation.
	
	2017/03/27 do: 439116 - 2017.1 Golden Image custom XSLT revision
  -->
	<!-- Returns -->
	<xsl:template name="ReturnLineOtherFields">
        <!-- Added for Override purposes -->
    </xsl:template>
	<xsl:template name="ReturnLineCustomFields">
		<!-- Added for Override purposes -->
	</xsl:template>
	
	<!-- Sales Orders -->
	<xsl:template name="SalesOrderCustomFields">
		<!-- Override this template for custom fields -->
	</xsl:template>
	<xsl:template name="SalesOrderOtherFields">
		<!-- Override this template for other standard fields -->
	</xsl:template>
	<xsl:template name="SalesOrderLinesCustomFields">
		<!-- Empty template to override --> 
	</xsl:template>
	<xsl:template name="SalesOrderCustomerDepositCustomFields">
		<!-- Override this for custom fields -->
	</xsl:template>
	<xsl:template name="SalesOrderCustomerDepositOtherFields">
		<!-- Override this for other standard fields -->
	</xsl:template>
	
	<!-- Exchange Customer Refund -->
	<xsl:template name="ExchangeCustomerRefundCustomFields">
		<!-- Override for custom fields -->
	</xsl:template>
	<xsl:template name="ExchangeCustomerRefundOtherFields">
		<!-- Override for other standard fields -->
	</xsl:template>
	
	<!-- Credit Memo -->
	<xsl:template name="CreditMemoCustomFields">
		<!-- Override for custom fields -->
	</xsl:template>
	<xsl:template name="CreditMemoOtherFields">
		<!-- Override for other standard fields -->
	</xsl:template>
	
	<!-- Cash Refund -->
	<xsl:template name="CashRefundCustomFields">
		<!-- Override for custom fields -->
	</xsl:template>
	<xsl:template name="CashRefundOtherFields">
		<!-- Override for other standard fields -->
	</xsl:template>

	<!-- Invoices -->
	<xsl:template name="InvoiceLineCustomFields">
		<!-- Override for custom fields -->
		<customFieldList>
			<xsl:variable name="OpenItemText">
				<xsl:for-each select="../AssociatedCommentLineItem[ReasonCode='ITCM']">
				<xsl:value-of select="CommentText"/>
				</xsl:for-each>
			</xsl:variable>
			<customField xsi:type="StringCustomFieldRef" scriptId="custcol_nspos_open_item">
				<value>
					<xsl:value-of select="substring($OpenItemText,1,300)"/>
				</value>
			</customField>
		</customFieldList>
	</xsl:template>
	<xsl:template name="InvoiceLineOtherFields">
		<!-- Override for other standard fields -->
	</xsl:template>	
	<xsl:template name="InvoicePaymentCustomFields">
		<!-- Override for custom fields -->
	</xsl:template>
	<xsl:template name="InvoicePaymentOtherFields">
		<!-- Override for other standard fields -->
	</xsl:template>
	<xsl:template name="InvoiceCashBackCustomFields">
		<!-- Override for custom fields -->
	</xsl:template>
	<xsl:template name="InvoiceCashBackOtherFields">
		<!-- Override for other standard fields -->
	</xsl:template>
	<xsl:template name="InvoiceCustomFields">
    <!-- Override for custom fields -->
    <!--Email Invoice-->
		<customField scriptId="custbodynspos_receipt_email" xsi:type="StringCustomFieldRef">
		  <value>
			<xsl:value-of select="RetailTransaction/RetailTransactionLineItem/CommentLineItem[ReasonCode='CMEM']/CommentText"/>
		  </value>
		</customField>
		<customField scriptId="custbody_nspos_operator_id" xsi:type="StringCustomFieldRef">
		  <value>
			<xsl:value-of select="RetailTransaction/RetailTransactionLineItem/CommentLineItem[ReasonCode='CMOP']/CommentText"/>
		  </value>
		</customField>
		<customField scriptId="custbody_nspos_workstation_retail_id" xsi:type="StringCustomFieldRef">
		  <value>
			<xsl:value-of select="RetailTransaction/RetailTransactionLineItem/CommentLineItem[ReasonCode='CMWS']/CommentText"/>
		  </value>
		</customField>
	</xsl:template>
	<xsl:template name="InvoiceOtherFields">
		<!-- Override for other standard fields -->
	</xsl:template>
</xsl:stylesheet>
