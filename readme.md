Create a RegExp by defining some parts with strings and other parts with RegExp.

```js
import partRegex from 'part-regex' // npm install part-regex

// Only match strings `/product/[0-9]+/edit`
const productEditPageUrl = partRegex`/product/${/[0-9]+/}/edit`
console.log(productEditPageUrl.test('/product/42/edit')) // Prints `true`

// Also supports a mix of String and RegEx variables.
// == Note how the first part is a RegEx and the second part is a string.
const userPageUrl = (isSettingsPage) => partRegex`/user/${/[a-zA-Z]+/}${isSettingsPage ? '/settings' : ''}`
console.log(userPageUrl(true).test('/user/brillout/settings')) // Prints `true`
console.log(userPageUrl(false).test('/user/turing')) // Prints `true`
```
