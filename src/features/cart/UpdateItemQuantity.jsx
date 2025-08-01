import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { decreaseItem, increaseItem } from "./cartSlice";

function UpdateItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();

  console.log("pizzaId prop received:", pizzaId); // <--- check this

  return (
    <div className="flex items-center gap-2">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItem({ pizzaId }))}
      >
        -
      </Button>
      <Button
        type="round"
        onClick={() => dispatch(increaseItem({ pizzaId }))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
