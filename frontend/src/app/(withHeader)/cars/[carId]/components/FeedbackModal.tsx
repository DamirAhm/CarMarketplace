"use client";

import { CommentWithIncludes, FeedbackWithIncludes } from "../api/getCar";
import React, { useRef, useState } from "react";
import { Button, Col, Flex, Input, InputProps, InputRef, Row } from "antd";
import { Box, Rating, Typography } from "@mui/material";
import Compact from "antd/es/space/Compact";
import { SendOutlined } from "@ant-design/icons";
import { createComment } from "./api/createComment";
import { editComment } from "./api/editComment";
import { deleteComment } from "./api/deleteComment";
import { Comment } from "./Comment/Comment";
import { reatomComponent } from "@reatom/npm-react";
import { userAtom } from "../../../../../atoms/user.atom";
import { UserRole } from "../../../../../../../common/constants/UserRole";

type Props = FeedbackWithIncludes;

export const FeedbackModal: React.FC<Props> = reatomComponent(({
                                                                 ctx,
                                                                 title,
                                                                 comments: init,
                                                                 id: feedbackId,
                                                                 rating,
                                                                 text
                                                               }) => {
  const [comments, setComments] = useState(init);
  const [commentInput, setCommentInput] = useState("");
  const [commentToChange, setCommentToChange] = useState<CommentWithIncludes | null>(null);

  const user = ctx.spy(userAtom);

  const inputRef = useRef<InputRef>(null);

  const handleComment: InputProps["onChange"] = (e) => {
    if (commentToChange) {
      setCommentToChange({
        ...commentToChange,
        text: e.target.value
      });

      return;
    }

    setCommentInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (commentInput.length === 0 && !commentToChange?.text.length) {
      return;
    }

    if (commentToChange) {
      await editComment(commentToChange.id, commentToChange.text);

      setComments((prev) => prev.map(m => m.id === commentToChange.id ? commentToChange : m));
      setCommentToChange(null);

      return;
    }

    const newComment = await createComment({
      text: commentInput,
      feedbackId
    });
    setComments((prev) => prev.concat([newComment]));
    setCommentInput("");
  };

  const handleDelete = async (id: string) => {
    await deleteComment(id);

    setComments((prev) => prev.filter((mes) => mes.id !== id));
  };

  const handleInitChange = (id: string) => {
    const comment = comments.find((mes) => mes.id === id);

    if (!comment) {
      return;
    }

    inputRef.current?.focus();
    setCommentToChange(comment);
  };

  const handleExit: InputProps["onKeyDown"] = (e) => {
    if (e.key === "Escape") {
      setCommentToChange(null);
    }
  };

  return <Col style={{ maxHeight: "1000px", overflow: "auto" }}>
    <Row align={"middle"}>
      <Typography variant={"h5"}>
        {title}
      </Typography>
      <Box width={"20px"} />
      <Rating value={rating} readOnly />
    </Row>
    <Box height={"20px"} />
    <Typography variant={"body1"}>
      {text}
    </Typography>
    <Box height={"20px"} />
    <form style={{ width: "100%" }} onSubmit={handleSubmit}>
      <Compact style={{ width: "70%" }}>
        <Input onKeyDown={handleExit} ref={inputRef} value={commentToChange?.text ?? commentInput}
               onChange={handleComment} size={"large"}
               placeholder="Введите свой комментарий" />
        <Button disabled={!commentToChange && commentInput.length === 0} size={"large"} onClick={handleSubmit}
                type="primary"><SendOutlined /></Button>
      </Compact>
    </form>
    <Box height={"20px"} />
    <Flex vertical gap={"20px"}>
      {
        comments.map((com) => <Comment
          onDelete={handleDelete}
          onInitChange={handleInitChange}
          fromMe={user?.id === com.userId || user?.role !== UserRole.Regular}
          key={com.id}
          {...com}
        />)
      }
    </Flex>
  </Col>;
});