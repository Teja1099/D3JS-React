import { Container, Row, Col } from "react-bootstrap";
import BarChart from "./components/barChart/BarChart";
import BarChart1 from "./components/BarChart1";
import PieChart1 from "./components/PieChart1";
import PieChart from "./components/PieChart";
import StackedBarChart from "./components/stackedBarChart/StackedBarChart";

const App = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <StackedBarChart />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
