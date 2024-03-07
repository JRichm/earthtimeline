import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({ subsets: ["latin"] })

export default function TimelinePage() {

    const TimlineComponent = () => {
        return (
            <div className="bg-gray-400 p-2">
                <div className="bg-gray-100 min-h-56">
                    timeline component
                </div>
            </div>
        )
    }

    return (
        <main className="bg-gray-300 min-h-screen p-12">
            <div>
                <h1 className={`text-3xl text-center font-bold tracking-[3px] ${josefin.className}`}>Timeline of Earths History</h1>
            </div>
            <div className="my-12">
                <TimlineComponent />
            </div>
        </main>
    )
}