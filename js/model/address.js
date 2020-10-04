/****************************************************************
* address.js
* Mike Hepfer
*
* Model object for holding address data
****************************************************************/

class Address {
  street1
  street2
  city;
  state;
  zip;

  /** Getters and Setters */
  getStreet1(){
    return this.street1;
  }

  setStreet1(street1){
    this.street1 = street1;
  }

  getStreet2(){
    return this.street2;
  }

  setStreet2(street2){
    this.street2 = street2;
  }

  getCity(){
    return this.city;
  }

  setCity(city){
    this.city = city;
  }

  getState(){
    return this.state;
  }

  setState(state){
    this.state = state;
  }

  getZip(){
    return this.zip;
  }

  setZip(zip){
    this.zip = zip;
  }
}