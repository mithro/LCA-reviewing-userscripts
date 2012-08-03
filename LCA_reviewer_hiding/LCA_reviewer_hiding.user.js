// ==UserScript==
// @name        LCA reviewer hiding
// @namespace   http://mary.gardiner.id.au/
// @description Hide existing reviewers and their reviews in Zookeeper
// @include     https://lca2013.linux.org.au/*
// @version     1
// ==/UserScript==

function checkTable(table) {
/* This is horrible: if Zookeepr made more liberal (any) use of id
   attributes, we could find them directly by use of
   getElementById */

	var th = table.getElementsByTagName("th");
	var firstTh  = th[0];
	return firstTh.textContent == "# - Reviewer";
}

function findTable() {
	var tables = document.getElementsByTagName("table");

	for (i = 0; i < tables.length; i++) {
		var tab = tables[i];
		if (checkTable(tab)) {
			return tab;
		}
	}
}

function createUnhide() {
        var unhideTableElem = document.createElement("div");
	unhideTableElem.style.border = "thin solid #ff0";
	unhideTableElem.style.backgroundColor = "#ffc";
	unhideTableElem.style.padding = "1ex";
	unhideTableElem.style.fontWeight = "bold";
	unhideTableElem.style.textDecoration = "underline";
	unhideTableElem.id = "unhidetable";
	table = findTable();
	table.parentNode.insertBefore(unhideTableElem, table);
	return unhideTableElem;
}

function hideTable() {
	table = findTable();
	table.style.visibility = "hidden";
	var unhide = document.getElementById("unhidetable");
	unhide.textContent = "Existing reviews hidden, click to see.";
	unhide.onclick = showTable;
	return false;
}

function showTable() {
	table = findTable();
	table.style.visibility = "visible";
	var unhideTableElem = document.getElementById("unhidetable");
	unhideTableElem.textContent = "Showing existing reviews, click to hide.";
	unhideTableElem.onclick = hideTable;
	return false;
}

createUnhide();
hideTable();
