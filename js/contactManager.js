/****************************************************************
* contactManager.js
* Mike Hepfer
*
* An object with helper classes used by the catalog request page 
* to preform operations related to CRUD of items in the contacts
* array.
****************************************************************/

class ContactManager {

  // object representing the selected contact
  contact = "";  

  /*****************************************
   * Update arrays and displayed table
   ****************************************/
  fillTable() {
    // sort the array
    this.nameSort();

    // clear out the table
    var rows = table.getElementsByTagName("tr");
    for (let j=rows.length-1; j>0; j--) {
      table.deleteRow(j);
    }

    // loop through the array
    for (let i=0; i<contacts.length; i++) {
      // add a new row to the table
      var row = table.insertRow(rows.length);
      row.setAttribute("onclick","contactManager.selectContact(this)");
      row.insertCell(0).innerHTML = contacts[i][0];
      row.insertCell(1).innerHTML = contacts[i][2];
      row.insertCell(2).innerHTML = contacts[i][3][2];
      row.insertCell(3).innerHTML = contacts[i][3][3];
      row.insertCell(4).innerHTML = contacts[i][3][4];
    }
  } // end fillTable


  /***********************************************
   * Select Contact
   * 
   * Called when the table row is clicked
   * @param {*} row 
   **********************************************/
  selectContact(row){
    var contact = this.buildContactForRow(row);
    this.populateForm( contact  );
    this.contact = contact;
  } // end selectContact


  /***********************************************
   * Adds the form values to the table as a new row
   ***********************************************/
  add() {
    // check validity
    if(! form.checkValidity() ){
      alert("form is not valid");
      return;
    }

    // add a new row to the array
    contacts.push(new Array(6));
    contacts[contacts.length-1][3] = new Array(5);
    contacts[contacts.length-1][4] = new Array(0);
   
    // new up a contact object
    var contact = new Contact(null);
    contact.setRowIndex(contacts.length - 1);
    
    // put the values from the form into the new Contact object
    this.updateContactFromForm( contact);

    // update the row in the contacts array
    this.UpdateContactsArrayRow(contact);

    // resort and repopulate the table
    this.fillTable();

    // clear the form and selected contact
    this.cancel();
  } // end add


  /***********************************************
   * Replaces values for an existing row
   **********************************************/
  replace() {
    // check validity
    if(! form.checkValidity() ){
      alert("form is not valid");
      return;
    }

    // propmt the user to confirm before deleting
    if( ! confirm("Are you sure you want to replace?") ){
      return;
    }

    // put the values from the form into the selected Contact object
    this.updateContactFromForm( this.contact); 

    // update the row in the contacts array
    this.UpdateContactsArrayRow(this.contact);

    // resort and repopulate the table
    this.fillTable();

    // clear the form and the selected contact
    this.cancel();
  } // end replace


  /***************************************************************
   * Removes the selected property from properties array and from table
   ***************************************************************/
  delete() {

    // propmt the user to confirm before deleting
    if( ! confirm("Are you sure you want to delete?") ){
      return;
    }

    // remove the row from the table
    table.deleteRow( this.contact.getRowIndex() + 1 );
    contacts.splice( this.contact.getRowIndex(), 1);
    
    // clear the form and selected contact
    this.cancel();
  } // end deleteProperty


  /**************************************************
   * The Cancel Method
   * 
   * clears the form and resets the selected property
   **************************************************/
  cancel() {
    var inputElements = form.getElementsByTagName("input");
    for (let i=0; i< inputElements.length; i++) {
      if("button" != inputElements[i].type ){
        if("radio" == inputElements[i].type){
          inputElements[i].checked = false;
        } else{
          inputElements[i].value = "";
        }
      }
    }

    var seletElements = form.getElementsByTagName("select");
    for (let i=0; i< seletElements.length; i++) {
      for(let option of seletElements[i].options){
        option.selected = false;
      }
    }

    // clear out the selected contact
    this.contact = "";
  } // end cancel


  /* #####################################################
  /  ############   Internal Methods   ###################
  /  ####################################################*/


  /****************************************
   * sorts the array by first name
   ***************************************/
  nameSort() {
    contacts.sort( 
      function(a,b) {
        return (a[0] < b[0]) ? -1 : (a[0] > b[0]) ? 1 : 0;  
      }
    );    
  } // end nameSort 


  /*******************************************
   * Updates the contact with the form values
   * 
   * @param {*} contact 
   ******************************************/
  updateContactFromForm(contact){
    // update the name
    contact.setNameFirst ( form.elements.namedItem("nameFirst").value );
    contact.setNameMiddle( form.elements.namedItem("nameMiddle").value );
    contact.setNameLast( form.elements.namedItem("nameLast").value );

    // update the areas of interest
    var areasOfInterestSelect = form.elements.namedItem("areasOfInterest");
    var selectedItems = [];
    for (let i = 0; i < areasOfInterestSelect.length; i++) {
        if (areasOfInterestSelect.options[i].selected ){
          selectedItems.push(areasOfInterestSelect.options[i].value);
        }
    }
    contact.setAreasOfInterest(selectedItems);

    // get the referral radio button value
    var elements = form.elements.namedItem("referral"); 
    for(let i = 0; i < elements.length; i++) { 
      if(elements[i].checked){
        contact.setReferral( elements[i].value );
        break;
      } 
    } // end updateContactFromForm

    // set the address
    var address = contact.getMailingAddress();
    if(null == address){
      address = new Address();
    }
    address.setStreet1( form.elements.namedItem("street1").value );
    address.setStreet2( form.elements.namedItem("street2").value );
    address.setCity( form.elements.namedItem("city").value );
    address.setState( form.elements.namedItem("state").value );
    address.setZip( form.elements.namedItem("zip").value );
    contact.setMailingAddress( address );
  } // end updateContactFromForm


  /**************************************************
   * Populate Form
   * 
   * Populates the form data in the form from data in 
   * a Contact object
   * 
   * @param Contact contact 
   **************************************************/
  populateForm(contact){
    // populate the name fields
    form.elements.namedItem("nameFirst").value = contact.getNameFirst(); 
    form.elements.namedItem("nameMiddle").value = contact.getNameMiddle();
    form.elements.namedItem("nameLast").value =  contact.getNameLast();
    
    // populate the address fields
    var mailingAddress = contact.getMailingAddress();
    form.elements.namedItem("street1").value = mailingAddress.getStreet1();
    form.elements.namedItem("street2").value = mailingAddress.getStreet2();
    form.elements.namedItem("city").value = mailingAddress.getCity();
    form.elements.namedItem("state").value = mailingAddress.getState();
    form.elements.namedItem("zip").value = mailingAddress.getZip();

    // set the values of the listbox
    if(null != contact.getAreasOfInterest() ){
      var selectBox = form.elements.namedItem("areasOfInterest");
      for(let option of selectBox.options){
        if( contact.getAreasOfInterest().includes(option.value) ) {
          option.selected = true;
        } else {
          option.selected = false;
        }
      }
    }

    // check the referral radio button
    form.elements.namedItem( contact.getReferral() ).checked = true;
  } // end populateForm


  /****************************************************
   * Build Contact for Row
   * 
   * Builds a Contact object from a row in the Contacts
   * array
   *
   *  @param {*} row 
   **************************************************/
  buildContactForRow(row){
    // new up an instance of Contact
    var contact = new Contact(row);
    var rowIndex = contact.getRowIndex();

    // set properties from the row in the Contacts array
    contact.setNameFirst ( contacts[rowIndex][0] );
    contact.setNameMiddle( contacts[rowIndex][1] );
    contact.setNameLast(  contacts[rowIndex][2] );
    contact.setAreasOfInterest( contacts[rowIndex][4] );
    contact.setReferral( contacts[rowIndex][5] );

    var address = new Address();
    address.setStreet1( contacts[rowIndex][3][0] );
    address.setStreet2( contacts[rowIndex][3][1] );
    address.setCity( contacts[rowIndex][3][2] );
    address.setState( contacts[rowIndex][3][3] );
    address.setZip( contacts[rowIndex][3][4] );
    contact.setMailingAddress( address );

    // return with the new contact
    return contact;
  } // end buildContactForRow


  /**************************************************
   * Update Contacts Array Row
   * 
   * Updates a row in the Contracts Array using the
   * values in a Contact object
   * 
   * @param {*} contact 
   *************************************************/
  UpdateContactsArrayRow(contact){
    var rowIndex = contact.getRowIndex();
    var address = contact.getMailingAddress();
    contacts[rowIndex][0] = contact.getNameFirst();
    contacts[rowIndex][1] = contact.getNameMiddle();
    contacts[rowIndex][2] = contact.getNameLast();
    contacts[rowIndex][4] = contact.getAreasOfInterest();
    contacts[rowIndex][5] = contact.getReferral();
    contacts[rowIndex][3][0] = address.getStreet1();
    contacts[rowIndex][3][1] = address.getStreet2();
    contacts[rowIndex][3][2] = address.getCity();
    contacts[rowIndex][3][3] = address.getState();
    contacts[rowIndex][3][4] = address.getZip();
  } // UpdateContactsArrayRow

}