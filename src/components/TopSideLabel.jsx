import "../App.css";

const TopSideLabel = ({ iteration }) => {
  return (
    <div>
      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col-lg-1"></div>
        <div className="col-lg-5 row-border">
          {" "}
          <label className="top-side-label">
            Dashboard risque ({iteration}/6)
          </label>
        </div>
        <div className="col-lg-5 row-border"> </div>
        <div className="col-lg-1"></div>
      </div>
    </div>
  );
};

export default TopSideLabel;
