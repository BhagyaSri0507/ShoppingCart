export default (state = [], action) => {
    switch (action.type) {
        case "ADD_ITEM_TO_CART":
            return [
                ...state,
                {...action.product,totalCost:action.product.price}
            ];
        case "UPDATE_QUANTITY":
            debugger;
            return state.map((product) => {
                if (product.id === action.id) {
                    return {
                        ...product,
                        quantity: action.quantity,
                        totalCost: (parseInt(action.quantity) * parseInt(product.price)).toString()
                    };
                } else {
                    return product;
                };
            });
        case "REMOVE_ITEM":
            return state.filter(({ id }) => id !== action.id);
        default: return state;
    }
}