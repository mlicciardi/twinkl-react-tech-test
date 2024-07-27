import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import useDebounce from "@/hooks/useDebounce";
import {
  fetchPostsRequest,
  searchPostsRequest,
} from "@/store/posts/postsSlice";

const SearchInput: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(window.location.search);
  const initialSearchTerm = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (!dispatch) {
      return;
    }

    if (debouncedSearchTerm.length == 0) {
      dispatch(fetchPostsRequest());
    } else if (debouncedSearchTerm.length >= 3) {
      dispatch(searchPostsRequest(debouncedSearchTerm));
    }
  }, [dispatch, debouncedSearchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <TextField
      data-testid="SearchInput"
      label={t("searchPlaceholder")}
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
