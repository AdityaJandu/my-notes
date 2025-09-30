import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams, Link } from 'react-router';
import axiosInstance from '../lib/axios';
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from 'lucide-react';

const NoteDetailPage = () => {

    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axiosInstance.get(`/notes/${id}`);
                setNote(res.data);
            } catch (error) {
                console.log("Error while feteching notes: ", error);
                toast.error("Couldn't fetch notes!")
            }
            finally {
                setLoading(false);
            }
        };

        fetchNotes();


    }, [id]);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axiosInstance.delete(`/notes/${id}`);
            navigate('/');
            toast.success("Note deleted successfully!");
        } catch (error) {
            console.log("Error while deleting: ", error);
            toast.error("Error while deleting note! Try Again..");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Fill all details properly..");
            return;
        }

        setSaving(true);

        try {
            await axiosInstance.put(`/notes/${id}`, note);
            navigate('/');
            toast.success("Note updated successfully!");
        } catch (error) {
            console.log("Error while updating: ", error);
            toast.error("Error while updating note! Try Again..");
        } finally {
            setSaving(false);
        }
    };


    if (loading) {
        return <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <LoaderIcon className="animate-spin size-10" />
        </div>
    }


    return (
        <div className='min-h-screen bg-base-200 '>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to={"/"} className='btn btn-ghost' >
                            <ArrowLeftIcon />
                            Back to notes
                        </Link>

                        <button onClick={handleDelete} className='btn btn-error btn-soft'>
                            <Trash2Icon className='size-5' />
                            Delete Note
                        </button>
                    </div>

                    <div className="card bg-base-100">
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="label mb-2">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Note title"
                                    className="input input-bordered w-full"
                                    value={note.title}
                                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                                />
                            </div>

                            <div className="form-control mb-4">
                                <label className="label mb-2">
                                    <span className="label-text">Content</span>
                                </label>
                                <textarea
                                    placeholder="Write your note here..."
                                    className="textarea textarea-bordered h-32 w-full"
                                    value={note.content}
                                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                                />
                            </div>

                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteDetailPage