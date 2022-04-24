import { useState } from 'react';

function AddHabitLogAccordian({title}) {
  const [isEntryOpen, setIsEntryOpen] = useState({});

  function toggleEntry(title) {
    setIsEntryOpen({
      ...isEntryOpen,
      [title]: !isEntryOpen[title],
    });
  }
  const isOpen = isEntryOpen[title];
  return (
    <div className="accordion">
          <div
            key={title}
            className={`accordion__entry ${isOpen ? 'accordion__entry--open' : '' }`}
          >
            <button
              className="accordion__title"
              onClick={ () => toggleEntry(title) }
            >
                View
            </button>
            <div className="accordion__body">
            </div>
          </div>
    </div>
  );
};

export default AddHabitLogAccordian;