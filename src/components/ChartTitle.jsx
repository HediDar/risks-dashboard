import "../App.css";

const ChartTitle = ({ title }) => {
  return (
    <div className="row">
      <div className="col-lg-1"></div>
      <div className="col-lg-10 chart-title-div">
        <label className="chat-title-label">{title}</label>
      </div>
      <div className="col-lg-1"></div>
    </div>
  );
};

export default ChartTitle;
