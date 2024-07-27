import PostList from "@/components/PostList/PostList";
import SearchInput from "@/components/SearchInput/SearchInput";
import { Grid } from "@mui/material";
import React from "react";

const SearchPage: React.FC = () => {
  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <SearchInput />
        </Grid>
      </Grid>
      <PostList />
    </>
  );
};

export default SearchPage;
