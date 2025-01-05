import Game from "./Components/Game";
import Footer from "./Sections/Footer";

function App() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-gradient-to-b to-green-500 from-green-300">
      {/* Game */}
      <section className="container mx-5 p-8 border-solid rounded-lg shadow-xl ring-slate-400/50 bg-white ">
        <h1 className=" p-2 font-bold text-4xl  leading-6 ">Tic-Tac-Toe</h1>
        <p className=" p-2 text-xl text-slate-400 ">Play a game?</p>
        <Game />
      </section>
      <audio src="src/assets/song1.mp3" autoPlay loop hidden />
      <Footer />
    </main>
  );
}

export default App;
