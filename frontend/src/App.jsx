import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  GraduationCap, 
  Scissors, 
  Paperclip, 
  Triangle, 
  Book, 
  Clipboard, 
  Pencil,
  ChevronDown,
  Apple,
  X
} from 'lucide-react';
import './index.css';

const API_URL = 'http://localhost:8000/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [filterBy, setFilterBy] = useState('Subject');
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'update'
  const [formData, setFormData] = useState({ title: '', subject: '', content: '', uploadedBy: '' });

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${API_URL}/getall`);
      if (response.data) {
        setNotes(response.data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const displayedNotes = [...notes].sort((a, b) => {
    if (filterBy === 'Subject') return a.subject.localeCompare(b.subject);
    if (filterBy === 'Uploader') return a.uploadedBy.localeCompare(b.uploadedBy);
    return 0;
  });

  const handleOpenModal = (mode) => {
    setModalMode(mode);
    if (mode === 'create') {
      setFormData({ title: '', subject: '', content: '', uploadedBy: '' });
    } else if (mode === 'update') {
      const noteToUpdate = notes.find(n => n._id === selectedNoteId);
      if (noteToUpdate) {
        setFormData({ 
          title: noteToUpdate.title || '', 
          subject: noteToUpdate.subject || '', 
          content: noteToUpdate.content || '', 
          uploadedBy: noteToUpdate.uploadedBy || '' 
        });
      }
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'create') {
        await axios.post(`${API_URL}/create`, formData);
      } else if (modalMode === 'update') {
        await axios.put(`${API_URL}/update/${selectedNoteId}`, formData);
      }
      setIsModalOpen(false);
      setSelectedNoteId(null);
      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Failed to save note");
    }
  };

  const handleDelete = async () => {
    if (!selectedNoteId) return;
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await axios.delete(`${API_URL}/delete/${selectedNoteId}`);
        setSelectedNoteId(null);
        fetchNotes();
      } catch (error) {
        console.error("Error deleting note:", error);
        alert("Failed to delete note");
      }
    }
  };

  // Extract unique subjects for the carousel
  const uniqueSubjects = [...new Set(notes.map(n => n.subject))];

  return (
    <div className="min-h-screen bg-[#71C5D4] relative overflow-x-hidden font-sans text-gray-800">
      
      {/* Decorative Floating Icons */}
      <div className="absolute top-10 left-10 text-white/40 rotate-12">
        <Scissors size={64} />
      </div>
      <div className="absolute top-40 right-12 text-white/40 -rotate-12">
        <Paperclip size={56} />
      </div>
      <div className="absolute bottom-32 left-16 text-white/40 rotate-45">
        <Triangle size={72} />
      </div>
      <div className="absolute top-1/2 left-24 text-white/40 -rotate-6">
        <Clipboard size={60} />
      </div>
      <div className="absolute bottom-40 right-20 text-white/40 rotate-12 flex flex-col items-center">
        <Apple size={32} className="mb-[-10px] z-10 relative" />
        <Book size={64} />
      </div>
      <div className="absolute top-20 right-32 text-white/40 -rotate-45">
        <Pencil size={56} />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 flex flex-col items-center min-h-screen">
        
        {/* Header */}
        <header className="flex flex-col items-center mb-10">
          <div className="bg-white p-4 rounded-full mb-2 shadow-lg inline-block">
            <GraduationCap size={48} className="text-[#1E3A8A]" />
          </div>
          <h1 className="text-5xl font-black text-[#1E3A8A] tracking-wider uppercase drop-shadow-md">
            NoteShare
          </h1>
        </header>

        {/* Top Controls Area */}
        <div className="w-full max-w-2xl bg-white/30 backdrop-blur-sm p-6 rounded-3xl shadow-lg flex flex-col items-center mb-8 border border-white/50">
          
          {/* Filter Dropdown */}
          <div className="flex items-center gap-4 w-full max-w-sm mb-8">
            <label className="font-bold text-[#1E3A8A] whitespace-nowrap text-lg">Sort By:</label>
            <div className="relative w-full">
              <select 
                className="w-full appearance-none bg-white border-2 border-white text-[#1E3A8A] font-semibold py-3 px-4 pr-10 rounded-xl shadow-md focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-400 transition-all cursor-pointer"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option value="Subject">Subject</option>
                <option value="Uploader">Uploader</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#1E3A8A]">
                <ChevronDown size={20} strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-4 w-full max-w-xs">
            <button 
              onClick={() => handleOpenModal('create')}
              className="w-full bg-[#FCD34D] hover:bg-[#FBBF24] text-[#1E3A8A] font-bold py-3 px-6 rounded-xl shadow-md transform transition-transform hover:scale-105 active:scale-95 border-b-4 border-[#F59E0B]">
              ADD Notes
            </button>
            <div className="flex w-full gap-4">
              <button 
                onClick={() => selectedNoteId ? handleOpenModal('update') : alert("Please select a note below to update")}
                className={`flex-1 font-bold py-3 px-4 rounded-xl shadow-md transform transition-transform border-b-4 ${selectedNoteId ? 'bg-[#FCD34D] hover:bg-[#FBBF24] text-[#1E3A8A] hover:scale-105 active:scale-95 border-[#F59E0B]' : 'bg-white/50 text-gray-500 border-gray-300 cursor-not-allowed hover:bg-white/50'}`}>
                UPDATE
              </button>
              <button 
                onClick={() => selectedNoteId ? handleDelete() : alert("Please select a note below to delete")}
                className={`flex-1 font-bold py-3 px-4 rounded-xl shadow-md transform transition-transform border-b-4 ${selectedNoteId ? 'bg-[#FCD34D] hover:bg-[#FBBF24] text-[#1E3A8A] hover:scale-105 active:scale-95 border-[#F59E0B]' : 'bg-white/50 text-gray-500 border-gray-300 cursor-not-allowed hover:bg-white/50'}`}>
                DELETE
              </button>
            </div>
          </div>
        </div>

        {/* Main Display Area */}
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 mb-8 border-4 border-white/40">
          <h2 className="text-2xl font-black text-[#1E3A8A] mb-6 border-b-2 border-gray-100 pb-2 flex items-center gap-2">
            <Book size={28} />
            Show Notes: <span className="text-gray-400 text-lg font-medium ml-2">Sorted by {filterBy}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedNotes.length === 0 ? (
              <p className="text-gray-500 italic col-span-2 text-center py-4">No notes found. Add some!</p>
            ) : (
              displayedNotes.map(note => (
                <div 
                  key={note._id} 
                  onClick={() => setSelectedNoteId(note._id)}
                  className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${selectedNoteId === note._id ? 'bg-[#71C5D4]/10 border-[#71C5D4] shadow-md transform scale-[1.02]' : 'bg-gray-50 border-gray-200 hover:shadow-md'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="bg-[#71C5D4]/20 text-[#1E3A8A] font-bold text-xs px-2 py-1 rounded uppercase tracking-wider inline-block mb-1">
                        {note.subject}
                      </span>
                      <h3 className="font-bold text-[#1E3A8A] text-lg leading-tight">{note.title}</h3>
                    </div>
                    <span className="text-gray-500 text-xs flex items-center gap-1 bg-white px-2 py-1 rounded shadow-sm">
                      <GraduationCap size={12} /> {note.uploadedBy}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium text-sm mt-2">{note.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom Carousel / Data Collections */}
        <div className="w-full max-w-4xl flex flex-col items-center">
          <div className="flex gap-4 w-full overflow-x-auto pb-6 px-2 no-scrollbar snap-x justify-start md:justify-center">
            {uniqueSubjects.length > 0 ? (
              uniqueSubjects.map((sub, idx) => (
                <div key={idx} className={`snap-center shrink-0 w-48 rounded-2xl p-6 shadow-lg border-b-4 transform transition-transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-center min-h-[140px] ${idx % 3 === 0 ? 'bg-[#FCD34D] border-[#F59E0B] text-[#1E3A8A]' : idx % 3 === 1 ? 'bg-white border-gray-200 text-[#1E3A8A]' : 'bg-[#71C5D4] border-[#4da8b8] text-white opacity-90'}`}>
                  {idx % 3 === 0 ? <Book size={32} className="mb-2" /> : idx % 3 === 1 ? <Triangle size={32} className="mb-2" /> : <Clipboard size={32} className="mb-2" />}
                  <h3 className="font-bold text-center text-lg">{sub}</h3>
                </div>
              ))
            ) : (
              <div className="snap-center shrink-0 w-48 bg-white/50 rounded-2xl p-6 shadow-sm border-2 border-dashed border-white/60 flex flex-col items-center justify-center min-h-[140px] text-white/80">
                <h3 className="font-bold text-center">No Subjects</h3>
              </div>
            )}
          </div>
          
          <div className="flex gap-3 mt-2">
            <button className="w-3 h-3 rounded-full bg-white shadow-sm"></button>
            <button className="w-3 h-3 rounded-full bg-white/40 hover:bg-white/60 transition-colors shadow-sm"></button>
            <button className="w-3 h-3 rounded-full bg-white/40 hover:bg-white/60 transition-colors shadow-sm"></button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in duration-200">
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-black text-[#1E3A8A] mb-6 flex items-center gap-2">
              <Pencil size={24} className="text-[#F59E0B]" />
              {modalMode === 'create' ? 'Add New Note' : 'Update Note'}
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleFormChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-[#71C5D4] focus:ring-2 focus:ring-[#71C5D4]/20 outline-none transition-all"
                  placeholder="e.g. Chapter 1 Summary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleFormChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-[#71C5D4] focus:ring-2 focus:ring-[#71C5D4]/20 outline-none transition-all"
                  placeholder="e.g. Mathematics"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Uploader</label>
                <input 
                  type="text" 
                  name="uploadedBy" 
                  value={formData.uploadedBy} 
                  onChange={handleFormChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-[#71C5D4] focus:ring-2 focus:ring-[#71C5D4]/20 outline-none transition-all"
                  placeholder="e.g. Mr. Smith"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Content</label>
                <textarea 
                  name="content" 
                  value={formData.content} 
                  onChange={handleFormChange}
                  required
                  rows="4"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-[#71C5D4] focus:ring-2 focus:ring-[#71C5D4]/20 outline-none transition-all resize-none"
                  placeholder="Write your note content here..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-[#1E3A8A] hover:bg-[#152c6b] text-white font-bold py-3 px-4 rounded-xl shadow-md mt-2 transform transition-transform hover:scale-[1.02] active:scale-95">
                {modalMode === 'create' ? 'Save Note' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
