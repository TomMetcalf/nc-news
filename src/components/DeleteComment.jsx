import { useEffect } from 'react';
import { deleteComment } from '../api';

export default function DeleteComment({ deleteId, setComments }) {
  //console.log(deleteId, 'delete in DC');

  useEffect(() => {
    if (deleteId !== undefined ) {
  deleteComment(deleteId).then(() => {
  });
}
}, [deleteId]);
  

  return <p>Delete</p>;
}
