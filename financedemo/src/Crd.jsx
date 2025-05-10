import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col, Button, Spinner, Form } from 'react-bootstrap';
import axios from 'axios';

function Crd() {
  const [Name, setName] = useState('');  
  const [amt, setAmt] = useState(0);    // Total Interest
  const [cnt, setCnt] = useState(0);    // Total EMI Count
  const [intAmt, setIntAmt] = useState(0); // Total Paid Amount
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState('');   // User ID input field

  const fetchData = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:3000/cnt?uid=${userId}`);
      console.log("API Response:", response.data);

      const data = response.data;
      setName(data.user_name);
      setCnt(data.tran_count);
      setAmt(data.total_with_interest);
      setIntAmt(data.total_paid_amt);
    } catch (error) {
      console.error("API Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(1);  // By default, when page loads, fetch for uid=1
  }, []);

  const handleFetchUser = () => {
    if (uid) {
      fetchData(uid);  // Fetch based on entered UID
    } else {
      alert('Please enter a UID.');
    }
  };

  return (
    <Container className="my-4">

      <Form className="mb-4 d-flex" style={{ gap: '10px' }}>
        <Form.Control
          type="number"
          placeholder="Enter UID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
        />
        <Button variant="primary" onClick={handleFetchUser}>
           User 
        </Button>
      </Form>


      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <Row className="g-4 justify-content-center">
          <Col xs="auto">
            <Card border="primary" style={{ width: '18rem' }}>
              <Card.Header>Name: {Name}</Card.Header>
              <Card.Body>
                <Card.Title>₹ {amt}</Card.Title>
                <Card.Text>Total amount including interest.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="auto">
            <Card border="secondary" style={{ width: '18rem' }}>
              <Card.Header>Total Paid Money</Card.Header>
              <Card.Body>
                <Card.Title>₹ {intAmt}</Card.Title>
                <Card.Text>Overall money paid till now.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="auto">
            <Card border="success" style={{ width: '18rem' }}>
              <Card.Header>Paid EMI</Card.Header>
              <Card.Body>
                <Card.Title>{cnt} months</Card.Title>
                <Card.Text>Number of EMIs successfully paid.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Crd;
