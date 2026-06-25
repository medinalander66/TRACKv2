import TopNav from "../components/layout/TopNav";
import BottomNav from "../components/layout/BottomNav";
import CreateTaskForm from "../components/tasks/CreateTaskForm";
import { useNavigate } from "react-router-dom";

export default function CreateTaskPage() {
	const navigate = useNavigate();
	const handleSave = () => {
		console.log("Save triggered from TopNav");
	};
	return (
		<div className="create-task-page">
			<TopNav
				variant="create"
				title="Create Task"
				onBack={() => navigate(-1)}
				onSave={handleSave}
			/>
			<main>
				<CreateTaskForm />
			</main>
			<BottomNav />
		</div>
	);
}

