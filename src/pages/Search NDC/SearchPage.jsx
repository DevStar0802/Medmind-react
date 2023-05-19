import React from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import "../../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getApi = async (searchData) => {
    try {
      setLoading(true);
      await axios
        .get(
          `https://us-central1-tiffan-dev.cloudfunctions.net/getProducts?ndc=${searchData}`
        )
        .then((res) => {
          setProduct(res.data.data);
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    let ndc = form.formBasicEmail.value;

    if (ndc.includes("-")) {
      let splittedVal = ndc.split("-");
      if (splittedVal.join("").length === 11) {
        await getApi(splittedVal.join(""));
      } else {
        let finalNdc = splittedVal.map((portion, index) => {
          let numberOfZeros = 0;
          if ((index === 0 || index === 1) && portion.length < 5 - index) {
            numberOfZeros = 5 - index - portion.length;
          } else if (index === 2 && portion.length < 2) {
            numberOfZeros = 2 - portion.length;
          }
          portion = "0".repeat(numberOfZeros) + portion; //Array(numberOfZeros + 1).join("0")
          return portion;
        });
        await getApi(finalNdc.join(""));
      }
    } else if (ndc.length === 11) await getApi(ndc);
  };

  return (
    <div className="w-50 mx-auto mt-5">
      <p className="text-center fw-bold fs-1 ">Search By Using NDC Number</p>
      <Form onSubmit={handelSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Search Here" />
        </Form.Group>
        <div className="d-flex justify-content-center align-items-center">
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <Button
              className="w-50 opacity-75 "
              variant="success"
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Search
            </Button>
          )}
        </div>
      </Form>
      <div className="d-flex p-2 gap-5 justify-content-center align-items-center flex-wrap">
        {product && product.length > 0 ? (
          <>
            {product.map((item, index) => {
              console.log("item", item);
              return (
                <div
                  className="d-flex justify-content-center align-items-center"
                  key={index}
                >
                  <Card
                    // border="dark"
                    fluid
                    className="shadow mt-3 rounded-4"
                    style={{ width: "20rem" }}
                    onClick={() => {
                      console.log("Prices before call ", item.prices);
                      navigate("/searchDetail", {
                        state: {
                          fromName: item.form,
                          ndcName: item.ndc,
                          tabletName: item.product_name,
                          strengthName: item.strength,
                          imageName: item.image_url,
                          pricesName: item.prices,
                        },
                      });
                    }}
                  >
                    <Card.Img
                      className="w-100 p-2"
                      style={{ height: "18rem" }}
                      fluid
                      variant="top"
                      src={item?.image_url}
                    />
                    <Card.Body className="bg-light rounded-4">
                      <Card.Title>{item?.product_name}</Card.Title>
                      <Card.Text>{item?.generic_name}</Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <Card.Text>{item?.form}</Card.Text>
                        <Card.Text>{item?.strength}</Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </>
        ) : (
          <p className="text-center mt-3 text-danger fs-1 fw-bold ">
            Enter NDC Number
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
