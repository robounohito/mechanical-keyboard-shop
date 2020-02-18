import { useState, useEffect } from "react";
import Item from "./[handle]";

let query = `
  query {
    Keyboard {
      name
    }
  }
`;

const Products = () => {

  const [state, setState] = useState({ loading: false, products: [] });

  useEffect(() => {
    setState({ ...state, loading: true });
    fetch('https://mechanical-keyboard-shop.myshopify.com/admin/api/graphql', {
      method: 'POST',
      credentials: 'include',
      mode: 'no-cors',
      headers: new Headers({
        'X-Shopify-Storefront-Access-Token': 'e70a4afc72a3aa7d7ea51bd894d0b0f9',
        'Content-Type': 'application/graphql',
      }),
      body: query,
    }).then(resp => resp.json())
      .then(({ data }) => setState({ loading: false, products: data.products }))
      .finally(() => setState({ ...state, loading: false }));
  });

  if (state.loading) {
    return (<div>Loading...</div>);
  }

  return (
    <div>
      {state.products.map(item => {
        <Item key={item.id} item={item} />
      })}
    </div>
  )

};

export default Products;