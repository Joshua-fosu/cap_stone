import React from "react";
import "./EventSearchBar.css";

export default function EventSearchbar({ setFilterEvent }) {
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="searchbar">
            <input
              className="search_input"
              type="text"
              name=""
              placeholder="Search..."
              onChange={(e) => {
                setFilterEvent(e.target.value);
              }}
            />
            <a href="#" className="search_icon">
              <i className="fas fa-search"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
