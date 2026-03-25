export default function Pagination({ currentPages, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPages - 1)}
        disabled={currentPages === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPages} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPages + 1)}
        disabled={currentPages === totalPages}
      >
        Next
      </button>
    </div>
  );
}
