import Chat from "./components/chats/Chat"
import Detail from "./components/details/Detail"
import List from "./components/lists/List"

const App = () => {
  return (
    <div className='container'>
      <List/>
      <Chat/>
      <Detail/>
    </div>
  )
}

export default App