const messsage : string = 'hello world';
console.log(messsage);

const numbers : number[] = [1,2,3,4];
const messages : string[] = ['hello', 'world'];

console.log(numbers);
console.log(messages);

let mightBeUndefined : string | undefined = undefined;
let nullableNumber : number | null = null;

console.log(mightBeUndefined);
console.log(nullableNumber);


function sum(x : number, y : number) : number{
    return x+y;
}
console.log(sum(1,2));

function sumArray(arr : number[]) : number{
    return arr.reduce((acc, current) => acc + current, 0);
}

sumArray([1,2,3,4,5]);


interface Shape{
    getArea() : number;
}

class Circle implements Shape{
    constructor(public radius : number){
        this.radius = radius;
    }
    getArea(){
        return this.radius * this.radius * Math.PI;
    }
}

class Rectangle implements Shape {
    constructor(private   width: number, private  height: number) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}

const shapes : Shape[] = [new Circle(5), new Rectangle(10,5)];
shapes.forEach(shape => {
    console.log(shape.getArea());
});

console.log(new Circle(5).radius)
//console.log(new Rectangle(10,5).width); // 에러 발생.
