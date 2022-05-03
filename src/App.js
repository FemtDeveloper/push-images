import "./App.css";
import UploadImages from "./components/UploadImages";

function App() {
  return (
    <div className="App">
      <h1> Push images to firestore</h1>
      {/* your component for uploading images */}
      <UploadImages />
    </div>
  );
}

export default App;
