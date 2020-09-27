/***************************************************
 * navigation.js
 * Mike Hepfer
 *
 * Used to apply a shared header and footer to the 
 * the body of all documents where implemented
 ***************************************************/

/*************************************************
 * Creates the header (with nav) and the footer 
 ************************************************/
function createHeaderFooter() {
  // dictionary of labels and hrefs
  const navigationDictionary = {
    "Home":"homework2.html",
    "Sofas & Chairs":"homework7.html",
    "Stoves & Ranges":"homework4.html",
    "Lighting":"homework5.html",
    "Locations": "homework3.html",
    "Demos & Events":"homework6.html",
    "Calculators":"homework9.html",
    "Gift Cards":"homework10.html"
  };

  // build the aside
  var aside = document.createElement("aside");
  aside.innerText = "Phone: (512) 555-1212";

  // build the heading
  var h1 = document.createElement("h1");
  h1.innerText = "Michael Steven Home Furnishings";

  // build the nav
  var ul = buildNavigationList(navigationDictionary);
  var nav = document.createElement("nav");
  nav.className="center";
  nav.appendChild(ul);

  // build the catchphrase
  var blockquote = document.createElement('blockquote');
  blockquote.className="catchPhrase";
  blockquote.cite="http://www.michaelsteven.com/furnishing/homework2.html"
  blockquote.innerText="Quality Crafted and Made to Last"

  // build the header
  var header = document.createElement("header");
  header.className="container"; 
  header.appendChild(aside);
  header.appendChild(h1);
  header.appendChild(blockquote);
  header.appendChild(document.createElement("hr"));
  header.appendChild(nav);
  document.body.insertBefore(header, document.body.childNodes[0]);

  // build the footer
  var footer = document.createElement("footer");
  footer.className="container";
  footer.innerHTML = "<hr>Copyright 2020 michaelsteven.com";
  document.body.appendChild(footer);
} // end createHeaderFooter


/*******************************************
 * Builds and returns a list of nav items
 * 
 * @param {object} navDict // dictionary
 * @returns {object} ul with list items
 ******************************************/
function buildNavigationList(navDict){
  var ul = document.createElement("ul");
  var keys = Object.keys(navDict);

  // loop through the dictionary 
  for( let i = 0; i < keys.length; i++){
    var label = keys[i];        // navigation label
    var ref = navDict[label];   // navigation ref
    var li = buildNavigationListItem( label, ref ); // link item with anchor
   
    // if not last item, adds the | seperator 
    if( i + 1 < keys.length ){
      li.appendChild(document.createTextNode(" \u00A0 | \u00A0"));
    }

    // append the li to the ul
    ul.appendChild(li);      
  }
  return ul;  // returns the ul
} // end buildNavigationList


/*******************************************
 * Creates a list item containing an anchor
 * 
 * @param {string} label // the nav label
 * @param {string} ref   // the href address
 * @returns {object} list item 
 ******************************************/
function buildNavigationListItem(label, ref){
  // build the anchor
  var a = document.createElement("a");
  a.setAttribute("href", ref);
  a.innerHTML = label;

  // build the list item
  var li = document.createElement("li");
  li.appendChild(a);  // insert a into li
  return li;          // returns the li 
} // end buildNavigationListItem