import './Header.css';

function Header({ searchTerm, onSearchChange }) {
  return (
    <header className="header">
      <h1 className="header-title">Rate My Professor</h1>
      <input
        type="text"
        className="header-search"
        placeholder="Search professors..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </header>
  );
}

export default Header;