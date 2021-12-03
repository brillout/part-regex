import { partRegex } from './dist/partRegex.js'

const productEditPageUrl = partRegex`/product/${/[0-9]+/}/edit`
console.log(productEditPageUrl.test('/product/42/edit')) // Prints `true`

const userPageUrl = (isSettingsPage) => partRegex`/user/${/[a-zA-Z]+/}${isSettingsPage ? '/settings' : ''}`
console.log(userPageUrl(true).test('/user/brillout/settings')) // Prints `true`
console.log(userPageUrl(false).test('/user/turing')) // Prints `true`
