/***************************************************
 * homework10.js
 * Mike Hepfer
 *
 * loads controls and styles neded to display and
 * populate the design of a gift card
 * 
 * Currently displays a card background image. The goal
 * is to load a blank gift card image with numbers, and
 * overlay with z-index the selected background image
 * that has a transparent background. Ran out of time.
 ***************************************************/

configurePageStyles();
populateBorderStyles();
populateFonts();
populateImages();

/******************************************************
 * Configure Page Styles
 * 
 * void function that sets additional page styling
 *****************************************************/
function configurePageStyles() {
  var leftSide = document.getElementById("left");
  leftSide.style.backgroundColor = "rgb(230,230,250)";

  var rightSide = document.getElementById("right");
  rightSide.style.backgroundColor = "white";
  rightSide.style.textAlign = "center";

  // alternative method write this all on one line!
  document.getElementById("customMessage").rows = "5";
  document.getElementById("customMessage").cols = "38";
}


/*****************************************************
 * Populate Border Style Dropdown Options
 * 
 * void function that populates the syles on the form
 * and display area
 ****************************************************/
function populateBorderStyles() {
  const borderStyles = ['dotted', 'dashed', 'solid', 'double',
                        'groove', 'ridge', 'inset', 'outset',
                        'none', 'hidden'];
  // find the borderStyle select item
  var dropdown = document.getElementById("borderStyle");
  
  // append select options to the select item
  appendSelectOptions(dropdown, borderStyles);
} // end populateBorderStyles()


/****************************************************
 * Populate Fonts
 * 
 * void function that populates the dropdown list of
 * of fonts.
 ***************************************************/
function populateFonts() {
  const fonts = ['Arial', 'Book Antiqua', 'Charcoal', 
                 'Comic Sans MS', 'Courier', 'Courier New', 
                 'cursive','Gadget', 'Geneva', 'Georgia', 
                 'Helvetica', 'Impact', 'Lucida Console',
                 'Lucida Grande', 'Lucida Sans Unicode', 'Monaco',
                 'Palatino', 'Palatino Linotype', 'Tahoma', 
                 'Times New Roman', 'Trebuchet MS','Verdana'];

  // find the fontFamily select item
  var dropdown = document.getElementById("fontFamily");

  // append select options to the select item
  appendSelectOptions(dropdown, fonts);
}  // end populateFonts()


/***********************************************
 *  Populate Images
 * 
 * void function that populates the images next
 * to radio buttons.
 **********************************************/
function populateImages() {
  
  // id:[label, url]
  const imageDictionary=getImageDictionary();
  const imageKeys = Object.keys(imageDictionary);

  // Parent element
  var cardImages = document.getElementById("cardImages");

  for (var i = 0; i < imageKeys.length; i++) {
    var imageKey = imageKeys[i];
    var imageLabel = imageDictionary[imageKey][0];
    var imageUrl = imageDictionary[imageKey][1];

    // Create the radio button  
    var radioButton = document.createElement("input");
    radioButton.type      = "radio";
    radioButton.className = "rbgImage";
    radioButton.name      = "rbgImage";
    radioButton.id        = imageKey;
    radioButton.value     = imageLabel;

    // Append radiobutton to the card images
    cardImages.appendChild(radioButton);

    // Create the thumbnail image 
    var image = document.createElement("img");
    image.className = "thumbnails";
    image.src       = imageUrl;
    image.alt       = imageLabel;

    // append image to the card images
    cardImages.appendChild(image);

    // add some spaces
    cardImages.innerHTML += "&nbsp;&nbsp;&nbsp;";

    // Alternate images, only 2 per row
    if (i % 2) {
      var lineBreak = document.createElement("br");
      cardImages.appendChild(lineBreak);
    }
  }
} // end populateImages()


/******************************************************
 * Append Select Options
 * 
 * void function appends options to the selectElement.  
 * @param {*} selectElement select item to populate byref
 * @param {*} array element names to populate
 ******************************************************/
function appendSelectOptions(selectElement, array){
  for (const name of array) {
    // <option value="" name="">Displayed text</option>
    var selectOption = document.createElement("option");
    selectOption.name = name;
    selectOption.value = name;
    selectOption.text = name;
    selectElement.appendChild(selectOption);
  }
} // end appendSelectOptions


/*############################################################*/
/*########### AFTER BUTTON CLICK FUNCTIONS      ##############*/
/*############################################################*/


/***************************************************
 * Apply Styles
 * 
 * void function that applies styles to the elements.
 * - Applies styles
 * - retrieves form values
 * - populates the gift card title and messate
 * - selects an card background image with opacity.
 * 
 * TODO:
 *  - Change to accept the form as a parameter
 *  - validate the form
 **************************************************/
function applyStyles() {
  var placeholder = document.getElementById("placeholder");
  placeholder.innerHTML = ""; // reset

  // apply styling to placeholder itseelf
  applyPlaceholderStyles(placeholder);

  var borderColor = document.getElementById("fontColor").value

  // add the heading for the gift card packaging
  var myH = document.createElement("h1");
  myH.innerHTML = "Enjoy Your Gift Card";
  myH.style.backgroundColor = "";
  placeholder.appendChild(myH);

  // horizontal rule
  var myHr = document.createElement("hr");
  myHr.style.borderRadius = "2px";
  myHr.style.padding = "5px 10px";
  var borderColor = document.getElementById("fontColor").value
  myHr.style.borderColor = borderColor;
  placeholder.appendChild(myHr);

  // Create the card title
  var myH3 = document.createElement("h3");
  myH3.innerHTML = document.getElementById("titleEvent").value;
  placeholder.appendChild(myH3);

  /* Write out the date
     not sure if we want a date, leaving for now */
  var myDiv2 = document.createElement("div");
  var date = new Date(document.getElementById("dateEvent").value);
  myDiv2.innerHTML = date.toLocaleDateString();
  placeholder.appendChild(myDiv2);

  // Write out the message
  var messageDiv = document.createElement("div");
  var customMessage = document.getElementById("customMessage").value;
  messageDiv.innerHTML = customMessage;
  placeholder.appendChild(messageDiv);

  // Insert the image
  appendSelectedImage(placeholder);

} // end applyStyles()


/*****************************************************
 * Apply Styling to Placeholder
 * 
 * @param {*} placeholder placeholder to append
 ****************************************************/
function applyPlaceholderStyles(placeholder){

  // set the general styles for the #placeholder 
  //  width: 650px; text - align: center;  
  //  font - size: 18px; padding: 10px 10px;
  //  vertical - align: top;
  placeholder.style.width = "650px";
  placeholder.style.fontSize = "18px";
  placeholder.style.borderWidth = "10px";
  placeholder.style.padding = "10px 10px";
  placeholder.style.textAlign = "center";
  placeholder.style.verticalAlign = "top";
  placeholder.style.cssText = "color:white";
  placeholder.style.lineHeight = "2em";
  placeholder.style.padding = "10px 10px";

  // font family
  var fontFamily = document.getElementById("fontFamily").value;
  placeholder.style.fontFamily = fontFamily;

  // font color
  var fontColor = document.getElementById("fontColor").value;
  placeholder.style.color = fontColor;

  // background color
  var bgColor = document.getElementById("backgroundColor").value;
  placeholder.style.backgroundColor = bgColor;

  // Borders
  placeholder.style.borderStyle = document.getElementById("borderStyle").value;

  placeholder.style.borderColor = document.getElementById("fontColor").value;
} // end apply placeholder styles


/**************************************************
 * Append Selected Image
 * 
 * void function that determines the selected image
 * and appends it to the placeholder with the opacity.
 * 
 * The ideea is that the images would have a 
 * transpparent background and overlay an example 
 * blank gift card that has numbers using z-index
 * 
 * @param {*} placeholder placeholder to append
 **************************************************/
function appendSelectedImage(placeholder){

  // Get the imageId associated with the checked radio button
  var imageId = null;
  var imageRadioButtons = document.getElementsByName("rbgImage");
  for (var i = 0, len = imageRadioButtons.length; i < len; i++) {
    if (imageRadioButtons[i].checked) {
        imageId = imageRadioButtons[i].id;
        break; // break out of for loop
    }
  }
 
  // if there was an image selected
  if (null != imageId) {
    // get the image out of the dictionary
    const imageDictionary = getImageDictionary();
    var imageValueArray = imageDictionary[imageId];
    var imageLabel = imageValueArray[0];
    var imageUrl = imageValueArray[1];

    // get values from teh form
    var fontColor = document.getElementById("fontColor").value;
    var opacity = document.getElementById("imageOpacity").value;
    opacity = opacity * 0.01

    // create the image element and set it's properties
    var imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    imageElement.alt = imageLabel;
    imageElement.style.borderWidth = "2px";
    imageElement.style.borderColor = fontColor;
    imageElement.style.borderStyle = "solid";
    imageElement.style.opacity = opacity;
    imageElement.style.width = "75%";

    // append the image
    placeholder.appendChild(imageElement);
  } else{
    //TODO: Add in a blank image.
  }
} // end appendSelectedImage


/*****************************************************
 * Get Image Dictionary
 * 
 * Returns a dictionary object with the images.
 * This could be a global variable but putting it into
 * a function becasue it might be generated by backend
 * or sourced from a cloud object storage.
 ****************************************************/
function getImageDictionary(){
   // id:[label, url]
  const imageDictionary ={
    'image1':['Confetti','../images/homework10/confetti.jpg'],
    'image2':['Streamers','../images/homework10/streamers.jpg'],
    'image3':['Image 3','../images/homework10/penants.png']
  };
  return imageDictionary;
} // end getImageDictionary
