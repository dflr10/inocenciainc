# **App Name**: E-legant Finds

## Core Features:

- Image Gallery: Display product images from the API endpoint (https://api-frontend-production.up.railway.app/api/products/125829257).
- Product Details: Show product title, brand, SKU, available sizes, color, full price, and discounted price based on data from the API endpoint (https://api-frontend-production.up.railway.app/api/products/125829257).
- Size Selection: Implement a size selection that dynamically updates the product details. Apply smooth transitions when changing the selected options
- Add to Cart Button: Implement a button to add the selected product (with size and color) to the shopping cart.
- Shopping Cart Summary: Display a summary of products added to the cart: image, name, price, quantity, total value, and option to delete. Persist cart data using localStorage.
- Related Products Showcase: Display a list of related products fetched from (https://api-frontend-production.up.railway.app/api/products?ft=tenis).
- Personalized Product Recommendations: Implement a generative AI tool that offers personalized product recommendations based on viewing history

## Style Guidelines:

- Primary color: Deep violet (#673AB7) to convey sophistication.
- Background color: Light gray (#F0F0F0) to create a clean and modern look.
- Accent color: Soft purple (#9575CD) for interactive elements and highlights.
- Body font: 'Inter', a sans-serif, for a clean and readable layout; also use 'Inter' for headlines
- Use minimalist, line-style icons for the shopping cart, size selection, and other interactive elements.
- Maintain a clean, grid-based layout with plenty of white space to give the interface a modern and un-cluttered look.
- Use subtle fade-in and slide-up animations when loading product images and transitioning between product details.