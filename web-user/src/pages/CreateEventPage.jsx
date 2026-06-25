import TopNav from "../components/layout/TopNav";
import BottomNav from "../components/layout/BottomNav";
import CreateEventForm from "../components/events/CreateEventForm";
import { useNavigate } from "react-router-dom";

export default function CreateEventPage() {
  const navigate = useNavigate();
  const handleSave = () => {
    console.log("Save triggered from TopNav");
  };
  return (
    <div className="create-event-page">
      <TopNav
        variant="create"
        title="Create Event"
        onBack={() => navigate(-1)}
        onSave={handleSave}
      />
      <main>
        <CreateEventForm />
      </main>
      <BottomNav />
    </div>
  );
}