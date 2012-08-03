// ==UserScript==
// @name        LCA assistance hiding
// @namespace   http://mary.gardiner.id.au/
// @description Hide travel and accommodation assistance requests
// @include     https://lca2013.linux.org.au/*
// @version     1
// ==/UserScript==

function checkEm(p, text) {
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

var assistanceStrings = {"Accommodation assistance:" : "accom",
		"Travel assistance:" : "travel"};

function findPs() {
	var ps = document.getElementsByTagName("p");
	var myPs = {};
	for (i = 0; i < ps.length; i++) {
		var p = ps[i];
		for (var searchString in assistanceStrings) {
			if (checkEm(p, searchString)) {
				var suffix = assistanceStrings[searchString];
				myPs[suffix] = p;
			}
		}
	}
	return myPs;
}

function getAssistanceId(suffix) {
	return "unhidep-" + suffix;
}

function createUnhide(idsuffix) {
        var unhidePElem = document.createElement("div");
	unhidePElem.style.border = "thin solid #ff0";
	unhidePElem.style.backgroundColor = "#ffc";
	unhidePElem.style.padding = "1ex";
	unhidePElem.style.fontWeight = "bold";
	unhidePElem.style.textDecoration = "underline";
	unhidePElem.id = getAssistanceId(idsuffix);
	return unhidePElem;
}

function createUnhides() {
	var ps = findPs();
	for (var key in ps) {
		var p = ps[key];
		var unhide = createUnhide(key);
		p.parentNode.insertBefore(unhide, p);
	}
}

function hideP(suffix) {
	var unhide = document.getElementById(getAssistanceId(suffix));
	var ps = findPs();
	var p = ps[suffix];
	p.style.visibility = "hidden";
	unhide.textContent = "Hidden " + suffix + " assistance request status, click to see.";
	unhide.onclick = function () {showP(suffix);};

	return false;
}

function showP(suffix) {
	var ps = findPs();
	var p = ps[suffix];
	p.style.visibility = "visible";
	var unhidePElem = document.getElementById(
			getAssistanceId(suffix));
	unhidePElem.textContent = "Showing " + suffix + " assistance request status, click to hide.";
	unhidePElem.onclick = function () {
		hideP(suffix); };
	return false;
}

createUnhides();
for (var searchString in assistanceStrings) {
	var suffix = assistanceStrings[searchString];
	hideP(suffix);
}
