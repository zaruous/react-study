"use strict";
const messsage = 'hello world';
console.log(messsage);
const numbers = [1, 2, 3, 4];
const messages = ['hello', 'world'];
console.log(numbers);
console.log(messages);
let mightBeUndefined = undefined;
let nullableNumber = null;
console.log(mightBeUndefined);
console.log(nullableNumber);
function sum(x, y) {
    return x + y;
}
console.log(sum(1, 2));
function sumArray(arr) {
    return arr.reduce((acc, current) => acc + current, 0);
}
sumArray([1, 2, 3, 4, 5]);
class Circle {
    constructor(radius) {
        this.radius = radius;
        this.radius = radius;
    }
    getArea() {
        return this.radius * this.radius * Math.PI;
    }
}
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}
const shapes = [new Circle(5), new Rectangle(10, 5)];
shapes.forEach(shape => {
    console.log(shape.getArea());
});
console.log(new Circle(5).radius);
console.log(new Rectangle(10, 5).width);
