import { useDispatch, useSelector } from "react-redux";
import { decreaseItem, increaseItem } from "./cartSlice";
import { getCurrentQuantityById } from "./cartSlice";
import Button from "../../ui/Button";

function UpdateItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();

  const quantity = useSelector(getCurrentQuantityById(pizzaId));
  const cart = useSelector((state) => state.cart.cart);

  console.log("pizzaId prop received:", pizzaId);
  console.log("Quantity for this item:", quantity);
  console.log("Full cart:", cart);

  return (
    <div className="flex items-center gap-2">
      <Button type="round" onClick={() => dispatch(decreaseItem({ pizzaId }))}>
        -
      </Button>
      <span className="text-sm font-medium ">{quantity}</span>
      <Button type="round" onClick={() => dispatch(increaseItem({ pizzaId }))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
