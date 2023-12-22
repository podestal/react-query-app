import { useState, useEffect } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"

const fetchPosts = async () => {
  const response = await axios.get("http://127.0.0.1:8000/api/cabins/")
  return response.data
}

const PostDetail = (props) => {
  return (
    <div>
      <h3>Id: {props.postDetail.id}</h3>
      <p>Created at: {props.postDetail.creted_at}</p>
      <p>Name: {props.name}</p>
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
        >{post.name}</p>
      ))}
      {postDetail && 
        <PostDetail 
          postDetail={postDetail}
        />}
    </div>
  )
}

export default App
