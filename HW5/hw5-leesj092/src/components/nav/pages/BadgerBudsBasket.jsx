import { useContext, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import ListGroup from "react-bootstrap/ListGroup";

export default function BadgerBudsBasket(props) {
  const buds = useContext(BadgerBudsDataContext);
  const [savedBuds, setSavedBuds] = useState([]);

  useEffect(() => {
    const savedIds = JSON.parse(sessionStorage.getItem("savedCatIds") || "[]");
    const adoptedIds = JSON.parse(
      sessionStorage.getItem("adoptedCatIds") || "[]"
    );
    const availableBuddies = buds.filter(
      (bud) => !adoptedIds.includes(bud.id) && savedIds.includes(bud.id)
    );
    setSavedBuds(availableBuddies);
  }, [buds]);

  const handleUnselect = (id) => {
    const budName = savedBuds.find((bud) => bud.id === id)?.name;

    const newSavedIds = JSON.parse(
      sessionStorage.getItem("savedCatIds") || "[]"
    ).filter((budId) => budId !== id);
    sessionStorage.setItem("savedCatIds", JSON.stringify(newSavedIds));

    if (budName) {
      alert(`${budName} has been removed from your basket!`);
    }

    setSavedBuds((prevBuds) => prevBuds.filter((bud) => bud.id !== id));
  };

  const handleAdopt = (id) => {
    const budName = savedBuds.find((bud) => bud.id === id)?.name;
    const adoptedIds = JSON.parse(
      sessionStorage.getItem("adoptedCatIds") || "[]"
    );
    adoptedIds.push(id);
    sessionStorage.setItem("adoptedCatIds", JSON.stringify(adoptedIds));

    if (budName) {
      alert(`${budName} has been adopted!`);
    }

    handleUnselect(id);
  };
  return (
    <div>
      {savedBuds.length > 0 ? (
        savedBuds.map((bud) => (
          <Card
            key={bud.id}
            style={{ width: "18rem", marginBottom: "1rem", overflow: "auto" }}
          >
            <Card.Img
              variant="top"
              src={`https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${bud.imgIds[0]}`}
              style={{
                width: "100%",
                height: "14rem",
                objectFit: "cover",
              }}
              alt={`A picture of ${bud.name}`}
            />
            <Card.Body>
              <Card.Title>{bud.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item
                style={{ display: "flex", justifyContent: "space-evenly" }}
              >
                <Button onClick={() => handleUnselect(bud.id)}>Unselect</Button>
                <Button
                  style={{ backgroundColor: "grey" }}
                  onClick={() => handleAdopt(bud.id)}
                >
                  ❤️ Adopt
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ))
      ) : (
        <div className="text-center">You have no buds in your basket!</div>
      )}
    </div>
  );
}
