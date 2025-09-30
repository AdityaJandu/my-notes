import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';

const CreateNotePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast.error("All Fields are *required");
            return;
        }

        setLoading(true);

        try {
            await axiosInstance.post("/notes", {
                title,
                content
            });
            navigate('/');
            toast.success("Success! Note added.");
        } catch (error) {
            console.log('Error adding note: ', error);
            if (error.response.status === 429) {
                toast.error("Slow down your creating notes too fast..", {
                    duration: 4000,
                    icon: "☠️",
                });
            }
            else {
                toast.error("Failed! Please try again!");
            }
        } finally {
            setLoading(false);
        }


    };

    return (
        <div className='min-w-screen min-h-screen bg-base-200'>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <Link to={"/"} className='btn btn-ghost mb-6' >
                        <ArrowLeftIcon className='size-5' />
                        Back to notes
                    </Link>
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">
                                Lets add note
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control mb-4">
                                    <label className="label mb-2">
                                        <span className=" label-text">
                                            Title
                                        </span>
                                    </label>
                                    <input type="text" placeholder='Note title' className='input input-bordered w-full' value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label mb-2">
                                        <span className=" label-text">
                                            Content
                                        </span>
                                    </label>
                                    <textarea type="text" placeholder='Content title' className='textarea textarea-bordered h-32 w-full' value={content} onChange={(e) => setContent(e.target.value)} />
                                </div>
                                <div className="card-actions justify-end mt-2">
                                    <button type='submit' className='btn btn-primary' disabled={loading}>
                                        {loading ? "Creating...." : "Submit Now!"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNotePage