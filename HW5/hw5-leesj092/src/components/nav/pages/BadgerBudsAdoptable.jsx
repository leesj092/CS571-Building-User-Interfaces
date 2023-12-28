import { Container, Col, Row } from "react-bootstrap";
import BadgerBudSummary from "../../BadgerBudSummary";
import { useContext, useEffect, useState } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";

export default function BadgerBudsAdoptable(props) {
  const buds = useContext(BadgerBudsDataContext);
  const [savedCats, setSavedCats] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(sessionStorage.getItem("savedCatIds") || "[]");
    setSavedCats(saved);
  }, []);

  const handleSaveCat = (catId) => {
    const newSavedCats = [...savedCats, catId];
    sessionStorage.setItem("savedCatIds", JSON.stringify(newSavedCats));
    setSavedCats(newSavedCats);
  };

  const adoptedCats = JSON.parse(
    sessionStorage.getItem("adoptedCatIds") || "[]"
  );

  return (
    <div>
      <h1>Available Badger Buds</h1>
      <p>The following cats are looking for a loving home! Could you help?</p>
      <Container>
        <Row>
          {buds.filter(
            (bud) =>
              !savedCats.includes(bud.id) && !adoptedCats.includes(bud.id)
          ).length > 0 ? (
            buds
              .filter(
                (bud) =>
                  !savedCats.includes(bud.id) && !adoptedCats.includes(bud.id)
              )
              .map((bud) => {
                return (
                  <Col key={bud.id} xs={12} md={6} lg={4} xl={3}>
                    <BadgerBudSummary
                      id={bud.id}
                      name={bud.name}
                      imgIds={bud.imgIds}
                      gender={bud.gender}
                      breed={bud.breed}
                      age={bud.age}
                      description={bud.description}
                      saveCat={handleSaveCat}
                    />
                  </Col>
                );
              })
          ) : (
            <Col className="text-center">
              No buds are available for adoption!
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
