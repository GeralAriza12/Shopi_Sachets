/**
 * Está función calcula el precio total de los productos 
 * @param {Array} products cartProduct: Array of objects
 * @returns {Number} Total price
 */
export const totalPrice = (products) => {
    return products.reduce((sum, product) => sum + product.price, 0)
} 