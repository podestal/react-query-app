import { useState, useEffect } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"

const fetchPosts = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0")
  return response.data
}

const fetchComments = async (postId) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
  return response.data
}

const PostDetail = (props) => {

  const {data: comments} = useQuery({
    queryKey: ["comments", props.postDetail.id],
    queryFn: () => fetchComments(props.postDetail.id)
  })

  console.log(comments)

  return (
    <div>
      <br />
      <h3>{props.postDetail.title}</h3>
      <button>Delete</button>
      <button>Udpate Title</button>
      <p>{props.postDetail.body}</p>
      <h4>Comments</h4>
      {comments && comments.map(comment => <p key={comment.id}>{comment.name}</p>)}
    </div>
  )
}

const App = () => {

  const [postDetail, setPostDetail] = useState("")

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
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
    </div>
  )
}

export default App
