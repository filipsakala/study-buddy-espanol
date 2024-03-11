import { styled } from "@mui/material";
import Header from "./layout/Header";
import Body from "./layout/Body";

// const StatWrapper = styled("div")(
//   ({ theme }) => `
//   background-color: ${theme.palette.background.paper};
//   box-shadow: ${theme.shadows[1]};
//   border-radius: ${theme.shape.borderRadius}px;
//   padding: ${theme.spacing(2)};
//   min-width: 300px;
// `
// );

// const StatHeader = styled("div")(
//   ({ theme }) => `
//   color: ${theme.palette.text.secondary};
// `
// );

// const StyledTrend = styled(TrendingUp)(
//   ({ theme }) => `
//   color: ${theme.palette.success.dark};
//   font-size: 16px;
//   vertical-alignment: sub;
// `
// );

// const StatValue = styled("div")(
//   ({ theme }) => `
//   color: ${theme.palette.text.primary};
//   font-size: 34px;
//   font-weight: ${theme.typography.fontWeightMedium};
// `
// );

// const StatDiff = styled("div")(
//   ({ theme }) => `
//   color: ${theme.palette.success.dark};
//   display: inline;
//   font-weight: ${theme.typography.fontWeightMedium};
//   margin-left: ${theme.spacing(0.5)};
//   margin-right: ${theme.spacing(0.5)};
// `
// );

// const StatPrevious = styled("div")(
//   ({ theme }) => `
//   color: ${theme.palette.text.secondary};
//   display: inline;
//   font-size: 12px;
// `
// );

const App = () => {
  return (
    <>
      <Header />
      <Body />
    </>
  );
};

export default App;
