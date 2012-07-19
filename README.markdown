value.js
=======

value.js is an attempt at creating strict, immutable value objects in JavaScript.  It will work in both the browser or by requiring with node.

disclaimer
=======

I am not a javascript or node expert.  This is likely a very naive and greasy solution and may likely cause javascript and node purists to nerdrage.  In specific, the equality algorithm is likely naive and broken in edge cases.  Please contribute!

basic usage
=======

Define a value object type and use it!

````javascript

var Person = Value.define("firstName", "lastName", "age");

var john = new Person({firstName: "John", lastName: "Smith", age: 40});

// john.firstName == "John"
// john.lastName == "Smith"
// john.age == 40

````

immutability
=======

You cannot modify the attributes!

````javascript

var john = new Person({firstName: "John", lastName: "Smith", age: 40});
john.firstName = "Bob"

````

The above setter will either do nothing, leaving the original value of firstName set to "John", or if you enable JavaScript's strict mode it will throw a TypeError

requires all values
========

Value objects must be constructed with all values

````javascript

var john = new Person({firstName: "John", lastName: "Smith", age: 40}); // Succeeds!
var bob = new Person({firstName: "Bob"}); // thows a TypeError!

````

custom properties
========

Value objects allow for simple calculated properties.  You should not abuse this to make your value objects do anything complex!

````javascript

var BetterPerson = Value.define("firstName", "lastName", {
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
});

var john = new Person({firstName: "John", lastName: "Smith"});

// john.fullName == "John Smith";

````

equality
=======

Values objects are considered equal if all their types and attribute values are equal. See the tests for specific example.
