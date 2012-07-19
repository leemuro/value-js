"use strict";

var assert = require('assert');
var Value = require('../value');

var Person = Value.define('firstName', 'lastName', 'age');
var CoolPerson = Value.define('firstName', 'lastName', 'age');

var Order = Value.define('customer', 'total');

describe('value', function() {
  it('can get attributes', function() {
    var p = new Person({firstName:'John', lastName:'Smith', age:25});
    assert.equal(p.firstName, 'John', 'gets first name');
    assert.equal(p.lastName, 'Smith', 'gets last name');
    assert.equal(p.age, 25, 'gets age');
  });

  it('requires all attributes', function() {
    assert.throws(function() { 
      new Person({firstName:'John', lastName:'Smith'});
    }, TypeError);
  });

  describe('immutability', function() {
    it('cannot set attributes', function() {
      var p = new Person({firstName:'John', lastName:'Smith', age:25});
      assert.throws(function() { p.firstName = 'Bob'; }, TypeError);
    });

    it('cannot define new attributes', function() {
      var p = new Person({firstName:'John', lastName:'Smith', age:25});
      assert.throws(function() { p.eyeColor = 'Bob'; }, TypeError);
    });
  });

  describe('custom attributes', function() {
    var BetterPerson = Value.define('firstName', 'lastName', 'age', {
      fullName: function() {
        return this.firstName + ' ' + this.lastName;
      }
    });
    var p1 = new BetterPerson({firstName:'John', lastName:'Smith', age:25});
    assert.equal(p1.fullName, 'John Smith');
  });

  describe('equality', function() {
    it('is equal if all attribute values are equal', function() {
      var p1 = new Person({firstName:'John', lastName:'Smith', age:25});
      var p2 = new Person({firstName:'John', lastName:'Smith', age:25});
      assert.ok(p1.equals(p2));
    });

    it('is not equal if any attribute values are different', function() {
      var p1 = new Person({firstName:'John', lastName:'Smith', age:25});
      var p2 = new Person({firstName:'Bob', lastName:'Smith', age:25});
      assert.ok(!p1.equals(p2));
    });

    it('is not equal if types are different', function() {
      var p1 = new Person({firstName:'John', lastName:'Smith', age:25});
      var p2 = new CoolPerson({firstName:'John', lastName:'Smith', age:25});
      assert.ok(!p1.equals(p2));
    });
  });

  describe('deep equality', function() {
    it('is equal if nested values are equal', function() {
      var p1 = new Person({firstName:'John', lastName:'Smith', age:25});
      var p2 = new Person({firstName:'John', lastName:'Smith', age:25});
      var o1 = new Order({customer: p1, total: 100.00});
      var o2 = new Order({customer: p2, total: 100.00});
      assert.ok(o1.equals(o2));
    });

    it('is not equal if nested values are not equal', function() {
      var p1 = new Person({firstName:'John', lastName:'Smith', age:25});
      var p2 = new Person({firstName:'Bob', lastName:'Smith', age:25});
      var o1 = new Order({customer: p1, total: 100.00});
      var o2 = new Order({customer: p2, total: 100.00});
      assert.ok(!o1.equals(o2));
    });
  });
});
