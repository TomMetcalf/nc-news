import { useState, useEffect } from 'react';
import { deleteComment } from '../api';

export default function DeleteComment({ deleteId, setComments }) {

  useEffect(() => {
    if (deleteId !== undefined) {
      deleteComment(deleteId).then((status) => {
        if (status === 204) {
          alert('comment successfully deleted.');
        }
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== deleteId)
        );
      })
    }
  }, [deleteId, setComments]);

  return <span>Delete</span>;
}
