import { useState } from "react";
import studyBuddy from "./assets/study_buddy.png";
import studyBuddy2 from "./assets/study_buddy2.png";
import "./App.css";
import { TrendingUp } from "@mui/icons-material";
import { styled } from "@mui/material";

const StatWrapper = styled("div")(
  ({ theme }) => `
  background-color: ${theme.palette.background.paper};
  box-shadow: ${theme.shadows[1]};
  border-radius: ${theme.shape.borderRadius}px;
  padding: ${theme.spacing(2)};
  min-width: 300px;
`
);

const StatHeader = styled("div")(
  ({ theme }) => `
  color: ${theme.palette.text.secondary};
`
);

const StyledTrend = styled(TrendingUp)(
  ({ theme }) => `
  color: ${theme.palette.success.dark};
  font-size: 16px;
  vertical-alignment: sub;
`
);

const StatValue = styled("div")(
  ({ theme }) => `
  color: ${theme.palette.text.primary};
  font-size: 34px;
  font-weight: ${theme.typography.fontWeightMedium};
`
);

const StatDiff = styled("div")(
  ({ theme }) => `
  color: ${theme.palette.success.dark};
  display: inline;
  font-weight: ${theme.typography.fontWeightMedium};
  margin-left: ${theme.spacing(0.5)};
  margin-right: ${theme.spacing(0.5)};
`
);

const StatPrevious = styled("div")(
  ({ theme }) => `
  color: ${theme.palette.text.secondary};
  display: inline;
  font-size: 12px;
`
);

const App = () => {
  const [count, setCount] = useState<number>(100);

  return (
    <>
      <div>
        <img src={studyBuddy} className="logo" alt="Study buddy" />
        <img src={studyBuddy2} className="logo" alt="Study sources" />
      </div>
      <h1>Study Buddy Español</h1>
      <div className="card">
        <button onClick={() => setCount(() => Math.floor(Math.random() * 100))}>
          count is not {count}
        </button>
      </div>
      <StatWrapper>
        <StatHeader>Sessions</StatHeader>
        <StatValue>98.3 K</StatValue>
        <StyledTrend />
        <StatDiff>18.77%</StatDiff>
        <StatPrevious>vs last week</StatPrevious>
      </StatWrapper>
    </>
  );
};

export default App;
