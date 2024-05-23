import { styled } from "@mui/material";
import Header from "./layout/Header";
import Body from "./layout/Body";
import { QuizContextProvider } from "./contexts/QuizContextProvider";
import QuizActions from "./components/Quiz/QuizActions";

const PageWrapper = styled("div")(
  ({ theme }) => `
  height: 100vh;
  background: ${theme.palette.background.default};
  color: ${theme.palette.text.primary};

  display: grid;
  grid-template-rows: auto 1fr auto;

  @media screen and (max-width: 767px) {
    _::-webkit-full-page-media,
    _:future,
    :root {
      padding-bottom: 65px;
    }
  }
`
);

const App = () => {
  return (
    <QuizContextProvider>
      <PageWrapper>
        <Header />
        <Body />
        <QuizActions />
      </PageWrapper>
    </QuizContextProvider>
  );
};

export default App;
