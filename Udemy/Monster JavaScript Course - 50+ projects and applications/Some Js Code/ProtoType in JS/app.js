function Person(first, last) {
	this.firstName = first;
	this.lastName = last;
}

Person.prototype.fullName = function() {
	return `${this.firstName} ${this.lastName}`;
}

const user1 = new Person("Laurance", "svekis");
console.log(user1);
console.log(user1.fullName());

//

Date.prototype.addDays = function (days) {
	return new Date(this.valueOf() + days * 864e5)
}

console.log(new Date().addDays(117));