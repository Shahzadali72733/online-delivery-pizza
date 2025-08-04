// src/features/order/CreateOrder.jsx
import {
  Form,
  useActionData,
  useNavigation,
  redirect,
  useRouteError,
} from 'react-router-dom';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import { createOrder } from '../../services/apiRestaurant';

// Phone validation regex
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

function CreateOrder() {
  const username = useSelector((state) => state.user.Username);
  const cart = useSelector((state) => state.cart.cart);
  const formErrors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full" type="text" name="address" required />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />

        <Button disabled={isSubmitting} type="primary">
          {isSubmitting ? 'Placing order...' : 'Order now'}
        </Button>
      </Form>
    </div>
  );
}

// ✅ FIXED action() with error handling and logging
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };

  console.log("📦 Sending order to API:", order);

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please provide a valid phone number.';
    return errors;
  }

  try {
    const newOrder = await createOrder(order);
    return redirect(`/order/${newOrder.id}`);
  } catch (err) {
    console.error("❌ Failed to create order:", err);
    throw err; // triggers error boundary
  }
}

// Optional error boundary if needed
export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div className="p-8 text-center text-red-600">
      <h1 className="text-2xl font-bold mb-4">Something went wrong 😢</h1>
      <p>{error.message || 'An unknown error occurred.'}</p>
      <a href="/" className="text-blue-500 underline mt-4 block">← Go back</a>
    </div>
  );
}

export default CreateOrder;
