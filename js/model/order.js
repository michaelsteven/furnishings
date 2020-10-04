/****************************************************************
* order.js
* Mike Hepfer
*
* Model object for holding order data
****************************************************************/

class Order {
  nameFirst;
  nameMiddle;
  nameLast;
  mailingAddress = null;
  areasOfInterest;
  fruitCake;


  rowIndex=0;
  constructor(row) {
    if(null != row){
      this.rowIndex = row.rowIndex -1; // last selected index
    }
  }

  /***** Getters and Setters ********/
  getNameFirst(){
    return this.nameFirst;
  }

  setNameFirst(nameFirst){
    this.nameFirst = nameFirst;
  }

  getNameMiddle(){
    return this.nameMiddle;
  }

  setNameMiddle(nameMiddle){
    this.nameMiddle = nameMiddle;
  }

  getNameLast(){
    return this.nameLast;
  }
  
  setNameLast(nameLast){
    this.nameLast = nameLast;
  }

  getMailingAddress(){
    return this.mailingAddress;
  }

  setMailingAddress(mailingAddress){
    this.mailingAddress = mailingAddress;
  }

  getAreasOfInterest(){
    return this.areasOfInterest;
  }

  setAreasOfInterest(areasOfInterest){
    this.areasOfInterest = areasOfInterest;
  }

  getFruitCake(){
    return this.fruitCake;
  }

  setFruitCake(fruitCake){
    this.fruitCake = fruitCake;
  }

  getRowIndex(){
    return this.rowIndex;
  }
  
  setRowIndex(rowIndex){
    this.rowIndex = rowIndex;
  }
}