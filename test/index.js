const bind = require('../src/index');

test1('bind2 是一个函数');
test2('this 调用');
test3('this调用并能传参');
test4('this调用，并能后传参数');
test5('bind 能实现 new');
test6('bind 能实现 new, 并且继承原型');


function test1(message) {
  console.log(message);
  Function.prototype.bind2 = bind;
  console.assert(Function.prototype.bind2 !== undefined);
}

function test2(message) {
  console.log(message);
  const fn = function (p1, p2) {
    return [this, p1, p2];
  };

  const fn2 = fn.bind2({ name: 'frank' });
  console.assert(fn2()[0].name === 'frank');
}

function test3(message) {
  console.log(message);
  const fn = function (p1, p2) {
    return [this, p1, p2];
  };
  const fn2 = fn.bind2({ name: 'frank' }, 123, 234);
  console.assert(fn2()[0].name === 'frank');
  console.assert(fn2()[1] === 123);
  console.assert(fn2()[2] === 234);
}

function test4(message) {
  console.log(message);
  const fn = function (p1, p2) {
    return [this, p1, p2];
  };
  const otherFn1 = fn.bind2({ name: 'frank' }, 123);
  console.assert(otherFn1()[0].name === 'frank');
  console.assert(otherFn1()[1] === 123);
  console.assert(otherFn1(234)[2] === 234);
}

function test5(message) {
  console.log(message);
  const fn = function (p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };
  const fn2 = fn.bind2(undefined,'p1', 'p2');
  const object = new fn2();
  console.assert(object.p1 === 'p1');
  console.assert(object.p2 === 'p2');
}

function test6(message) {
  console.log(message);
  const fn = function (p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };
  fn.prototype.sayHi = function() {}
  const fn2 = fn.bind2(undefined,'p1', 'p2');
  const object = new fn2();
  console.assert(object.p1 === 'p1', 'p1');
  console.assert(object.p2 === 'p2');
  console.assert(typeof object.sayHi === 'function')
}



