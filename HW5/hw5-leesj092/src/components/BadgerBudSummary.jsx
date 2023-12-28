import { Button, Card, Carousel } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";

export default function BadgerBudSummary(props) {
  const [showMore, setShowMore] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedCats = JSON.parse(sessionStorage.getItem("savedCatIds") || "[]");
    setSaved(savedCats.includes(props.id));
  }, [props.id]);

  const prettyAge = (months) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years == 0) {
      return `${remainingMonths} month(s) old`;
    } else if (remainingMonths == 0) {
      return `${years} year(s) old`;
    } else {
      return `${years} year(s) and ${remainingMonths} month(s) old`;
    }
  };

  const handleSave = () => {
    alert(`${props.name} has been added to your basket!`);
    props.saveCat(props.id);
    setSaved(true);
  };

  return (
    // Referenced https://react-bootstrap.netlify.app/docs/components/cards/
    <Card style={{ width: "18rem", marginBottom: "1rem", overflow: "auto" }}>
      {showMore ? (
        <Carousel
          controls={props.imgIds.length > 1}
          indicators={props.imgIds.length > 1}
        >
          {props.imgIds.map((imgId, index) => (
            <Carousel.Item key={index}>
              <Card.Img
                variant="top"
                src={`https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${imgId}`}
                style={{
                  width: "100%",
                  height: "14rem",
                  objectFit: "cover",
                }}
                alt={`A picture of ${props.name}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Card.Img
          variant="top"
          src={`https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${props.imgIds[0]}`}
          style={{
            width: "100%",
            height: "14rem",
            objectFit: "cover",
          }}
          alt={`A picture of ${props.name}`}
        />
      )}
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        {showMore && (
          <>
            <p>{props.gender}</p>
            <p>{props.breed}</p>
            <p>{prettyAge(props.age)}</p>
            <p>{props.description}</p>
          </>
        )}
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <Button onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show Less" : "Show More"}
          </Button>
          <Button style={{ backgroundColor: "grey" }} onClick={handleSave}>
            ❤️ Save
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
