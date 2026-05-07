const STORAGE_KEY = 'rmp_professors';

export function saveProfessors(professors) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(professors));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function loadProfessors() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
}