function RosterCollection() {
	// extend array ES6+
	this.__proto__ = [];

	this.addItem = function (item) {
		this.push(new RosterItem(item));

		//allows for chaining
		return this;
	};

	// this.removeIt = function (item){
	//     this.splice(new RosterItem(item));

	//     return this;
	// };
}

// // pre ES6
RosterCollection.prototype = [];
RosterCollection.prototype.constructor = RosterCollection;

function RosterItem(record) {
	// //use composition to store the book/movie in the library item
	// this.record = record;

	// record.removeIt = function (item){
	//     this.splice(this.indexOf(item), 1);
	// };

	return record;
}

function Employee(name, email, position, salary, recordType) {
	this.name = name || "Default Name";
	this.email = email || "";
	this.position = position;
	this.salary = salary;
	this.recordType = recordType || "Employee";
}

function Customer(name, email, leadSource, consumerSpending, recordType) {
	this.name = name || "Default Title";
	this.email = email || "";
	this.leadSource = leadSource;
	this.consumerSpending = consumerSpending;
	this.recordType = recordType || "Customer";
}
