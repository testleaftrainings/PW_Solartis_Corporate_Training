# JavaScript & TypeScript Fundamentals — Standard Training Notes

## 1. Operators

Operators are signs or symbols used to perform operations on values.

### Basic Arithmetic Operators

| Operator | Name | Purpose |
|---|---|---|
| `+` | Addition | Adds two values |
| `-` | Subtraction | Subtracts one value from another |
| `*` | Multiplication | Multiplies two values |
| `/` | Division | Divides one value by another |

### Example

```javascript
// Declare the first number.
var num1 = 60;

// Declare the second number.
var num2 = 20;

// Add num1 and num2.
console.log(num1 + num2); // 80

// Multiply num1 and num2.
console.log(num1 * num2); // 1200

// Divide num1 by num2.
console.log(num1 / num2); // 3
```

---

## 2. Increment and Decrement Operators

Increment and decrement operators increase or decrease a value by 1.

### Increment Operator `++`

```javascript
// Declare the age variable.
var age = 15;

// Increase the value of age by 1.
age++;

// Print the updated value.
console.log(age); // 16
```

### Decrement Operator `--`

```javascript
// Decrease the value of age by 1.
age--;

// Print the updated value.
console.log(age); // 15
```

### Pre-Increment and Post-Increment

#### Post-Increment: `a++`

The current value is used first, and then the value is increased by 1.

```javascript
// Declare the variable a.
var a = 10;

// Print the current value first and then increment a.
console.log(a++); // 10

// Print the updated value.
console.log(a); // 11
```

#### Pre-Increment: `++a`

The value is increased first, and then the updated value is used.

```javascript
// Increment a first and then print the value.
console.log(++a); // 12
```

### Pre-Decrement and Post-Decrement

```javascript
// Print the current value first and then decrement a.
console.log(a--); // 12

// Print the updated value.
console.log(a); // 11

// Decrement a first and then print the value.
console.log(--a); // 10
```

### Quick Reference

| Operator | Meaning |
|---|---|
| `a++` | Use first, then increase |
| `++a` | Increase first, then use |
| `a--` | Use first, then decrease |
| `--a` | Decrease first, then use |

---

## 3. Assignment and Comparison Operators

### Assignment Operator `=`

The assignment operator assigns a value to a variable.

```javascript
// Assign the value 1 to b.
var b = 1;
```

### Loose Equality `==`

`==` compares values and may perform type conversion.

### Strict Equality `===`

`===` compares both the value and the data type.

```javascript
// Store a string value in c.
var c = "Vineeth";

// Compare both value and data type.
console.log(c === "Vineeth"); // true
```

### Important Difference

```text
=   → Assignment
==  → Loose equality
=== → Strict equality
```

---

## 4. Data Types

The examples covered include:

- Number
- String
- Boolean
- BigInt

### Number

```javascript
// Declare a variable with a number value.
var fieldNumber = 100;

// Print the number.
console.log(fieldNumber);

// Print the data type.
console.log(typeof fieldNumber);
```

Output:

```text
100
number
```

### String

A string represents text.

```javascript
// Store a string value.
var nameOfPerson = "Bharth's";
```

### Boolean

A boolean contains either `true` or `false`.

```javascript
// Declare a boolean variable.
var isEnabled = false;
```

### Number.MAX_SAFE_INTEGER

```javascript
// Store the maximum safe integer.
var maxNumber = Number.MAX_SAFE_INTEGER;

// Print the maximum safe integer.
console.log(maxNumber);
```

Value:

```text
9007199254740991
```

### BigInt

BigInt is used for very large integer values. The `n` suffix identifies a BigInt literal.

```javascript
// Declare a BigInt value using the n suffix.
var num = 9007199254740995n;

// Print the BigInt value.
console.log(num);
```

Check its type:

```javascript
// Check the data type of the BigInt value.
console.log(typeof num); // bigint
```

### Data Type Quick Reference

| Example | Data Type |
|---|---|
| `100` | `number` |
| `"Bharth's"` | `string` |
| `false` | `boolean` |
| `9007199254740995n` | `bigint` |

---

## 5. Functions

A function is a reusable block of code designed to perform a particular task.

### Function Without Parameters

```typescript
// Define a function named add that returns a number.
function add(): number {

    // Declare the first number.
    let num1 = 10;

    // Declare the second number.
    let num2 = 20;

    // Return num1 from the function.
    return num1;
}

// Call the function and print the returned value.
console.log(add());
```

Output:

```text
10
```

### Addition Function

If the intention is to perform addition:

```typescript
// Define a function named add that returns a number.
function add(): number {

    // Declare the first number.
    let num1 = 10;

    // Declare the second number.
    let num2 = 20;

    // Add both numbers and return the result.
    return num1 + num2;
}

// Call the function and print the result.
console.log(add()); // 30
```

---

## 6. Function Parameters

Parameters allow a function to receive values from outside the function.

```typescript
// Define a login function with two string parameters.
function login(username: string, password: string) {

    // Print the username received through the parameter.
    console.log(username);

    // Print the password received through the parameter.
    console.log(password);
}

// Call the function with the first set of values.
login("Demo1", "Pass1");

// Call the function with the second set of values.
login("Demo2", "pass2");
```

Output:

```text
Demo1
Pass1
Demo2
pass2
```

### Parameters vs Arguments

In:

```typescript
function login(username: string, password: string)
```

`username` and `password` are **parameters**.

In:

```typescript
login("Demo1", "Pass1");
```

`"Demo1"` and `"Pass1"` are **arguments**.

### Why Use Parameters?

The same function can be reused with different values.

```typescript
// Call the same function with different credentials.
login("Demo1", "Pass1");

// Call the same function with another set of credentials.
login("Demo2", "Pass2");

// Call the same function with another set of credentials.
login("Demo3", "Pass3");
```

---

## 7. Function Return Type

TypeScript allows us to specify the type of value that a function returns.

Syntax:

```typescript
function functionName(): returnType {
    // code
}
```

Example:

```typescript
// Define a function that must return a number.
function add(): number {

    // Return a number value.
    return 30;
}
```

### `void` Return Type

If a function does not return a value, `void` can be used.

```typescript
// Define a function that accepts two strings and returns nothing.
function login(username: string, password: string): void {

    // Print the username.
    console.log(username);

    // Print the password.
    console.log(password);
}
```

### Quick Reference

```text
number → function returns a number
string → function returns a string
boolean → function returns true/false
void → function does not return a value
```

---

## 8. Conditional Statements

Conditional statements allow a program to make decisions based on conditions.

The structure covered is:

```text
if
else if
else
```

### Complete Example

```javascript
// Declare a variable with the value zero.
var d = 0;

// Check whether d is greater than zero.
if (d > 0) {

    // Print the message when d is positive.
    console.log("The number is positive");
}

// Check whether d is less than zero.
else if (d < 0) {

    // Print the message when d is negative.
    console.log("The number is negative");
}

// Execute this block when both previous conditions are false.
else {

    // Print the message when d is zero.
    console.log("The number is zero");
}
```

### Condition Evaluation

For `d = 0`:

```text
0 > 0 → false
0 < 0 → false
```

Therefore:

```text
The number is zero
```

### Flow

```text
             d
             |
          d > 0?
         /      \
       Yes       No
       |          |
   Positive     d < 0?
                /    \
              Yes     No
               |       |
           Negative   Zero
```

---

## 9. Synchronous and Asynchronous Execution

JavaScript normally executes statements sequentially. Some operations can be scheduled to execute later.

`setTimeout()` is an example of asynchronous behavior.

### Example

```javascript
// Print the username message immediately.
console.log("Code for entering username");

// Schedule the password message to execute after 5 seconds.
setTimeout(() => {

    // Print the password message after the timer completes.
    console.log("Code for entering password");

}, 5000);

// Print the login message immediately.
console.log("Code for click login");
```

### Actual Execution Order

```text
Code for entering username
Code for click login
Code for entering password
```

### Why?

The first `console.log()` executes immediately.

Then `setTimeout()` schedules its callback for later execution.

JavaScript continues with the next synchronous statement instead of waiting for the timer.

Therefore:

```text
1. Code for entering username
2. Code for click login
3. After approximately 5 seconds → Code for entering password
```

### Important Concept

`setTimeout()` does not stop JavaScript execution for 5 seconds.

It schedules the callback to execute after the specified delay.

---

# 10. Combined Quick Revision

## Operators

```text
+   Addition
-   Subtraction
*   Multiplication
/   Division
++  Increment
--  Decrement
=   Assignment
==  Loose equality
=== Strict equality
```

## Increment / Decrement

```text
a++ → use, then increase
++a → increase, then use
a-- → use, then decrease
--a → decrease, then use
```

## Data Types

```text
100                    → number
"Bharth's"             → string
false                  → boolean
9007199254740995n      → bigint
```

## Functions

```text
function name() {
    // code
}
```

Function with parameters:

```typescript
function login(username: string, password: string) {
    // code
}
```

Function with return type:

```typescript
function add(): number {
    return 30;
}
```

Function with no return value:

```typescript
function login(): void {
    // code
}
```

## Conditional Statements

```text
if       → first condition
else if  → additional condition
else     → when all previous conditions are false
```

## Asynchronous Example

```javascript
setTimeout(() => {
    // code to execute later
}, 5000);
```

---

# 11. Key Interview Points

1. `++` increases a value by 1.
2. `--` decreases a value by 1.
3. `a++` uses the current value before incrementing.
4. `++a` increments before using the value.
5. `=` is an assignment operator.
6. `==` performs loose equality comparison.
7. `===` performs strict equality comparison.
8. `number`, `string`, `boolean`, and `bigint` are different JavaScript data types.
9. `Number.MAX_SAFE_INTEGER` represents the maximum safe integer for the regular `number` type.
10. BigInt literals use the `n` suffix.
11. A function parameter receives a value when the function is called.
12. A function return type specifies the type of value the function should return.
13. `void` represents a function that does not return a value.
14. `if...else if...else` is used for decision making.
15. `setTimeout()` schedules a callback for later execution; it does not block the following synchronous statements.
