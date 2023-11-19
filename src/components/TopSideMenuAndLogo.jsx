import "../App.css";

const TopSideMenuAndLogos = () => {
  return (
    <div>
      <div className="row">
        <div className="col-lg-1"></div>
        <div className="col-lg-1" style={{ marginTop: "20px" }}>
          <img
            border="0"
            src="/images/transparent-logo.png"
            alt=""
            style={{ height: "40px", width: "40px" }}
          />
          <strong>
            <label className="inoteqia-label">inoteqia</label>
          </strong>
        </div>
        <div className="col-lg-5 "></div>
        <div className="col-lg-2 " style={{ marginTop: "20px" }}>
          <input
            id="search-input"
            placeholder="input search text"
            type="search"
            className="form-control"
          />
        </div>
        <div className="col-lg-3" style={{ marginTop: "20px" }}>
          <button
            style={{ width: "20%", borderRadius: "0", height: "88%" }}
            className="col-lg-2 btn btn-primary"
            onClick={() => {
              alert("search clicked");
            }}
          >
            <img
              border="0"
              src="/images/search.svg"
              alt=""
              style={{ height: "15px", width: "25px", marginBottom: "5px" }}
            />
          </button>
          <img
            className="top-side-menu-icons"
            border="0"
            src="/images/settings.png"
            alt=""
            onClick={() => {
              alert("settings clicked");
            }}
          />
          <img
            className="top-side-menu-icons"
            border="0"
            src="/images/bell.png"
            alt=""
            onClick={() => {
              alert("bell clicked");
            }}
          />
          <img
            className="top-side-menu-icons"
            border="0"
            src="/images/mail.png"
            alt=""
            onClick={() => {
              alert("mail clicked");
            }}
          />

          <img
            className="top-side-menu-icons"
            border="0"
            src="/images/user.png"
            alt=""
            onClick={() => {
              alert("user clicked");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopSideMenuAndLogos;
