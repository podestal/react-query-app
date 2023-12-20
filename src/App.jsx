import { useQuery, useMutation } from "@tanstack/react-query"

const POSTS =[
  { id: 1, title: "Post 1"},
  { id: 2, title: "Post 2"}
]

const wait = (duration) => {
  return new Promise(resolve => setTimeout(resolve, duration))
}

const App = () => {

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS])
  })

  if (postsQuery.isLoading) return <h1>Loading ...</h1>
  if (postsQuery.error) return <pre>{JSON.stringify(postsQuery.error)}</pre>
  return (
    <>
      <h1>React Query</h1>
      {postsQuery.data.map(post => <p key={post.id}>{post.title}</p>)}
    </>
  )
}

export default App
