import Link from 'next/link';

const Item = ({ item }) => (
  <div>
    <h1>Product</h1>
    <Link
      href={{ pathname: `/${item.handle}`, }}>
      <a>{item.title}</a>
    </Link>
    <p>{item.description}</p>
    <img src={item.images.edges[0].node.transformedSrc} alt="" />
  </div>
);

export default Item;
