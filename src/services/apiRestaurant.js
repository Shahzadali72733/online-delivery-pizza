const API_URL = 'https://react-fast-pizza-api.jonas.io/api';

// Get full menu
export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  if (!res.ok) {
    const errorText = await res.text();
    throw Error(`Failed getting menu: ${res.status} ${res.statusText} - ${errorText}`);
  }

  const { data } = await res.json();
  return data;
}

// Get order by ID
export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);

  if (!res.ok) {
    const errorText = await res.text();
    throw Error(`Couldn't find order #${id}: ${res.status} ${res.statusText} - ${errorText}`);
  }

  const { data } = await res.json();
  return data;
}

// Create new order
export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw Error(`Failed creating your order: ${res.status} ${res.statusText} - ${errorText}`);
    }

    const { data } = await res.json();
    return data;
  } catch (err) {
    throw Error(err.message || 'Unknown error occurred while creating your order.');
  }
}

// Update existing order
export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw Error(`Failed updating your order: ${res.status} ${res.statusText} - ${errorText}`);
    }

    // If successful, we don't need to return anything
  } catch (err) {
    throw Error(err.message || 'Unknown error occurred while updating your order.');
  }
}
