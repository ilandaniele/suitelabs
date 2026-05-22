/*
    © 2021 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('CookieModalConfirmation.View', [
    'SCView',
    'cookie_modal_confirmation_view.tpl',

    'jQuery',
    'underscore'
], function CookieModalConfirmationView (
    SCViewModule,
    cookie_modal_confirmation_view_tpl,

    jQuery,
    _
) {
    'use strict';

    var SCView = SCViewModule.SCView;

    var _setCookie = function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        // d.setTime(d.getTime() + (30 * 1000));
        var expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    };

    function CookieModalConfirmationView (options) {
        SCView.call(this, options);
        this.options = options || {};
        this.container = this.options.container;
        this.environment = this.container.getComponent('Environment');

        this.cookieName = 'NSeCommCookieModalConfirmation'; // The cookie name
        this.cookieLifetime = this.environment.getConfig('cookieModalConfirmationBanner.cookieLifetime'); // Cookie expiry in days
        this.alertMessage = this.environment.getConfig('cookieModalConfirmationBanner.alertMessage');

        this.template = cookie_modal_confirmation_view_tpl;

        this.bindings = {
            '[name="cookie-modal-day"]': 'cookie-modal-day',
            '[name="cookie-modal-month"]': 'cookie-modal-month',
            '[name="cookie-modal-year"]': 'cookie-modal-year'
        }
    }

    CookieModalConfirmationView.prototype = Object.create(SCView.prototype);
    CookieModalConfirmationView.prototype.constructor = CookieModalConfirmationView;

    CookieModalConfirmationView.prototype.getEvents = function () {
        return {
            'click [data-action="verify-age-birthdate"]': 'verifyBirthDate', // when the button is clicked, it will begin the process
            'click [data-action="verify-young-age"]': 'verifyYoungAge' // when the button is clicked, it will begin the process
        }
    }
    
    CookieModalConfirmationView.prototype.render = function () {
        jQuery('.cookie-modal-confirmation .global-views-modal-content-header').remove();
        SCView.prototype.render.call(this);
    }

    CookieModalConfirmationView.prototype.verifyBirthDate = function (e) {
        var cookieName = this.cookieName; // The cookie name
        var cookieLifetime = this.cookieLifetime; // Cookie expiry in days

        var $modal = jQuery('.cookie-modal-confirmation');

        var birthDay = jQuery('#cookie-modal-day').val();
        var birthMonth =  jQuery('#cookie-modal-month').val();
        var birthYear =  jQuery('#cookie-modal-year').val();
        var birthDate = birthDay +'/'+ birthMonth +'/'+ birthYear;

        if (this.getAge(birthDate) < 18) {
            alert(this.alertMessage);
        } else {
            _setCookie(cookieName, 1, cookieLifetime);
            $modal.modal('hide');
        }
    }

    CookieModalConfirmationView.prototype.verifyYoungAge = function (e) {
        alert(this.alertMessage);
    }

    CookieModalConfirmationView.prototype.getAge = function (birth) {
        var today = new Date();
        var currentDate = today.getDate();
        var currentMonth = today.getMonth() + 1;
        var currentYear = today.getFullYear();
     
        var pieces = birth.split('/');
        var birthDate = pieces[0];
        var birthMonth = pieces[1];
        var birthYear = pieces[2];
     
        if (currentMonth == birthMonth && currentDate >= birthDate) return parseInt(currentYear-birthYear);
        if (currentMonth == birthMonth && currentDate < birthDate) return parseInt(currentYear-birthYear-1);
        if (currentMonth > birthMonth) return parseInt(currentYear-birthYear);
        if (currentMonth < birthMonth) return parseInt(currentYear-birthYear-1);
    }

    CookieModalConfirmationView.prototype.getDay = function () {
        var arryDays = [];
        
        //Loop and add the Day values to Objects.
        for (var i = 1; i <= 31; i++) {
            var objDays = {};
            objDays.value = i;
            arryDays.push(objDays)
        }

        return arryDays;
    }

    CookieModalConfirmationView.prototype.getMonth = function () {
        var monthFormat = this.environment.getConfig('cookieModalConfirmationBanner.monthFormat');
        var arrMonths = [];
        var months = Array.from({length: 12}, (e, i) => {
            return new Date(null, i + 1, null).toLocaleDateString('en', {month: monthFormat});
        });

        //Loop and add the Month values to Objects.
        for (let i = 0; i < months.length; i++) {
            var objMonths = {};
            objMonths.id = i+1;
            objMonths.value = months[i];
            arrMonths.push(objMonths)
        }

        return arrMonths;
    }

    CookieModalConfirmationView.prototype.isNumeric = function isNumeric(value) {
        return /^-?\d+$/.test(value);
    }

    CookieModalConfirmationView.prototype.getYear = function () {
        var arrYears = [];
        var startYear = this.environment.getConfig('cookieModalConfirmationBanner.startYear'); // '1911';
        var endYear = this.environment.getConfig('cookieModalConfirmationBanner.endYear'); // '2010';
        var currentYear = (new Date()).getUTCFullYear();
        startYear = this.isNumeric(startYear) ? startYear : '1911';
        endYear = this.isNumeric(endYear) ? endYear : currentYear;

        //Loop and add the Year values to Objects.
        for (var i = startYear; i <= endYear; i++) {
            var objYears = {};
            objYears.value = startYear++;

            arrYears.push(objYears)
        }

        return arrYears.reverse();
    }

    CookieModalConfirmationView.prototype.getContext = function () {
        // years: _.sortBy(this.getYear(), 'year').reverse(),
        return {
            years: this.getYear(),
            months: this.getMonth(),
            days: this.getDay(),
            welcome: this.environment.getConfig('cookieModalConfirmationBanner.welcome'),
            description: this.environment.getConfig('cookieModalConfirmationBanner.description'),
            logoURL: this.environment.getConfig('cookieModalConfirmationBanner.logoURL')
        }
    }

    return CookieModalConfirmationView
});
