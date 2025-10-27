import RoomsGrid from "@/pages/Rooms/RoomsGrid";
import RoomsHeader from "@/pages/Rooms/RoomsHeader";


export default function RoomsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. The Header Banner */}
      <RoomsHeader />
      
      {/* 2. The Main Content Grid */}
      <RoomsGrid />
    </div>
  );
}