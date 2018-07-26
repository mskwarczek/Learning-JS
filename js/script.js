'use strict';

function Phone(brand, price, color) {
	this.brand = brand;
	this.price = price;
	this.color = color;
}

Phone.prototype.getWarrantyCost = function() {
	return (this.price * 0.1);
}

Phone.prototype.printInfo = function() {
	console.log("The phone brand is " + this.brand + ", color is " + this.color + " and the price is " + this.price + ". Extended warranty cost is " + this.getWarrantyCost() + ".");
}

var samsungGalaxyS6 = new Phone("Samsung", 2000, "black");
var iPhone6S = new Phone("Apple", 3000, "silver");
var onePlusOne = new Phone("OnePlus", 1000, "white");

samsungGalaxyS6.printInfo();
iPhone6S.printInfo();
onePlusOne.printInfo();
