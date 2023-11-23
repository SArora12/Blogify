import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { addBlog } from "../store/blogSlice";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";

const Add = () => {
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate("/");

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    setValidated(true);

    if (form.checkValidity() === true) {
      const id = uuid();
      const title = event.target.title.value;
      const category = event.target.category.value;
      const description = event.target.description.value;
      
      dispatch(addBlog({ id, title, category, description }));
      // redirect to home page
      navigate("/");
    }

    
  };

  return (
    <>
      <Button
        type="button"
        bg="light"
        variant="dark"
        onClick={() => navigate("/")}
        style={{
          justifyContent: "center",
          position: "relative",
          top: "80%",
          left: "10%",
          marginBottom: "25px",
        }}
      >
       
        BACK
      </Button>
      <Card
        border="primary"
        text={"dark"}
        style={{
          width: "70rem",
          justifyContent: "center",
          position: "relative",
          top: "50%",
          left: "15%",
          marginBottom: "25px",

          className: "mb-2",
        }}
      >
        <Card.Header>
          <h2 style={{ justifyContent: "center", textAlign: "center" }}>
            Add Blog
          </h2>
        </Card.Header>

        <Card.Body>
         
          <div
            className="mx-auto col-12  col-lg-12"
            style={{
              width: "70rem",
              justifyContent: "center",
              position: "relative",
              top: "50%",
              left: "7%",
              marginBottom: "25px",

              className: "mb-2",
            }}
          >
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="10" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter Title"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please provide title
                  </Form.Control.Feedback>
                </Form.Group>
                <br></br>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="10" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter category"
                    autocomplete="off"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please provide category
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="10" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="text"
                    placeholder="Describe about your experience..."
                    required
                  />
            

                  <Form.Control.Feedback type="invalid">
                    Please provide some story :
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Button type="submit">Submit</Button>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Add;
