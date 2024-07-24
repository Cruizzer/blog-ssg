'use client'

import React, { useState, useEffect } from 'react';
import { Types } from 'mongoose';

import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type Comment = {
  commentId: Types.ObjectId;
  postId: string;
  text: string;
  author: string;
  date: string;
  profileImage?: string;
};

const CommentSection: React.FC<{ postId: string }> = ({ postId }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    fetchComments(postId);
  }, [postId]);

  const fetchComments = async (postId: string) => {
    // console.log(session)
    try {
      const response = await fetch(`/api/comments?postId=${postId}`);
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
    setLoading(true); // Set loading to true when starting the submit process
    const newComment = {
      postId,
      text: commentText,
    };

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

      setCommentText(''); // Clear the input field
      fetchComments(postId); // Fetch comments again after submitting a new comment
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  const handleDeleteComment = async (commentId: Types.ObjectId) => {
    console.log(commentId)
    try {
      const response = await fetch(`/api/comments?commentId=${commentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      fetchComments(postId); // Fetch comments again after deleting a comment
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="p-6 border border-gray-700 rounded-lg bg-gray-800 text-white">
      <h3 className="text-xl font-semibold m-0">Comments:</h3>
      <ul className="list-none space-y-4 mb-4 p-2">
        {comments.length ? (
          comments.map((comment, index) => (
            <li key={index} className="p-4 bg-gray-700 rounded-lg shadow flex items-start space-x-4">
              <img src={comment.profileImage || 'defaultProfileImageUrl'} alt="Profile" className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <p className="text-sm text-gray-400">{comment.author || 'Unknown User'}</p>
                <p className="text-xs text-gray-500">{comment.date ? new Date(comment.date).toLocaleDateString() : 'Unknown date'}</p>
                <p className="mt-2">{comment.text}</p>
              </div>
              {session?.user?.email === comment.author && (
                <button
                  onClick={() => handleDeleteComment(comment.commentId)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
            </li>
          ))
        ) : (
          <div className="mb-4 text-gray-400">
            <p>Comments are not yet available.</p>
          </div>
        )}
      </ul>

      <form onSubmit={handleCommentSubmit} className="space-y-4">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment"
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
          disabled={loading} // Disable the input if loading
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
