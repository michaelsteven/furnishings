/****************************************************************
* contact.js
* Mike Hepfer
*
* Model object for holding contact data
****************************************************************/

class Contact {
  nameFirst;
  nameMiddle;
  nameLast;
  mailingAddress = null;
  areasOfInterest;
  referral;


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

  getReferral(){
    return this.referral;
  }

  setReferral(referral){
    this.referral = referral;
  }

  getRowIndex(){
    return this.rowIndex;
  }
  
  setRowIndex(rowIndex){
    this.rowIndex = rowIndex;
  }
}