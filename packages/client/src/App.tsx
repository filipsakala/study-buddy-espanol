import { styled } from "@mui/material";
import Header from "./layout/Header";
import Body from "./layout/Body";
import { QuizContextProvider } from "./contexts/QuizContextProvider";
import QuizActions from "./components/Quiz/QuizActions";
import { SnackbarProvider } from "notistack";

const PageWrapper = styled("div")(
  ({ theme }) => `
  height: 100dvh;
  background: ${theme.palette.background.default};
  color: ${theme.palette.text.primary};

  display: grid;
  grid-template-rows: auto 1fr auto;
`
);

const App = () => {
  return (
    <SnackbarProvider anchorOrigin={{ horizontal: "center", vertical: "top" }}>
      <QuizContextProvider>
        <PageWrapper>
          <Header />
          <Body />
          <QuizActions />
        </PageWrapper>
      </QuizContextProvider>
    </SnackbarProvider>
  );
};

export default App;
