import './App.css';
import TopHeader from './TopHeader';
import StartButton from './StartButton';

function App() {
  return (
    <div className="App">
      <TopHeader
      gameMode="RUNNING"
      >
      </TopHeader>
      <StartButton></StartButton>
    </div>
  );
}

export default App;
