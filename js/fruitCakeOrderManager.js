/****************************************************************
* orderManager.js
* Mike Hepfer
*
* An object with helper classes used by the catalog request page 
* to preform operations related to CRUD of items in the orders
* array.
****************************************************************/

class FruitCakeOrderManager {

  // object representing the selected order
  order = "";  

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
    for (let i=0; i<orders.length; i++) {
      // add a new row to the table
      var tableRow = table.insertRow(rows.length);
      tableRow.setAttribute("onclick","fruitCakeOrderManager.selectOrder(this)");
      tableRow.insertCell(0).innerHTML = orders[i][0];
      tableRow.insertCell(1).innerHTML = orders[i][2];
      tableRow.insertCell(2).innerHTML = orders[i][3][2];
      tableRow.insertCell(3).innerHTML = orders[i][3][3];
      tableRow.insertCell(4).innerHTML = orders[i][3][4];
      tableRow.insertCell(5).innerHTML = orders[i][5];
    }
  } // end fillTable


  /***********************************************
   * Select Order
   * 
   * Called when the table row is clicked
   * @param {*} row 
   **********************************************/
  selectOrder(row){
    
    var order = this.buildOrderForRow(row);
    this.populateForm(order);
    this.order = order;
  } // end selectOrder


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
    orders.push(new Array(6));
    orders[orders.length-1][3] = new Array(5);
    orders[orders.length-1][4] = new Array(0);
   
    // new up a order object
    var order = new Order(null);
    order.setRowIndex(orders.length - 1);
    
    // put the values from the form into the new order object
    this.updateOrderFromForm( order);

    // update the row in the orders array
    this.updateOrdersArrayRow(order);

    // resort and repopulate the table
    this.fillTable();

    // clear the form and selected order
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

    // put the values from the form into the selected order object
    this.updateOrderFromForm( this.order); 

    // update the row in the orders array
    this.updateOrdersArrayRow(this.order);

    // resort and repopulate the table
    this.fillTable();

    // clear the form and the selected order
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
    table.deleteRow( this.order.getRowIndex() + 1 );
    orders.splice( this.order.getRowIndex(), 1);
    
    // clear the form and selected order
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

    // clear out the selected order
    this.order = "";
  } // end cancel


  /* #####################################################
  /  ############   Internal Methods   ###################
  /  ####################################################*/


  /****************************************
   * sorts the array by first name
   ***************************************/
  nameSort() {
    orders.sort( 
      function(a,b) {
        return (a[0] < b[0]) ? -1 : (a[0] > b[0]) ? 1 : 0;  
      }
    );    
  } // end nameSort 


  /*******************************************
   * Updates the order with the form values
   * 
   * @param {*} order 
   ******************************************/
  updateOrderFromForm(order){
    // update the name
    order.setNameFirst ( form.elements.namedItem("nameFirst").value );
    order.setNameMiddle( form.elements.namedItem("nameMiddle").value );
    order.setNameLast( form.elements.namedItem("nameLast").value );

    // update the areas of interest
    var areasOfInterestSelect = form.elements.namedItem("areasOfInterest");
    var selectedItems = [];
    for (let i = 0; i < areasOfInterestSelect.length; i++) {
        if (areasOfInterestSelect.options[i].selected ){
          selectedItems.push(areasOfInterestSelect.options[i].value);
        }
    }
    order.setAreasOfInterest(selectedItems);

    // get the fruitCake radio button value
    var elements = form.elements.namedItem("fruitCake"); 
    for(let i = 0; i < elements.length; i++) { 
      if(elements[i].checked){
        order.setFruitCake( elements[i].value );
        break;
      } 
    } // end updateorderFromForm

    // set the address
    var address = order.getMailingAddress();
    if(null == address){
      address = new Address();
    }
    address.setStreet1( form.elements.namedItem("street1").value );
    address.setStreet2( form.elements.namedItem("street2").value );
    address.setCity( form.elements.namedItem("city").value );
    address.setState( form.elements.namedItem("state").value );
    address.setZip( form.elements.namedItem("zip").value );
    order.setMailingAddress( address );
  } // end updateOrderFromForm


  /**************************************************
   * Populate Form
   * 
   * Populates the form data in the form from data in 
   * a order object
   * 
   * @param order order 
   **************************************************/
  populateForm(order){
    // populate the name fields
    form.elements.namedItem("nameFirst").value = order.getNameFirst(); 
    form.elements.namedItem("nameMiddle").value = order.getNameMiddle();
    form.elements.namedItem("nameLast").value =  order.getNameLast();
    
    // populate the address fields
    var mailingAddress = order.getMailingAddress();
    form.elements.namedItem("street1").value = mailingAddress.getStreet1();
    form.elements.namedItem("street2").value = mailingAddress.getStreet2();
    form.elements.namedItem("city").value = mailingAddress.getCity();
    form.elements.namedItem("state").value = mailingAddress.getState();
    form.elements.namedItem("zip").value = mailingAddress.getZip();

    // set the values of the listbox
    if(null != order.getAreasOfInterest() ){
      var selectBox = form.elements.namedItem("areasOfInterest");
      for(let option of selectBox.options){
        if( order.getAreasOfInterest().includes(option.value) ) {
          option.selected = true;
        } else {
          option.selected = false;
        }
      }
    }

    // check the fruitCake radio button
    form.elements.namedItem( order.getFruitCake() ).checked = true;
  } // end populateForm


  /****************************************************
   * Build order for Row
   * 
   * Builds a order object from a row in the orders
   * array
   *
   *  @param {*} row 
   **************************************************/
  buildOrderForRow(row){
    // new up an instance of order
    var order = new Order(row);
    var rowIndex = order.getRowIndex();

    // set properties from the row in the orders array
    order.setNameFirst ( orders[rowIndex][0] );
    order.setNameMiddle( orders[rowIndex][1] );
    order.setNameLast(  orders[rowIndex][2] );
    order.setAreasOfInterest( orders[rowIndex][4] );
    order.setFruitCake( orders[rowIndex][5] );

    var address = new Address();
    address.setStreet1( orders[rowIndex][3][0] );
    address.setStreet2( orders[rowIndex][3][1] );
    address.setCity( orders[rowIndex][3][2] );
    address.setState( orders[rowIndex][3][3] );
    address.setZip( orders[rowIndex][3][4] );
    order.setMailingAddress( address );

    // return with the new order
    return order;
  } // end buildOrderForRow


  /**************************************************
   * Update orders Array Row
   * 
   * Updates a row in the Contracts Array using the
   * values in a order object
   * 
   * @param {*} order 
   *************************************************/
  updateOrdersArrayRow(order){
    var rowIndex = order.getRowIndex();
    var address = order.getMailingAddress();
    orders[rowIndex][0] = order.getNameFirst();
    orders[rowIndex][1] = order.getNameMiddle();
    orders[rowIndex][2] = order.getNameLast();
    orders[rowIndex][4] = order.getAreasOfInterest();
    orders[rowIndex][5] = order.getFruitCake();
    orders[rowIndex][3][0] = address.getStreet1();
    orders[rowIndex][3][1] = address.getStreet2();
    orders[rowIndex][3][2] = address.getCity();
    orders[rowIndex][3][3] = address.getState();
    orders[rowIndex][3][4] = address.getZip();
  } // updateOrdersArrayRow

}