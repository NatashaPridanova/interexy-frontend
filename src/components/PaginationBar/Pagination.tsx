import React, { ChangeEvent } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationBarProps {
  count: number;
  page: number;
  loadCharacters: (value: number) => void;
}
export default function PaginationBar({ count, page, loadCharacters }: PaginationBarProps) {
  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    loadCharacters(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        role="pagination-bar"
        count={count}
        color="primary"
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
}
