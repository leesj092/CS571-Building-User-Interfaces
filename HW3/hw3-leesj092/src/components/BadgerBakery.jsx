import { useEffect, useState } from "react";
import BakedGood from "./BakedGood";
import { Col, Container, Row } from "react-bootstrap";

export default function BadgerBakery() {
  const [bakedGoods, setBakedGoods] = useState([]);
  const [featuredItem, setFeaturedItem] = useState(null);

  useEffect(() => {
    fetch("https://cs571.org/api/f23/hw3/all-baked-goods", {
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBakedGoods(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://cs571.org/api/f23/hw3/featured-baked-good ", {
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFeaturedItem(data);
      });
  }, []);

  return (
    <div>
      <h1>Badger Bakery</h1>
      <p>Welcome to our small-town bakery located in Madison, WI!</p>
      {featuredItem == undefined ? (
        <p>Loading...</p>
      ) : (
        <p>
          <b>
            Today's featured item is {featuredItem.name} for $
            {featuredItem.price}!
          </b>
        </p>
      )}
      <Container>
        <Row>
          {bakedGoods.map((bakedGood) => {
            return (
              <Col key={bakedGood.name} xs={12} md={6} lg={4} xl={3}>
                <BakedGood
                  name={bakedGood.name}
                  description={bakedGood.description}
                  price={bakedGood.price}
                  featured={bakedGood.featured}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
