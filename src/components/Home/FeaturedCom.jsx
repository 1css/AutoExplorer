import React, { useState } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";

import Trending from "./Trending";
import Upcoming from "./Upcoming";
import "../../styles/components/featured.css";
import Popular2 from "./Popular2";

function FeaturedCom() {
  const [key, setKey] = useState("Upcoming");
  return (
    <div className="featured-classname-main">
      {/* <div className='featured-classname-main'> */}
      <Container className="custom-width">
        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
          {/* <Tab eventKey="popular" title="Popular Cars">
            <Popular2 />
          </Tab> */}
          <Tab eventKey="Trending Cars" title="Trending Cars">
            <Trending />
          </Tab>
          <Tab eventKey="Upcoming" title="Upcoming Cars">
            <Upcoming />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default FeaturedCom;
