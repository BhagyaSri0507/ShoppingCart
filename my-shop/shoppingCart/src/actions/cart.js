export const addItemToCart = (product) => {
    return {
        type: "ADD_ITEM_TO_CART",
        product: { ...product, quantity: "1", totalCost: product.cost }
    }
}
export const updateQuantity = (id, quantity) => {
    return {
        type: "UPDATE_QUANTITY",
        id,
        quantity
    }
}
export const removeItem = (id) => ({
    type: "REMOVE_ITEM",
    id
})