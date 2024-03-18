/**
 * Está función calcula el precio total de los productos 
 * @param {Array} products cartProduct: Array of objects
 * @returns {Number} Total price
 */
export const totalPrice = (products) => {
    const total = products.reduce((sum, product) => sum + product.price, 0)
    return Number(total.toFixed(2));
} 