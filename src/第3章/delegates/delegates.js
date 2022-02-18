/**
 * Expose `Delegator`.
 */

 module.exports = Delegator;

 /**
  * Initialize a delegator.
  *
  * @param {Object} proto
  * @param {String} target
  * @api public
  */
 
 function Delegator(proto, target) {
   if (!(this instanceof Delegator)) return new Delegator(proto, target);
   this.proto = proto;
   this.target = target;
   this.methods = [];
   this.getters = [];
   this.setters = [];
   this.fluents = [];
 }
 
 /**
  * Automatically delegate properties
  * from a target prototype
  *
  * @param {Object} proto
  * @param {object} targetProto
  * @param {String} targetProp
  * @api public
  */
 
 Delegator.auto = function(proto, targetProto, targetProp){
   var delegator = Delegator(proto, targetProp);
   var properties = Object.getOwnPropertyNames(targetProto);
   for (var i = 0; i < properties.length; i++) {
     var property = properties[i];
     var descriptor = Object.getOwnPropertyDescriptor(targetProto, property);
     if (descriptor.get) {
       delegator.getter(property);
     }
     if (descriptor.set) {
       delegator.setter(property);
     }
     if (descriptor.hasOwnProperty('value')) { // could be undefined but writable
       var value = descriptor.value;
       if (value instanceof Function) {
         delegator.method(property);
       } else {
         delegator.getter(property);
       }
       if (descriptor.writable) {
         delegator.setter(property);
       }
     }
   }
 };
 
 /**
  * Delegate method `name`.
  *
  * @param {String} name
  * @return {Delegator} self
  * @api public
  */
 
 Delegator.prototype.method = function(name){
   var proto = this.proto;
   var target = this.target;
   // 存入 methods 数组中
   this.methods.push(name);
 
   // 以闭包的方式，将对 proto 方法的调用转为对 this[target] 上相关方法的调用
   // apply 改变 this 的指向为 this[target]
   proto[name] = function(){
     return this[target][name].apply(this[target], arguments);
   };
 
   // 返回 delegator 实例对象，从而实现链式调用
   return this;
 };
 
 /**
  * Delegator accessor `name`.
  *
  * @param {String} name
  * @return {Delegator} self
  * @api public
  */
 
 Delegator.prototype.access = function(name){
   return this.getter(name).setter(name);
 };
 
 /**
  * Delegator getter `name`.
  *
  * @param {String} name
  * @return {Delegator} self
  * @api public
  */
 
 Delegator.prototype.getter = function(name){
    var proto = this.proto;
    var target = this.target;
    this.getters.push(name); // 将属性名称存入对应类型的数组
  
    // 利用 __defineGetter__ 设置 proto 的 getter，
    // 使得访问 proto[name] 获取到的是 proto[target][name] 的值
    proto.__defineGetter__(name, function(){
      return this[target][name];
    });
    // 返回 delegator 实例，实现链式调用
    return this;
 };
 
 /**
  * Delegator setter `name`.
  *
  * @param {String} name
  * @return {Delegator} self
  * @api public
  */
 
 Delegator.prototype.setter = function(name){
    var proto = this.proto;
    var target = this.target;
    this.setters.push(name); // 将属性名称存入对应类型的数组
  
    // 利用 __defineSetter__ 设置 proto 的 setter，
    // 实现给 proto[name] 赋值时，实际改变的是 proto[target][name] 的值
    proto.__defineSetter__(name, function(val){
      return this[target][name] = val;
    });
  // 返回 delegator 实例，实现链式调用
    return this;
 };
 
 /**
  * Delegator fluent accessor
  *
  * @param {String} name
  * @return {Delegator} self
  * @api public
  */
 
 Delegator.prototype.fluent = function (name) {
   var proto = this.proto;
   var target = this.target;
   this.fluents.push(name);
 
   proto[name] = function(val){
     if ('undefined' != typeof val) {
       this[target][name] = val;
       return this;
     } else {
       return this[target][name];
     }
   };
 
   return this;
 };