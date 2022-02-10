# Declaring Variables

JS, like most programming languages, wants the programmer to **declare** the variables.

This tells the interpreter (the JS Engine, such as Node JS, or the JS Engine of a browser) to allocate space in memory to hold the value.

Where and how a variable is declared determines the **scope**, which says what code has access to read the variable as well as impacting when the variable is no longer needed. (JS variables can still be used when their scope is exited, as long as there is still a reference to the variable, but that's a discussion for Scopes.)

## Multiple kinds of declarations

If you are coming from other programming languages you may be used to declaring the **type** of a variable, that is, saying what kind of data it can hold.  JavaScript does not have this association.  The type of data goes with the data, not the variable.  A value might be a Number or a String, but any variable can hold either value.

What JavaScript DOES have is multiple ways to declare a variable.  Understanding the differences, particularly when new to the language, can involve a few rounds of learning a difference and then learning what that MEANS.

### var

Variables can be declared with `var`:

```
var message = 'hello world';
console.log(message);
```

`var` declares the variable to exist within the current **function** scope.  If you aren't in a function, you are in the GLOBAL scope and it is treated as a function scope.

```
var message = 'hello world';

function usesOuter() { 
  console.log(message);
}

function usesInner() { 
  var message = 'hello cats';
  console.log(message);
}

usesOuter(); // "hello world"
usesInner(); // "hello cats"
```

This shows different scopes - the outer scope (global, in this case) where the variable "message" holds 'hello world' and an in inner function scope where a different variable named "message" holds 'hello cats'.

#### Lexical Scoping

This also shows **lexical scoping** at work - usesOuter() doesn't have a variable named "message" in its scope, so it checks the enclosing scope.  usesInner() DOES have a variable named "message" in its scope, so it doesn't check the enclosing scope.  Lexical scoping is true regardless of how the variable is declared, but the variable declaration says which scope a variable will be in if lexical scoping comes into play.

#### Hoisting

"Hoisting" (common interview question) means that the interpreter acts as if the variable was declared earlier than it is. In JS, this means the variable acts as if it is declared (but not initialized to any value) at the start of the function. (thus, the declaration is "hoisted" to the top).

When does this matter? When you refer to that variable before the declaration.

#### Avoiding `var`

There is nothing fully wrong with `var`.  However, the alternatives have benefits that `var` doesn't, so you should make use of them.  

The reasons to avoid `var`:

- `var` is function-scoped, so if you use it in a loop or other block, it "escapes", possibly causing confusion:
```
for( var count = 0; count < 10; count++ ) { 
  // Do stuff
}

console.log(count); // what happens here?
```

The code implies that `count` shouldn't exist outside of the for loop.  However, if you run this code you will see that it exists and has a value (10). Further, if we had a `count` declared and used before the for loop, its value was overwritten in the for loop. That may be unusual, but with a common name like "count" it is certainly a possibility.  Using `let` instead of `var` removes this confusion and potential bug.

- `var` will declare global variables when used outside of a function/module

You can easily check this in your browser:
```
var cat = 'Jorts';
```
If you check `window.cat` you will see it is "Jorts".  The "window" object is the global scope, that's where all global values (such as `console` or `Math` or `Array`) are defined, and now you've defined the global variable `cats`, overwriting anything that had been there previously.  `let` and `const` do not have this side-effect.

- `var` doesn't convey extra information

Programming is communication with other developers, including your future self.  `var` doesn't give much information, but if you prefer to use `const` and use `let` only when you do reassign the variable, that is additional information provided without extra typing.

### `let`

`let` works vary similar to `var` - we are declaring and possibly initializing variables.  The main differences:

- `let` is **block** scope.  A function is a block, so many `let` declarations work just like `var` in this respect, but an `if` statement can(should) have a block, a `for` loop should have a block, etc.  If your variable is declared with `let` in one of these, then it can only be referred to from that scope (or a scope that that scope encloses, such as nested for loops)
- `let` does not hoist.  What you see is what you get.  It can be argued that this means `let` is LESS complex compared to `var`. 
- `let` does not assign to the global scope, even if run outside a function/block scope.


#### Is `let` better than `var`
As you can see, `let` is basically superior to `var`: fewer issues to consider, better control over the scope impacted.

One place that this can cause some confusion is when you have a variable inside an if/else:

```
let check = 'test';
if(check.length > 4) { 
  let isLongWord = true;
} else { 
  let isLongWord = false;
}
console.log(isLongWord);  // throws error as `isLongWord` is not defined
```
the solution is to move the declaration of the flag variable outside the blocks:
```
let check = 'test';
let isLongWord;
if(check.length > 4) { 
  isLongWord = true;
} else { 
  isLongWord = false;
}
console.log(isLongWord);  // correctly is `false`
```

This example can be made more simple by defaulting `isLongWord` to `true`, but that is left as an exercise for the reader as it is outside the point we are demonstrating.

Remember that a lot of example code you see in various tutorials and documentation will use `var`: That's most likely because they are picking the version that is the absolute easiest and most compatible with everyone.  Those devs that understand let and const can translate for their code, and those that don't will have working code that is less confusing to them.

### `const`
`const` is very simple, but that simplicity can be deceiving, particularly for devs that are used to a `const` keyword from other languages.

`const` is identical to `let`, with the additional note that a variable declared with const cannot be reassigned to refer to a different value.

This is NOT the same as saying "the value does not change".  If the variable refers to an array or object, it is still the SAME array or object when a value IN the array or object changes.

```
const demo = [ 1, 2, 3 ];
demo.push(4); // perfectly allowed
console.log(demo); // 1 2 3 4
demo = [3]; // Error - reassigning a const variable
```

#### Prefering `const`

I teach that you should avoid `var` because of the benefits non-hoisting block-scoped declarations give.  But why do I teach that you should prefer to use `const` over `let`?  What's wrong with `let`?

Answer: Nothing is wrong with `let`.  The reason I teach this is because of the communication benefit you get from using `const` everywhere you can.

While skimming over code, objects and arrays can be assigned as values in different places: different variables and/or different elements in other objects and arrays.  These are not "copies" - the value stored is a reference to the same object/array as the original:

```
let demo = [ 1, 2, 3 ];
let other = demo;
let container = { unrelated: "text", reference: demo };
// now we change the array from one reference:
container.reference[1] = 10;
console.log(demo); // 1 10 3
console.log(other); // 1 10 3
console.log(container.reference); // 1 10 3
```

Occasionally copies (a new array/object containing the same values) ARE made, or other values are assigned  Perhaps the developer wants to use the values for a purpose that may change them, but doesn't want to alter the original values.  Perhaps the developer wants to use the values as they exist now, and doesn't want to risk that some other part of the program may change them.  Most likely, some piece of logic has decided that the original values may normally work for a given purpose, but won't work this time, so a new value is assigned to the variable the rest of the code uses. Regardless of the reason, they reassign the variable.  When you are reading their code, it is easy to miss that the copy of the values happened (as opposed to a copy of the reference) unless you are reading every line.  As discussed in class, most of your time is spent skimming code, not reading every line.

```
let demo = [ 1, 2, 3 ];
let other = demo;
let container = { unrelated: "text", reference: demo };
// copies the array values into a new array:
other = [...demo];
// now we change the array from one reference:
container.reference[1] = 10;
console.log(demo); // 1 10 3 - CHANGED
console.log(other); // 1 2 3 - NOT CHANGED
console.log(container.reference); // 1 10 3 - CHANGED
```

While skimming, I'm likely to see the variables get assigned, because the variable names are important to understanding most code (code that is written better than this generic example).  I'll also likely notice what the end result of the variables are (the console.log() here).  And lastly, I'll get an impression of what the code "did" (calculated a new value for an element of the array).  But unless I am checking closely, I can easily miss that the three values are no longer the same array.

Now look what happens when we use `const` everywhere we can:
```
const demo = [ 1, 2, 3 ];
let other = demo;
const container = { unrelated: "text", reference: demo };
// copies the array values into a new array:
other = [...demo];
// now we change the array from one reference:
container.reference[1] = 10;
console.log(demo); // 1 10 3 - CHANGED
console.log(other); // 1 2 3 - NOT CHANGED
console.log(container.reference); // 1 10 3 - CHANGED
```

We can use `const` for most of the variables, but as `other` gets reassigned, we cannot use `const` and must use `let`.  This means when someone reads the code, in that initial part where the variables are assigned, `other` stands out as being different.  We have told the reader that `other` gets reassigned later, because everything is told that they cannot be reassigned.  `other` jumps out as different to a skimming user.

This is a fairly subtle point, and many instructors would argue that there's no need for new developers to worry about that level of detail.  They are correct - preferring `const` is not a dramatic impact to your code.  However, I choose to emphasize this because the underlying principle (using your code to communicate) IS an essential skill.  






