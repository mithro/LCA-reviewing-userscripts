// ==UserScript==
// @name        LCA reviewer hiding
// @namespace   http://mary.gardiner.id.au/
// @description Hide existing reviewers and their reviews in Zookeeper
// @include	/^https?://lca\d*\.linux.org.au/.*$/
// @include     /^https?://linux\.conf\.au/.*$/
// @version     1
// ==/UserScript==


/*
Copyright (c) 2012 Mary Gardiner

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function LCA_checkTable(table) {
/* This is horrible: if Zookeepr made more liberal (any) use of id
   attributes, we could find them directly by use of
   getElementById */

	var th = table.getElementsByTagName("th");
	var firstTh  = th[0];
	return firstTh.textContent == "# - Reviewer";
}

function LCA_findTable() {
	var tables = document.getElementsByTagName("table");

	for (i = 0; i < tables.length; i++) {
		var tab = tables[i];
		if (LCA_checkTable(tab)) {
			return tab;
		}
	}
}

function LCA_createUnhide() {
	table = LCA_findTable();
	if (table != undefined){
		var unhideTableElem = document.createElement("div");
		unhideTableElem.style.border = "thin solid #ff0";
		unhideTableElem.style.backgroundColor = "#ffc";
		unhideTableElem.style.padding = "1ex";
		unhideTableElem.style.fontWeight = "bold";
		unhideTableElem.style.textDecoration = "underline";
		unhideTableElem.id = "unhidetable";
		table.parentNode.insertBefore(unhideTableElem, table);
	}
}

function LCA_hideTable() {
	table = LCA_findTable();
	if (table != undefined) {
		table.style.display = "none";
		var unhide = document.getElementById("unhidetable");
		unhide.textContent = "Existing reviews hidden, click to see.";
		unhide.onclick = LCA_showTable;
	}
	return false;
}

function LCA_showTable() {
	table = LCA_findTable();
	if (table != undefined){
		table.style.display = "block";
		var unhideTableElem = document.getElementById("unhidetable");
		unhideTableElem.textContent = "Showing existing reviews, click to hide.";
		unhideTableElem.onclick = LCA_hideTable;
	}
	return false;
}

LCA_createUnhide();
LCA_hideTable();
