import { GroceryItems } from "../constants/grocery-items"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateCart } from "../reducer/ShoppingCartSlice";
import { useEffect } from "react";

const ShoppingMenu = () => {
    const shoppingCartItems = useSelector(state => state.shoppingCart);
    const [updatedGroceryItems, setUpdatedGroceryItems] = useState([]);
    console.log(shoppingCartItems);
    const [showQuantityField, setShowQuantityField] = useState({});
    const [quantity, setQuantity] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (shoppingCartItems?.length) {
            const updatedItems = GroceryItems.map(item => {
                const match = shoppingCartItems.find(cartItem => cartItem.id === item.id);
                return match ? { ...item, ...match } : item;
            });
            setUpdatedGroceryItems(updatedItems);
        } else {
            setUpdatedGroceryItems([]);
        }
    }, [shoppingCartItems]);



    const onAddClick = (item) => {
        setShowQuantityField(prev => ({ ...prev, [item.id]: true }));
        setQuantity(prev => ({ ...prev, [item.id]: 1 }));
        dispatch(addToCart(item));
    }

    const handleInputChange = (e, item) => {
        const val = parseInt(e.target.value) || 0;

        setQuantity(prev => ({ ...prev, [item.id]: val }));
        dispatch(updateCart({ val, id: item.id }));

        if (val === 0) {
            setShowQuantityField(prev => ({ ...prev, [item.id]: false }));
            dispatch(removeFromCart(item.id))
        }
    }

    return (
        <div className="row m-0 p-4">
            {(
                shoppingCartItems?.length > 0
                    ? (updatedGroceryItems?.length > 0 ? updatedGroceryItems : GroceryItems)
                    : GroceryItems
            ).map((item) => (
                <div className="col-3 mb-5" key={item.id}>
                    <Card variant="outlined" >
                        <CardMedia
                            component="img"
                            height="194"
                            image={item.image}
                            alt={item.name}
                            style={{ width: '100%', objectFit: 'cover' }}
                        />
                        <div className="mb-2">{item.name}</div>
                        <div className="mb-3">Price: {item.price} Rs</div>
                        {
                            showQuantityField[item.id] || item.quantity > 0 ? <TextField
                                type="number"
                                id="quantity"
                                label="Quantity"
                                variant="outlined"
                                value={item.quantity ?? 0}
                                className="filter-width-small"
                                title="Quantity"
                                onInput={(e) => handleInputChange(e, item)}
                            /> : <button className="btn btn-light" onClick={() => onAddClick(item)}>Add</button>
                        }
                    </Card>
                </div>
            ))}

        </div>
    )
}

export default ShoppingMenu
