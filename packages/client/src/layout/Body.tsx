import studyBuddy from "../assets/study_buddy.png";
import studyBuddy2 from "../assets/study_buddy2.png";

const Body = () => {
  return (
    <div>
      <img src={studyBuddy} className="logo" alt="Study buddy" />
      <img src={studyBuddy2} className="logo" alt="Study sources" />
    </div>
  );
};

export default Body;
