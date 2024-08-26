import './App.css'
import { SignIn } from "@clerk/clerk-react";
import sidePanel from './assets/side-panel.jpg';
import { SplitPane } from './components/atoms/SplitPane';


function App() {
  return (
    <SplitPane imgUrl={sidePanel} alt="Person in a towel login at the mirror">
      <SignIn />
    </SplitPane>
  )
}

export default App
