import Image from "next/image";
import TestForm from "./components/testForm";
import TestEntries from "./components/testEntries";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-300 flex flex-col">
      <div className="flex justify-center place-items-center p-36">
        <TestForm />
      </div>
      <div className="place-self-center w-full">
        <TestEntries />
      </div>
    </main>
  );
}
