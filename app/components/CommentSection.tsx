'use client'

import React, { useState, useEffect } from 'react';

type Comment = {
  text: string;
  page: string;
};

const CommentSection: React.FC<{ postId: string }> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    // Fetch comments when the component mounts
    fetchComments(postId);
  }, [postId]); // Re-fetch comments whenever the page prop changes

  const fetchComments = async (postId: string) => {
    try {
      const response = await fetch(`/api/comments?page=${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newComment: Comment = {
      text: commentText,
      page: postId,
    };
    setComments([...comments, newComment]);
    setCommentText('');

    // You can also submit the new comment to the API if needed
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
      // Fetch comments again to update the list after submitting a new comment
      fetchComments(postId);

    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
