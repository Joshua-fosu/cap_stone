import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

const Paginationn = ({ postsPerPage, totalPosts, paginate }) => {
  const [activeTab, setActiveTab] = useState(1);

  const pageNumbers = [];

  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(totalPosts / postsPerPage);
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activeTab}
        onClick={() => {
          paginate(number);
          setActiveTab(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return <Pagination>{items}</Pagination>;
};

export default Paginationn;
