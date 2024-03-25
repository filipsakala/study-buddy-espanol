import { styled } from "@mui/material";
import Header from "./layout/Header";
import Body from "./layout/Body";

const PageWrapper = styled("div")`
  margin: 0;
  display: flex;
  flex-direction: column;
  min-width: 320px;
  min-height: 100vh;
  background: white;

  @media screen and (max-width: 767px) {
    _::-webkit-full-page-media,
    _:future,
    :root {
      padding-bottom: 65px;
    }
  }
`;

const App = () => {
  return (
    <PageWrapper>
      <Header />
      <Body />
    </PageWrapper>
  );
};

export default App;
