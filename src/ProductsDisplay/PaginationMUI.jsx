import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../Context/StoreContext';

export default function PaginationRounded({itemsPerPage, totalCount, category}) {

    const {pageCounter, setPageCounter} = useContext(StoreContext)
    
    const countPage = Math.ceil(totalCount / itemsPerPage) 


      useEffect(()=>{
        setPageCounter(1)
      },[category])



    const handleChangePage= (event, page) =>{
        setPageCounter(page)
        console.log(pageCounter)
    }

  return ( 
    <Stack spacing={5}>
      <Pagination count={countPage}  variant="outlined" shape="rounded" onChange={handleChangePage} />
    </Stack>
  );
}
