import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import Student from "./Student";

const Classroom = () => {
  const [students, setStudents] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputMajor, setInputMajor] = useState("");
  const [inputInterest, setInputInterest] = useState("");
  const [shownStudents, setShownStudents] = useState([]);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    fetch("https://cs571.org/api/f23/hw4/students", {
      headers: {
        "X-CS571-ID":
          "bid_0337ae917ebffe93a9485f3344038ad2dcefe1c62f948f76c81eeb8f3b418d6c",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStudents(data);
        setShownStudents(data);
      });
  }, []);

  useEffect(() => {
    let filtered = students.filter((student) => {
      const nameMatch = inputName
        ? (
            student.name.first.toLowerCase() +
            " " +
            student.name.last.toLowerCase()
          ).includes(inputName.trim().toLowerCase())
        : true;

      const majorMatch = inputMajor
        ? student.major.toLowerCase().includes(inputMajor.trim().toLowerCase())
        : true;

      const interestMatch = inputInterest
        ? student.interests.some((interest) =>
            interest.toLowerCase().includes(inputInterest.trim().toLowerCase())
          )
        : true;

      return nameMatch && majorMatch && interestMatch;
    });

    setShownStudents(filtered);
    setActivePage(1);
  }, [inputName, inputMajor, inputInterest, students]);

  const handleReset = () => {
    setInputName("");
    setInputMajor("");
    setInputInterest("");
  };

  const buildPaginator = () => {
    let pages = [];
    const num_pages = Math.ceil(shownStudents.length / 24);
    pages.push(
      <Pagination.Item
        key="prev"
        disabled={activePage === 1 || shownStudents.length === 0}
        onClick={() => setActivePage((prev) => prev - 1)}
      >
        Previous
      </Pagination.Item>
    );

    for (let i = 1; i <= num_pages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={activePage === i}
          onClick={() => setActivePage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    pages.push(
      <Pagination.Item
        key="next"
        disabled={activePage === num_pages || shownStudents.length === 0}
        onClick={() => setActivePage((prev) => prev + 1)}
      >
        Next
      </Pagination.Item>
    );

    return pages;
  };

  return (
    <div>
      <h1>Badger Book - Fall 2023</h1>
      <p>Search for students below!</p>
      <hr />
      <Form>
        <Form.Label htmlFor="searchName">Name</Form.Label>
        <Form.Control
          id="searchName"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <Form.Label htmlFor="searchMajor">Major</Form.Label>
        <Form.Control
          id="searchMajor"
          value={inputMajor}
          onChange={(e) => setInputMajor(e.target.value)}
        />
        <Form.Label htmlFor="searchInterest">Interest</Form.Label>
        <Form.Control
          id="searchInterest"
          value={inputInterest}
          onChange={(e) => setInputInterest(e.target.value)}
        />
        <br />
        <Button variant="neutral" onClick={handleReset}>
          Reset Search
        </Button>
      </Form>
      <p>There are {shownStudents.length} student(s) matching your search.</p>
      <Container fluid>
        <Row>
          {shownStudents
            .slice(24 * (activePage - 1), 24 * activePage)
            .map((stud) => (
              <Col key={stud.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                {" "}
                <Student {...stud} />{" "}
              </Col>
            ))}
        </Row>
      </Container>
      <br />
      <Pagination>{buildPaginator()}</Pagination>
    </div>
  );
};

export default Classroom;
