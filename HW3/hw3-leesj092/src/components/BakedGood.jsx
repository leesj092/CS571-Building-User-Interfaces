import { useState } from "react";
import { Button } from "react-bootstrap";

export default function BakedGood(props) {
  const [quantity, setQuantity] = useState(0);

  return (
    <div
      style={{
        backgroundColor: props.featured ? `AntiqueWhite` : undefined,
        border: `1px solid gray`,
        height: `250px`,
        width: `280px`,
        borderRadius: `10px`,
        margin: `15px 30px`,
      }}
    >
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <p>${props.price}</p>
      <div>
        <Button
          className="inline"
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity <= 0}
        >
          -
        </Button>
        <p className="inline">{quantity}</p>
        <Button className="inline" onClick={() => setQuantity(quantity + 1)}>
          +
        </Button>
      </div>
    </div>
  );
}
