import { Link } from "react-router"
import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { formatDate } from "../lib/utils"
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

const NoteCard = ({ note, setNotes }) => {

    const handleDelete = async (e, id) => {
        // Get rid of default behavior:
        e.preventDefault();


        if (!id) {
            toast.error("Note not found!");
            return;
        }

        if (!window.confirm("Are you sure you wanna delete this note?")) {
            return;
        }

        try {
            await axiosInstance.delete(`notes/${id}`);
            // Get rid of deleted on in array of notes:
            setNotes((prev) => prev.filter(note => note._id !== id));
            toast.success("Note deleted successfully");
        } catch (error) {
            console.log("Error in handle delete: ", error);
            toast.error("Error deleting note!");
        }

    };

    return (
        <Link to={`/note/${note._id}`} className="card bg-base-100 hover-shadow-lg transtion-all duration-200 border-t-4 border-solid border-[#f56fb1]">
            <div className="card-body">
                <h3 className="card-title text-base-content ">{note.title}</h3>
                <p className="text-base-content/70 line-clamp-3">{note.content}</p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDate(note.updatedAt)}
                    </span>
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4" />

                        <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, note._id)}>
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard