define('PermissionsLevelsFix', [
	'ProductReviews.Model',
	'ProductList.Item.Model',
	'ProductList.Item.Search',
	'ProductList.Model',
	'ProductList.ServiceController',
	'SC.Models.Init',
	'Utils',
	'underscore'
], function PermissionsLevelsFix(
	ProductReviewsModel,
	ProductListItemModel,
	ProductListItemSearch,
	ProductListModel,
	ProductListServiceController,
	ModelsInit,
	Utils,
	_
) {
	'use strict';

	_.extend(ProductReviewsModel, {
		create: function (data) {
			var review;
			var sanitizedText;
			var reviewId;
			var reviewAttribute;
			if (this.loginRequired && !ModelsInit.session.isLoggedIn3()) {
				throw unauthorizedError;
			}

			review = nlapiCreateRecord('customrecord_ns_pr_review');

			if (ModelsInit.session.isLoggedIn3()) {
				review.setFieldValue('custrecord_ns_prr_writer', nlapiGetUser() + '');
			}

			if (data.writer) {
				data.writer.name && review.setFieldValue('custrecord_ns_prr_writer_name', Utils.sanitizeString(data.writer.name));
				data.writer.id && review.setFieldValue('custrecord_ns_prr_writer', data.writer.id);
			}

			data.rating && review.setFieldValue('custrecord_ns_prr_rating', data.rating);
			data.title && review.setFieldValue('name', Utils.sanitizeString(data.title));

			if (data.text) {
				sanitizedText = Utils.sanitizeString(data.text);
				review.setFieldValue('custrecord_ns_prr_text', sanitizedText);
				data.text = sanitizedText.replace(/\n/g, '<br>');
			}

			data.itemid && review.setFieldValue('custrecord_ns_prr_item_id', data.itemid);
			reviewId = nlapiSubmitRecord(review);
			data.review_id = reviewId;
			_.each(data.rating_per_attribute, function (rating, name) {
				reviewAttribute = nlapiCreateRecord('customrecord_ns_pr_attribute_rating');
				reviewAttribute.setFieldValue('custrecord_ns_prar_item', data.itemid);
				reviewAttribute.setFieldValue('custrecord_ns_prar_review', reviewId);
				reviewAttribute.setFieldValue('custrecord_ns_prar_rating', rating);
				reviewAttribute.setFieldText('custrecord_ns_prar_attribute', name);
				nlapiSubmitRecord(reviewAttribute);
			});
			return data;
		}
	});

	_.extend(ProductListItemModel, {
		verifySession: function verifySession() {
			if (this.configuration.loginRequired && !ModelsInit.session.isLoggedIn3()) {
				throw unauthorizedError;
			}
		}
	});

	_.extend(ProductListItemSearch, {
		verifySession: function verifySession() {
			if (this.configuration.loginRequired && !ModelsInit.session.isLoggedIn3()) {
				throw unauthorizedError;
			}
		}
	});

	_.extend(ProductListModel, {
		verifySession: function verifySession() {
			if (!!_.result(this.configuration, 'loginRequired') && !ModelsInit.session.isLoggedIn3()) {
				throw unauthorizedError;
			}
		}
	});

	_.extend(ProductListServiceController, {
		getUser: function getUser() {
			var user = ModelsInit.session.isLoggedIn3() ? nlapiGetUser() : 0;
			var role = ModelsInit.context.getRoleId();

			// This is to ensure customers can't query other customer's product lists.
			if (role !== 'shopper' && role !== 'customer_center') {
				user = parseInt(this.request.getParameter('user') || (this.data.owner && this.data.owner.id) || user, 10);
			}
			return user;
		}
	});
});
