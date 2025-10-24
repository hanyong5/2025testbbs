import { useState, useEffect } from 'react';
import supabase from './utils/supabase';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const { data: posts } = await supabase.from('posts').select();

      // if (posts.length > 1) {
      //   setPosts(posts);
      // }

      setPosts(posts);

      console.log(posts);
    }

    getPosts();
  }, []);

  return (
    <div>
      <h3>post</h3>
      {posts.map((post, i) => (
        <li key={i}>{post.title}</li>
      ))}
    </div>
  );
}
export default App;
