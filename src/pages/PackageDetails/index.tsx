import "./packagedetails.css";

const PackageDetails = () => {
  return (
    <div>
      <div>
        <main className="flex-shrink-0">
          <div className="row w-100 p-4 main_container">
            <div className="select_package_container">
              <div className="header_container">
                <div className="header_content">
                  <div className="input_div">eLathrop_Membership2022</div>
                  <i className="fa-solid fa-folder-gear color_blue fa-2x"></i>
                  <i className="fa-regular fa-folder-plus color_blue fa-2x"></i>
                </div>
                <div>
                  <button>Delete</button>
                  <button>Save</button>
                  <button>Sign Now</button>
                  <button>Send</button>
                </div>
              </div>
              <div className="upload_container">
                <div>
                  <section className="dropzone_container">
                    <div className="dropzone_header background_blue">
                      <p className="header_text">Document to Sign</p>
                      <i className="fa-regular fa-file-plus color_white fa-2x" />
                    </div>
                    <div className="drop_container_main border_blue">
                      <div className="dropzone_subcontainer_1">
                        <div>
                          <i className="fa-duotone fa-file-lines fa-2x blue"></i>
                        </div>
                        <div className="sign_documents">
                          <p>New Membership Application_eLathrop</p>
                        </div>
                        <div className="documents_status">
                          <p>ReadyeSign</p>
                        </div>
                        <div className="circular_icon">
                          <div className="circular_div_manager background_yellow">
                            <p>RH</p>
                          </div>
                          <div className="circular_div_participant background_blue">
                            <p>L</p>
                          </div>
                        </div>
                      </div>

                      <div className="fields">
                        <div className="drop_icons">
                          <i className="fa-solid fa-gear color_blue fa-2x"></i>
                        </div>
                        <div className="drop_icons">
                          <i className="fa-solid fa-trash-can color_blue fa-2x"></i>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          display: "block",
                          width: "50%",
                          margin: "0px 45px 0px 0px",
                        }}
                      >
                        <div className="dropzone_header background_green">
                          <p className="header_text">Document for Review</p>
                          <i className="fa-regular fa-file-plus color_white fa-2x" />
                        </div>
                        <div className="dropzone_sub_container border_green">
                          <p className="dropzone_content">
                            drag and drop, click browse or click add icon to
                            select a decument to be reviewed or template to send
                            (.pdf,.doc, .png, .jpg, .tiff)
                          </p>
                        </div>
                      </div>
                      <div style={{ display: "block", width: "50%" }}>
                        <div className="dropzone_header background_yellow">
                          <p className="header_text">Document for Review</p>
                          <i className="fa-regular fa-file-plus color_white fa-2x" />
                        </div>
                        <div className="dropzone_sub_container border_yellow">
                          <p className="dropzone_content">
                            drag and drop, click browse or click add icon to
                            select a decument to be reviewed or template to send
                            (.pdf,.doc, .png, .jpg, .tiff)
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="bottom_dropzone_container"></div>
              </div>
            </div>
          </div>
        </main>
        <footer></footer>
      </div>
    </div>
  );
};
export default PackageDetails;
