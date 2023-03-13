"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 12
   Tutorial Case

   Author:leeman 
   Date:  3/13/2023 

   Filename: bc_outline.js


   Function List
   =============

   makeOutline()
      Generates the text of the table of contents
      as a nested list

   createList(source, TOCList, headings)
      Creates an outline based on the source document,
      list items are appended to TOCList,
      the list items are based on the element names
      specified in the headings array


*/

window.addEventListener("load", makeOutline);

function makeOutline() {

var outline = document.getElementById("outline");

var source = document.getElementById("doc");

var mainHeading = document.createElement("h1");
var outlineList = document.createElement("ol");
var headingText = document.createTextNode("Outline");

mainHeading.appendChild(headingText);
outline.appendChild(mainHeading);
outline.appendChild(outlineList);

createList(source, outlineList);
}
function createList(source, outlineList) {
    var headings = ["H1", "H2", "H3", "H4", "H5", "H6"];

    var prevLevel = 0;

    var headNum = 0;

    for (var n = source.firstChild; n !== null; n = n.nextSibling) {
        var headLevel = headings.indexOf(n.nodeName);

        if (headLevel !== -1) {
            headNum++;
            if (n.hasAttribute("id") === false) {
                n.setAttribute("id", "head" + headNum);
            }
            var listElem = document.createElement("li");

            var linkElem = document.createElement("a");
            linkElem.innerHTML = n.innerHTML;
            linkElem.setAttribute("href", "#" + n.id);

            listElem.appendChild(linkElem);

            if (headLevel === prevLevel) {
                outlineList.appendChild(listElem);
            } else if (headLevel > prevLevel) {
                var nestedList = document.createElement("ol");
                nestedList.appendChild(listElem);
                outlineList.lastChild.appendChild(nestedList);
                outlineList = nestedList;
            } else {
                var levelUp = prevLevel - headLevel;
                for (var i = 1; i <= levelUp; i++) {
                    outlineList = outlineList.parentNode.parentNode;
                }
                outlineList.appendChild(listElem);
            }
            prevLevel = headLevel;
        }
    }
}