import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import QuizInitActions from "./QuizInitActions";
import { styled } from "@mui/material";
import QuizInProgressActions from "./QuizInProgressActions";
import Alert from "../../Alert";
import { useContextSelector } from "use-context-selector";
import { QuestionCategory } from "../../../types/Question";

const StyledWrapper = styled("div")(
  ({ theme }) => `
display: flex;
gap: 5px;

width: 100%;
align-items: flex-start;
justify-content: center;
padding: 10px 0;

border-top: 1px solid ${theme.palette.divider};
`
);

const StyledAlert = styled(Alert)`
  position: absolute !important;
  bottom: 5px;
  left: 0px;
`;

const QuizActions = () => {
  const status = useContextSelector(QuizContext, (c) => c.quizStatus);
  const hasApiError = useContextSelector(QuizContext, (c) => c.hasApiError);
  const currentQuestion = useContextSelector(
    QuizContext,
    (c) => c.currentQuestion
  );

  if (
    (status === EQuizStatus.IN_PROGRESS || status === EQuizStatus.DONE) &&
    currentQuestion.category === QuestionCategory.WORDS_MATCH
  ) {
    return null;
  }

  return (
    <StyledWrapper>
      {status === EQuizStatus.INIT && <QuizInitActions />}
      {(status === EQuizStatus.IN_PROGRESS || status === EQuizStatus.DONE) && (
        <QuizInProgressActions />
      )}
      <StyledAlert
        open={hasApiError}
        message="Sorry! 🙏 There was an error while loading your request 😓 Try again later."
      />
    </StyledWrapper>
  );
};

export default QuizActions;
