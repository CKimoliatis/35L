import React, { useState } from "react";

function Pagination(pageNumber) {

  const [activePage, setActivePage] = useState(1);


  // items = [];

  return (
    <>
      <button className="pagination-button" onClick={() => setActivePage(pageNumber)}>{pageNumber.pageNumber}</button>
    </>
  );
}


export default Pagination;