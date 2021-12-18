import { Container, Row, Col } from "react-bootstrap";
import BarChart from "./components/barChart/BarChart";
import BarChart1 from "./components/BarChart1";
import OnMouseMoveChangeEvent from "./components/svg/OnMouseMoveChangeEvent";
import PieChart1 from "./components/PieChart1";
import SmileyFace from "./components/svg/SmileyFace";
import PieChart from "./components/PieChart";

const App = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            {/* <SmileyFace /> */}
            {/* <OnMouseMoveChangeEvent /> */}
            <BarChart1 />
          </Col>
        </Row>
        <Row>
          <Col>
            <PieChart1 />
            <BarChart />
          </Col>
        </Row>
        <Row>
          <Col>
            <PieChart />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
