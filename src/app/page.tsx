import Bord from "../components/bord";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold p-8">Snake Game</h1>
      <Bord />
    </div>
  );
}
