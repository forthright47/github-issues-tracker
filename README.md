## 1️⃣ What is the difference between `var`, `let`, and `const`?

In JavaScript, `var`, `let`, and `const` are used to declare variables, but they behave differently.

- **var** is the older way of declaring variables. It is **function-scoped**, which means it is accessible within the function where it is declared. It also allows **re-declaration and reassignment**, which can sometimes cause unexpected behavior.

- **let** was introduced in ES6. It is **block-scoped**, meaning it only exists inside the block `{}` where it is declared. Unlike `var`, it **cannot be redeclared**, but it **can be reassigned**.

- **const** is also block-scoped like `let`, but its value **cannot be reassigned after it is declared**. It is usually used for variables whose values should remain constant.

### Example

```javascript
var a = 10;
var a = 20; ✅ Allowed

let b = 10;
let b = 20; ❌ Not allowed

const c = 10;
c = 20; ❌ Not allowed
```
## 2️⃣ What is the Spread Operator (`...`)?

The **spread operator (`...`)** is used to expand elements of an array or properties of an object. It helps copy or combine arrays and objects easily.

### Example with an Array

```javascript
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];

console.log(newNumbers);
// Output: [1, 2, 3, 4, 5]
```

### Example with an Object

```javascript
const user = { name: "Tuhin", age: 23 };

const updatedUser = { ...user, city: "Dhaka" };

console.log(updatedUser);
// Output: { name: "Tuhin", age: 23, city: "Dhaka" }
```

The spread operator is commonly used when we want to **copy or merge data without modifying the original data**.

## 3️⃣ What is the difference between `map()`, `filter()`, and `forEach()`?

These three methods are used to work with arrays, but they serve different purposes.

- **map()** is used when we want to transform each element of an array and create a **new array**.
- **filter()** is used when we want to select certain elements from an array based on a **condition**.
- **forEach()** is used to run a function for each element in the array, but it **does not return a new array**.

### Example

```javascript
const numbers = [1, 2, 3, 4];

const doubled = numbers.map(num => num * 2);
// Output: [2, 4, 6, 8]

const evenNumbers = numbers.filter(num => num % 2 === 0);
// Output: [2, 4]

numbers.forEach(num => {
  console.log(num);
});
// Output: 1, 2, 3, 4
```

## 4️⃣ What is an Arrow Function?

An **arrow function** is a shorter way of writing functions in JavaScript. It was introduced in ES6 to make function syntax simpler and cleaner.

### Example

```javascript
const add = (a, b) => {
  return a + b;
};
```

Shorter version:

```javascript
const add = (a, b) => a + b;
```

Arrow functions are commonly used in modern JavaScript, especially with array methods like `map()`, `filter()`, and `forEach()`.

## 5️⃣ What are Template Literals?

**Template literals** are a modern way to write strings in JavaScript using backticks (`` ` ``). They allow us to insert variables or expressions directly inside a string using `${}`.

### Example

```javascript
const name = "Tuhin";
const age = 23;

const message = `My name is ${name} and I am ${age} years old.`;

console.log(message);
// Output: My name is Tuhin and I am 23 years old.
```

Template literals make code **more readable and easier to write**, especially when working with dynamic strings.