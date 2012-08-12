// ==UserScript==
// @name        LCA assistance hiding
// @namespace   http://mary.gardiner.id.au/
// @description Hide travel and accommodation assistance requests
// @include	/^https?://lca\d*\.linux.org.au/.*$/
// @include     /^https?://linux\.conf\.au/.*$/
// @version     1
// ==/UserScript==

/* 

Copyright (c) 2012 Mary Gardiner

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

function LCA_checkEm(p, text) {
/* This is horrible: if Zookeepr made more liberal (any) use of id
   attributes, we could find them directly by use of
   getElementById */
	var ems = p.getElementsByTagName("em");
	if (ems[0] != undefined) {
		return ems[0].textContent == text;
	} else {
		return false;
	}
}

var LCA_assistanceStrings = {"Accommodation assistance:" : "accom",
		"Travel assistance:" : "travel"};

function LCA_findPs() {
	var ps = document.getElementsByTagName("p");
	var myPs = {};
	var foundPs = false;
	for (i = 0; i < ps.length; i++) {
		var p = ps[i];
		for (var searchString in LCA_assistanceStrings) {
			if (LCA_checkEm(p, searchString)) {
				foundPs = true;
				var suffix = LCA_assistanceStrings[searchString];
				myPs[suffix] = p;
			}
		}
	}
	if (foundPs) {
		return myPs;
	} else {
		return undefined;
	}
}

function LCA_getAssistanceId(suffix) {
	return "unhidep-" + suffix;
}

function LCA_createUnhide(idsuffix) {
        var unhidePElem = document.createElement("div");
	unhidePElem.style.border = "thin solid #ff0";
	unhidePElem.style.backgroundColor = "#ffc";
	unhidePElem.style.padding = "1ex";
	unhidePElem.style.fontWeight = "bold";
	unhidePElem.style.textDecoration = "underline";
	unhidePElem.id = LCA_getAssistanceId(idsuffix);
	return unhidePElem;
}

function LCA_createUnhides() {
	var ps = LCA_findPs();
	if (ps != undefined) {
		for (var key in ps) {
			var p = ps[key];
			var unhide = LCA_createUnhide(key);
			p.parentNode.insertBefore(unhide, p);
		}
	}
}

function LCA_hideP(suffix) {
	var unhide = document.getElementById(LCA_getAssistanceId(suffix));
	var ps = LCA_findPs();
	if (ps != undefined) {
		var p = ps[suffix];
		p.style.visibility = "hidden";
		unhide.textContent = "Hidden " + suffix + " assistance request status, click to see.";
		unhide.onclick = function () {LCA_showP(suffix);};

	}
	return false;
}

function LCA_showP(suffix) {
	var ps = LCA_findPs();
	if (ps != undefined) {
		var p = ps[suffix];
		p.style.visibility = "visible";
		var unhidePElem = document.getElementById(
				LCA_getAssistanceId(suffix));
		unhidePElem.textContent = "Showing " + suffix + " assistance request status, click to hide.";
		unhidePElem.onclick = function () {
			LCA_hideP(suffix); };
	}
	return false;
}

LCA_createUnhides();
for (var searchString in LCA_assistanceStrings) {
	var suffix = LCA_assistanceStrings[searchString];
	LCA_hideP(suffix);
}
