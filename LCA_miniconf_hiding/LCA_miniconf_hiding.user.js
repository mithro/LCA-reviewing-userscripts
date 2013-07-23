// ==UserScript==
// @name        LCA miniconf hiding
// @namespace   http://mary.gardiner.id.au/
// @description Hide the list of miniconfs from the review page in Zookeeper
// @include	/^https?://lca\d*\.linux.org.au/.*$/
// @include     /^https?://linux\.conf\.au/.*$/
// @include	https://lca2014.linux.org.au/proposal/review_index
// @version     1.1
// @require	https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==


/*
Copyright (c) 2012-2013 Mary Gardiner

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function LCA_checkA(a) {
/* This is horrible: if Zookeepr made more liberal (any) use of id
   attributes, we could find them directly by use of
   getElementById */

	return a.getAttribute("name") == "Miniconf";
}

function LCA_findA() {
	var as = document.getElementsByTagName("a");

	for (i = 0; i < as.length; i++) {
		var a = as[i];
		if (LCA_checkA(a)) {
			return a;
		}
	}
}

function LCA_findFollowing(a) {
	if (a.nextElementSibling.nodeName == "H2" && 
			a.nextElementSibling.nextElementSibling.nodeName == "TABLE") {
		return [a.nextElementSibling, a.nextElementSibling.nextElementSibling];
	}
}

function LCA_createReviewPageMenu() {
	var reviewMenu = document.createElement("div");
	reviewMenu.id = "reviewmenu";
	reviewMenu.innerHTML = "<h2>Navigation</h2><ul><li><a href=\"#Miniconf\">Miniconfs</a></li><li><a href=\"#Presentation\">Presentations</a></li><li><a href=\"#Tutorial1hourand30minutes\">Tutorials</a></li></ul>";
	return reviewMenu;
}

function LCA_createUnhideMiniconfs() {
	a = LCA_findA();
	if (a != undefined) {
		var unhideMiniconfElem = document.createElement("div");
		unhideMiniconfElem.style.border = "thin solid #ff0";
		unhideMiniconfElem.style.backgroundColor = "#ffc";
		unhideMiniconfElem.style.padding = "1ex";
		unhideMiniconfElem.style.fontWeight = "bold";
		unhideMiniconfElem.style.textDecoration = "underline";
		unhideMiniconfElem.id = "unhideminiconfs";
		a.parentNode.insertBefore(unhideMiniconfElem, a);
		var reviewMenu = LCA_createReviewPageMenu();
		unhideMiniconfElem.parentNode.insertBefore(reviewMenu, unhideMiniconfElem);
	}
}

function LCA_hideMiniconfs() {
	a = LCA_findA();
	if (a != undefined) {
		var toHides = LCA_findFollowing(a);
		for (i = 0; i < toHides.length; i++) {
			var toHide = toHides[i];
			toHide.style.display = "none";
		}
		var unhide = document.getElementById("unhideminiconfs");
		unhide.textContent = "Miniconfs hidden, click to see.";
		unhide.onclick = LCA_showMiniconfs;
	}
	return false;
}

function LCA_showMiniconfs() {
	a = LCA_findA();
	if (a != undefined) {
		var toShows = LCA_findFollowing(a);
		for (i = 0; i < toShows.length; i++) {
			var toShow = toShows[i];
			toShow.style.display = "block";
		}
		var unhideMiniconfElem = document.getElementById("unhideminiconfs");
		unhideMiniconfElem.textContent = "Showing miniconfs, click to hide.";
		unhideMiniconfElem.onclick = LCA_hideMiniconfs;
	}
	return false;
}

LCA_createUnhideMiniconfs();
LCA_hideMiniconfs();
