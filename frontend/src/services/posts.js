// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = "https://acebook-kangaroo-be.onrender.com"

export const getPosts = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
};

export const postComment = async (token, commentText, postId, userId) => {
  console.log("front end", commentText)
  const payload = {
		commentText: commentText,
    userId: userId
	};

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }

  const response = await fetch(`${BACKEND_URL}/posts/${postId}/comments`, requestOptions)

  if (response.status !== 200) {
    throw new Error("Unable to post comment");
  }

  const data = await response.json();
  return data;
}

export const createPost = async (token, formData) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.ok) {
		return "post submitted successfully";
  } else {
  throw new Error(
    `Received status ${response.status} when creating post.`
  );
  }
};

export const deleteThePost = async (postId, token) => {
  try {
      const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ postID: postId }),
      }
      const response = await fetch(`${BACKEND_URL}/posts/${postId}`, requestOptions)

      if (response.ok) {
        return "post deleted"
      } else {
        throw new Error(`delete post HTTP error! Status: ${response.status}`);
      }
  } catch (error) {
      console.error("Error deleting post:", error);
  }

};

  

