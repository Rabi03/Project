import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import StarRatings from "react-star-ratings";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Row, Col } from "reactstrap";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
});



export default function RecommendedApps({apps}) {
  const history = useHistory();
  return (
    <>
    <h4 style={{ marginBottom: '15px' }}>Recommended for you</h4>
    <div style={{ marginBottom: "10px" }}>
      <Row>
        {[0,1,2,3,4].map((tile, index) => (
          apps[tile]&&<Col
            key={index}
            sm={12}
            md={6}
            lg={2}
            xl={2}
            xs={2}
            style={{
              marginRight: "5px",
              marginBottom: "15px",
              cursor: "poniter",
            }}
          >
            <div
              className="card"
              style={{
                width: "11rem",
                backgroundColor: "rgba(26, 28, 59,0.4)",
                border: "0px",
                boxShadow: "4px 4px rgba(2,2,2,0.2)",
                marginRight: "10px",
              }}
            >
              <div
                className="card-body"
                style={{ cursor: "pointer" }}
                onClick={() => history.push(`store/${apps[tile].id}`)}
              >
                <img
                  className="center-element"
                  src={apps[tile].appLogo}
                  alt="..."
                  width="50"
                  height="50"
                />
                <h5
                  className="card-title text-short"
                  style={{
                    fontSize: "17px",
                    textAlign: "center",
                    margin: "0px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  {apps[tile].appName}
                </h5>
                <p
                  className="card-text text-short"
                  style={{
                    fontSize: "10px",
                    textAlign: "center",
                    margin: "0px",
                    marginBottom: "5px",
                  }}
                >
                  {apps[tile].groupName}
                </p>
                <p style={{ textAlign: "center" }}>
                  <StarRatings
                    starRatedColor="yellow"
                    rating={apps[tile]?.rates.length>0? Number(apps[tile].rates[0].value):0}
                    starDimension="15px"
                    starSpacing="0px"
                    starEmptyColor="rgba(255, 255, 255,0.3)"
                  />
                </p>
              </div>
              <ThemeProvider theme={theme}>
                <ButtonGroup
                  variant="text"
                  aria-label="text primary button group"
                  color="primary"
                  style={{
                    height: "10px",
                    justifyContent: "flex-end",
                    marginBottom: "10px",
                  }}
                >
                  <Button
                    style={{
                      fontSize: "10px",
                      color: "white",
                      textTransform: "none",
                    }}
                  >
                    {apps[tile].appType}
                  </Button>
                  <Button
                    style={{
                      fontSize: "10px",
                      color: "white",
                      textTransform: "none",
                    }}
                  >
                    Free
                  </Button>
                </ButtonGroup>
              </ThemeProvider>
            </div>
          </Col>
        ))}
      </Row>
    </div>
    </>
  );
}
