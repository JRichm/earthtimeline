import Image from "next/image";
import TestForm from "./components/testForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-300">
      <div className="flex justify-center place-items-center p-36">
        <TestForm />
      </div>
    </main>
  );
}
