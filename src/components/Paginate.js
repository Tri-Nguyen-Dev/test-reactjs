import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { PaginationItem, Paper } from "@mui/material";
import { Link } from "react-router-dom";

function Paginate({ pagination }) {
  const totalPage = Math.ceil(pagination?._totalRows / pagination?._limit) || 1;

  return (
    <Paper>
      <div style={{ width: "100%", marginTop: "24px", padding: "20px" }}>
        <Stack spacing={2} style={{ alignItems: "center" }}>
          <Pagination
            count={totalPage}
            color="primary"
            page={Number(pagination?._currentPage) || 1}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                component={Link}
                to={`/list-user?_page=${item.page}`}
              />
            )}
          />
        </Stack>
      </div>
    </Paper>
  );
}

export default Paginate;
