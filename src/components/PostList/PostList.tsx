import { Container, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import PostItem from "../PostItem/PostItem";
import clsx from "clsx";
import styles from "./PostList.module.scss";
import { Post } from "@/store/posts/postsSlice";

interface PostListMessageProps {
  dataTestId: string;
  i18nKey: string;
}

const PostListMessage: React.FC<PostListMessageProps> = ({
  dataTestId,
  i18nKey,
}) => {
  const { t } = useTranslation();

  return (
    <Typography variant="h2" data-testid={dataTestId}>
      {t(i18nKey)}
    </Typography>
  );
};

const PostList: React.FC = () => {
  const loading = useSelector((state: RootState) => state.posts.loading);
  const error = useSelector((state: RootState) => state.posts.error);
  const posts = useSelector((state: RootState) => state.posts.posts);

  return (
    <Container
      className={clsx({
        [styles.loading]: loading,
        [styles.error]: error,
        [styles.empty]: !posts || !posts.length,
      })}
    >
      {loading ? (
        <PostListMessage dataTestId="post-list-loading" i18nKey="loading" />
      ) : error ? (
        <PostListMessage dataTestId="post-list-error" i18nKey="error" />
      ) : posts && posts.length ? (
        posts.map((post: Post) => (
          <PostItem
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
          />
        ))
      ) : (
        <PostListMessage dataTestId="post-list-empty" i18nKey="empty" />
      )}
    </Container>
  );
};

export default PostList;
