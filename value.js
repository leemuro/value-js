(function(exports) {
  exports.define = function() {
    // Build list of value's keys and custom properties
    var keys = [], customProps;
    for(var i in arguments) {
      var arg = arguments[i];
      if(typeof arg == "string")
        keys.push(arg);
      else if(typeof arg == "object")
        customProps = arg;
    }

    // Define the value type
    return function(obj) {

      // Require exact number of values in the constructor
      if(Object.keys(obj).length != keys.length)
        throw new TypeError('Incorrect number of attribute values specified');

      // Define getters for attributes
      for(var i in keys) {
        var attr = keys[i];
        var val = obj[attr];
        (function(obj, attr, val) {
          obj.__defineGetter__(attr, function() {
            return val;
          });
        })(this, attr, val);
      }

      // Define getters for custom property functions
      for(var prop in customProps) {
        var func = customProps[prop];
        (function(obj, attr, attrFunc) {
          obj.__defineGetter__(attr, function() {
            return attrFunc.call(obj);
          });
        })(this, prop, func);
      }

      // Define equality for value objects
      this.equals = function(otherValue) {
        if(this.constructor != otherValue.constructor)
          return false;

        for(var i in keys) {
          var attr = keys[i];
          if(this[attr].equals) {
            if(!this[attr].equals(otherValue[attr]))
              return false;
          }
          else {
            if(this[attr] !== otherValue[attr])
              return false;
          }
        }
        return true;
      }

      // Freeze the object to prevent mutation or further extensibility
      Object.freeze(this);
    }
  }
}(typeof exports === 'undefined' ? this.Value = {} : exports));
