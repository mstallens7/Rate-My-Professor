import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProfessorCard from './components/ProfessorCard';
import Modal from './components/Modal';
import ReviewForm from './components/ReviewForm';
import { professors as initialProfessors } from './data/professors';
import { saveProfessors, loadProfessors } from './utils/storage';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [professors, setProfessors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  // Load data when the app first opens
  useEffect(() => {
    const saved = loadProfessors();
    if (saved) {
      setProfessors(saved);
    } else {
      setProfessors(initialProfessors);
    }
  }, []);

  // Save data whenever professors change
  useEffect(() => {
    if (professors.length > 0) {
      saveProfessors(professors);
    }
  }, [professors]);

  const filteredProfessors = professors.filter(prof =>
    prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleAddReview(professorId) {
    const prof = professors.find(p => p.id === professorId);
    setSelectedProfessor(prof);
    setIsModalOpen(true);
  }

  function handleSubmitReview(review) {
    setProfessors(prev =>
      prev.map(prof => {
        if (prof.id === selectedProfessor.id) {
          const newReviews = [...prof.reviews, {
            id: prof.reviews.length + 1,
            rating: review.rating,
            text: review.text
          }];
          const avgRating = newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length;
          return {
            ...prof,
            reviews: newReviews,
            rating: Math.round(avgRating * 10) / 10
          };
        }
        return prof;
      })
    );
    setIsModalOpen(false);
    setSelectedProfessor(null);
  }

  return (
    <div className="app">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <main className="main">
        <div className="professor-grid">
          {filteredProfessors.map(professor => (
            <ProfessorCard
              key={professor.id}
              name={professor.name}
              department={professor.department}
              rating={professor.rating}
              reviews={professor.reviews}
              onAddReview={() => handleAddReview(professor.id)}
            />
          ))}
        </div>
        {filteredProfessors.length === 0 && (
          <div className="no-results">
            <p>No professors found matching "{searchTerm}"</p>
          </div>
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedProfessor(null); }}
        title={selectedProfessor ? `Review ${selectedProfessor.name}` : 'Add Review'}
      >
        {selectedProfessor && (
          <ReviewForm
            professorName={selectedProfessor.name}
            onSubmit={handleSubmitReview}
            onCancel={() => { setIsModalOpen(false); setSelectedProfessor(null); }}
          />
        )}
      </Modal>
    </div>
  );
}

export default App;