import Modal from "../general/Modal";
import React, { useEffect, useState } from "react";
import { IApiCategorie, IApiTemplate } from "../../interface";
import { connect } from "react-redux";
import { IStoreState } from "../../reducers";
import { IIsLoaded } from "../../reducers/template";
import { getTemplates, getCatagories } from "../../actions/template";
import { Loader } from "../general/Loader";

const names = {
  Requested: "requested_docs",
  Reference: "review_docs",
  Signing: "sigining_docs",
  cantagories: "cantagories",
};

interface IProps {
  type?: keyof IIsLoaded;
  loader: boolean;
  templates: IApiTemplate[];
  isLoaded: IIsLoaded;
  categories: IApiCategorie[];
  loadingDetails?: boolean;
  showFilter?: boolean;
  getTemplates(val: any): void;
  getCatagories(val?: any): void;
  onClose(): void;
  onChoose?(temp?: IApiTemplate): void;
}
const RequestTemplateModal: React.FC<IProps> = ({
  templates,
  isLoaded,
  type = "Signing",
  loader = false,
  categories,
  loadingDetails,
  showFilter: filter = true,
  onClose,
  getTemplates,
  getCatagories,
  onChoose,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  useEffect(() => {
    if (filter) {
      getTemplates({ type });
      if (!isLoaded.cantagories) {
        getCatagories();
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (templates.length > 0) {
      setSelectedTemplate(templates[0].id);
    }
  }, [templates]);

  const onFilterClick = (id: string) => {
    const clone = [...filters];
    const foundIndex = clone.findIndex((f) => f === id);
    if (foundIndex > -1) {
      clone.splice(foundIndex, 1);
    } else {
      clone.push(id);
    }
    setFilters(clone);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const resetFilters = () => {
    setFilters([]);
    handleApplyFilter([]);
  };

  const handleApplyFilter = (filter?: string[]) => {
    toggleFilters();
    const newFiters = filter ? filter : filters;
    getTemplates({ type, filters: newFiters });
  };

  const handleScroll = () => {
    const el = document.getElementById("scrolling_div_" + names[type]);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  return (
    <Modal classes="" onClose={onClose} cancelAble={false}>
      <div className="modal-dialog modal-dailog-select-template">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">Choose Template</div>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col py-1">Please select a Template to use:</div>
            </div>
            <div className="row">
              <div className="col py-1">Template:</div>
            </div>

            <div className="row">
              <div className={filter ? "col-11" : "col-12"}>
                <select
                  id="templateseldlgEDOCIT"
                  name="templateseldlgEDOCIT"
                  className="form-select"
                  disabled={loader}
                  value={selectedTemplate}
                  onChange={(e) => {
                    setSelectedTemplate(e.target.value);
                  }}
                >
                  {templates
                    .filter((t) => t.type === type)
                    .map((t) => {
                      return (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              {filter && (
                <div
                  className="col-1 p-0 dropdown cursor_pointer"
                  onClick={toggleFilters}
                >
                  <span className="Blue fa-solid fa-filter fa-2x"></span>
                </div>
              )}
            </div>

            {loader && (
              <div className="text-center">
                <Loader />
              </div>
            )}
            {showFilters && filter ? (
              <div className="filter_container bg-white shadow rounded p-3 mt-3">
                {categories.map((c) => {
                  const found = filters.find((f) => f === c.id);
                  const classes = found
                    ? "px-3 py-1 m-1 bg-white rounded shadow filter_item selected_filter"
                    : "px-3 py-1 m-1 bg-white rounded shadow filter_item";
                  return (
                    <span
                      onClick={() => onFilterClick(c.id)}
                      key={c.id}
                      className={classes}
                    >
                      {c.name}
                    </span>
                  );
                })}
                <div className="mt-3 ml-2">
                  <button
                    onClick={() => handleApplyFilter()}
                    className="btn btn-primary btn-sm custom_btn"
                    disabled={loader}
                  >
                    Apply
                  </button>
                  <button
                    onClick={resetFilters}
                    type="button"
                    className="mx-3 btn btn-primary btn-sm custom_btn"
                    disabled={loader}
                  >
                    Reset
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
              disabled={loadingDetails || loader}
            >
              No
            </button>
            <button
              type="button"
              id="ChooseTemplateUploadModalYesBtnEDOCIT"
              className="btn btn-primary"
              disabled={loadingDetails || loader}
              onClick={() => {
                const temp = templates.find((t) => t.id === selectedTemplate);
                handleScroll();
                onChoose && onChoose(temp);
              }}
            >
              {loadingDetails ? <Loader /> : "Yes"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
const mapStateToProps = (state: IStoreState) => {
  const { template } = state;
  const { templates, isLoaded, loader, categories } = template;
  return { templates, isLoaded, loader, categories };
};
export default connect(mapStateToProps, {
  getTemplates,
  getCatagories,
})(RequestTemplateModal);
