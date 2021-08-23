Create a RegExp by defining some parts with strings and other parts with RegExp.

```js
import partRegex from 'part-regex' // npm install part-regex

// Only match strings `/product/[0-9]+/edit`
const productUrlRegex = partRegex`/product/${/[0-9]+/}/edit`
console.log(productUrlRegex.test('/product/42/edit')) // Prints `true`
```
