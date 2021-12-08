var slice = Array.prototype.slice;
function bind(asThis) {
  var args = slice.call(arguments, 1);
  var fn = this;
  if (!fn instanceof Function) {
    throw new Error("bind,必须在函数身上调用");
  }
  function resultFn() {
    return fn.apply(resultFn.prototype.isPrototypeOf(this) ? this : asThis, args.concat(slice.call(arguments)))
  }
  // 注意，若更改新函数的原型对象，则原函数的原型对象也会被改变。 地址引用， 解决方法：见下方 
  resultFn.prototype = fn.prototype
  return resultFn
}



module.exports = bind;


// es6
// function bind2(asThis, ...args) {
//   const fn = this;
//    function resultFn(...args2) {
//     return fn.call(resultFn.prototype.isPrototypeOf(this) ? this : asThis, ...args, ...args2);
//   };
//   resultFn.prototype = fn.prototype
//   return resultFn
// }


// 解决原型直接赋值引起的问题
// function bind3(asThis) {
//   var args = slice.call(arguments, 1);
//   var fn = this;
//   if (!fn instanceof Function) {
//     throw new Error("bind,必须在函数身上调用");
//   }
//   function resultFn() {
//     return fn.apply(resultFn.prototype.isPrototypeOf(this) ? this : asThis, args.concat(slice.call(arguments)))
//   }
//   var TempFn = function() {}
//   TempFn.prototype = fn.prototype
//   // 使用构造函数对原型的继承
//   resultFn.prototype = new TempFn()
//   return resultFn
//   // 方法二：使用Object.create() 对 fn 的原型进行浅拷贝 
//   // resultFn.prototype = Object.create(fn)
// }




