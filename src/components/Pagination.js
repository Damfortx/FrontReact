import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationList = ({ page,setPage }) => {
  return (
    <Pagination  >
      <PaginationItem>
        <PaginationLink first onClick={()=>{setPage(0)}}/>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous onClick={()=>{setPage(page-1)}} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink next onClick={()=>{setPage(page+1)}}/>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last onClick={()=>{setPage(-1)}} />
      </PaginationItem>
    </Pagination>
  );
}

export default PaginationList;