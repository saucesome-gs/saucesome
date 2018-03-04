/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as Cart} from './cart'
export {default as AllProducts} from './all-products'
export {default as SingleProduct} from './singleproduct'
export {default as ProductForm} from './product-form'
export {default as EditForm} from './edit-form'
export {default as SearchForm} from './search-form'
export {default as SearchTag} from './search-tag'
export {default as ReviewForm} from './review-form'
export {default as Checkout} from './checkout';
export { default as AllOrders } from './all-orders';
