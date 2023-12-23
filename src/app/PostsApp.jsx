import { useState, useEffect } from "react"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import axios from "axios"

const MAX_POST_PAGE = 10

const fetchPosts = async (pageNum) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`)
  return response.data
}

const fetchComments = async (postId) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
  return response.data
}

const deletePost = (postId) => {
  axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  .then(res => console.log(res.data))
  .catch(err => console.log(err))
}

const updatePost = (postId) => {
  axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  .then(res => console.log(res.data))
  .catch(err => console.log(err))
}

const PostDetail = (props) => {

  const {data: comments} = useQuery({
    queryKey: ["comments", props.postDetail.id],
    queryFn: () => fetchComments(props.postDetail.id)
  })

  const deleteMutation = useMutation({
    mutationFn: (postId) => deletePost(postId)  
  })

  const updateMutation = useMutation({
    mutationFn: (postId) => updatePost(postId)
  })

  return (
    <div>
      <br />
      <h3>{props.postDetail.title}</h3>
      <button onClick={() => deleteMutation.mutate(props.postDetail.id)}>Delete</button>
      {deleteMutation.isError && <p>Error deleting the post</p>}
      {deleteMutation.isLoading && <p>Deleting the post ...</p>}
      {deleteMutation.isSuccess && <p>Post has (not) ben deleted</p>}
      <button onClick={() => updateMutation.mutate(props.postDetail.id)}>Udpate Title</button>
      <p>{props.postDetail.body}</p>
      <h4>Comments</h4>
      {comments && comments.map(comment => <p key={comment.id}>{comment.name}</p>)}
    </div>
  )
}

const PostsApp = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [postDetail, setPostDetail] = useState("")

  const queryClient = useQueryClient()

  // prefetch next page
  useEffect(() => {
    if (currentPage < MAX_POST_PAGE) {
      const nextPage = currentPage + 1
      queryClient.prefetchQuery({
        queryKey: ["posts", nextPage],
        queryFn: () => fetchPosts(nextPage)
      })
    }
  }, [currentPage, queryClient])

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => fetchPosts(currentPage),
    staleTime: 5000,
    
  })

  if (isLoading) return <h2>Loading ...</h2>
  if (isError) return <><h2>Something Went Wrong</h2><p>{error.toString()}</p></>
  return (
    <div>
      <h1>Tanstack Query</h1>
      {data.map(post => (
        <p
          onClick={() => setPostDetail(post)} 
          key={post.id}
        >{post.title}</p>
      ))}
      {postDetail && 
        <PostDetail 
          postDetail={postDetail}
        />}
        <button disabled={currentPage <= 1} onClick={() => setCurrentPage((prev) => prev - 1)}>Prev</button>
        <span>Page {currentPage}</span>
        <button disabled={currentPage >= MAX_POST_PAGE}onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
    </div>
  )
}

export default PostsApp