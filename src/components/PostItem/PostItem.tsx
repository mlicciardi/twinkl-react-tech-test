import { deletePostRequest, Post } from "@/store/posts/postsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Typography } from "@mui/material";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

interface PostItemProps extends Post {}

const PostItem: React.FC<PostItemProps> = memo(({ id, title, body }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePostRequest(id));
  };

  return (
    <Box
      data-testid="post-item"
      display="flex"
      gap="1rem"
      sx={{
        paddingBottom: "1rem",
        borderBottom: "1px solid",
        marginBottom: "1rem",
      }}
    >
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {body}
          </Typography>
        </Box>
        <Box flexShrink={0}>
          <Button
            data-testid="post-item-delete"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            {t("delete")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
});

export default PostItem;
