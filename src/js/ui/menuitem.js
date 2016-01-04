
/*jslint browser: true, node: true */
/*global $, PAPAYA_MENU_UNSELECTABLE, PAPAYA_MENU_HOVERING_CSS */

"use strict";

/*** Imports ***/
var papaya = papaya || {};
papaya.ui = papaya.ui || {};


/*** Constructor ***/
papaya.ui.MenuItem = papaya.ui.MenuItem || function (viewer, label, action, callback, dataSource, method, modifier) {
    this.viewer = viewer;

    this.modifier = "";
    if (!papaya.utilities.StringUtils.isStringBlank(modifier)) {
        this.modifier = "-" + modifier;
    }

    this.dataSource = dataSource;
    this.method = method;

    if (this.dataSource && this.method) {
        this.label = this.dataSource[this.method]();
    } else {
        this.label = label;
    }

    this.action = action + this.modifier;
    this.id = this.action.replace(/ /g, "_") + this.viewer.container.containerIndex;
    this.callback = callback;
};


/*** Prototype Methods ***/

papaya.ui.MenuItem.prototype.buildHTML = function (parentId) {
    var html, thisHtml, label;

    if (this.dataSource && this.method) {
        label = this.dataSource[this.method]();
    } else {
        label = this.label;
    }

    html = "<li id='" + this.id + "'><span class='" + PAPAYA_MENU_UNSELECTABLE + "'>" + label + "</span></li>";
    $("#" + parentId).append(html);

    thisHtml = $("#" + this.id);
    thisHtml.click(papaya.utilities.ObjectUtils.bind(this,
        function () {
            this.doAction();
        }));

    thisHtml.hover(function () { $(this).toggleClass(PAPAYA_MENU_HOVERING_CSS); });
};



papaya.ui.MenuItem.prototype.doAction = function () {
    this.callback(this.action);
};
