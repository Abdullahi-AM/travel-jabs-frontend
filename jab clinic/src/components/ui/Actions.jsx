const Action = ({ onClick, showText, buttonText }) => (
  <button className='Action' onClick={onClick}>
    <p>{buttonText}</p>
  </button>
);

// -----------------------------------------
// Action Tray /////////////////////////////
// -----------------------------------------

const Tray = ({ children }) => <div className='ActionTray'>{children}</div>;

// -----------------------------------------
// Actions /////////////////////////////////
// -----------------------------------------

const Add = ({ onClick, showText = false, buttonText = 'Add' }) => (
  <Action buttonText={buttonText} onClick={onClick} showText={showText} />
);

const Book = ({ onClick, showText = false, buttonText = 'Book Appointment' }) => (
  <Action buttonText={buttonText} onClick={onClick} showText={showText} />
);

const Cancel = ({ onClick, showText = false, buttonText = 'Cancel' }) => (
  <Action buttonText={buttonText} onClick={onClick} showText={showText} />
);

const Collapse = ({ onClick, showText = false, buttonText = 'Collapse' }) => (
  <Action buttonText={buttonText} onClick={onClick} showText={showText} />
);

const Close = ({ onClick, showText = false, buttonText = 'Close' }) => (
  <Action buttonText={buttonText} onClick={onClick} showText={showText} />
);

const Delete = ({ onClick, showText = false, buttonText = 'Delete' }) => (
  <Action buttonText={buttonText} onClick={onClick} showText={showText} />
);

const Dismiss = ({ onClick, showText = false, buttonText = 'Dismiss' }) => (
  <Action buttonText={buttonText} onClick={onClick} showText={showText} />
);

const Expand = ({ onClick, showText = false, buttonText = 'Expand' }) => (
  <Action buttonText={buttonText} onClick={onClick} showText={showText} />
);

const Favourites = ({ onClick, showText = false, buttonText = 'List favourites' }) => (
  <Action buttonText={buttonText} onClick={onClick} showText={showText} />
);

const ListAll = ({ onClick, showText = false, buttonText = 'List all' }) => (
  <Action buttonText={buttonText} onClick={onClick} showText={showText} />
);

const Modify = ({ onClick, showText = false, buttonText = 'Modify' }) => (
  <Action buttonText={buttonText} onClick={onClick} showText={showText} />
);

const No = ({ onClick, showText = false, buttonText = 'No' }) => (
  <Action buttonText={buttonText} onClick={onClick} showText={showText} />
);

const Submit = ({ onClick, showText = false, buttonText = 'Submit' }) => (
  <Action buttonText={buttonText} onClick={onClick} showText={showText} />
);

const Subscribe = ({ onClick, showText = false, buttonText = 'Subscribe' }) => (
  <Action buttonText={buttonText} onClick={onClick} showText={showText} />
);

const Yes = ({ onClick, showText = false, buttonText = 'Yes' }) => (
  <Action buttonText={buttonText} onClick={onClick} showText={showText} />
);

const Unsubscribe = ({ onClick, showText = false, buttonText = 'Unsubscribe' }) => (
  <Action buttonText={buttonText} onClick={onClick} showText={showText} />
);

// -----------------------------------------
// Compose and export Action object ////////
// -----------------------------------------

Action.Tray = Tray;

Action.Add = Add;
Action.Book = Book;
Action.Cancel = Cancel;
Action.Close = Close;
Action.Collapse = Collapse;
Action.Delete = Delete;
Action.Dismiss = Dismiss;
Action.Expand = Expand;
Action.Favourites = Favourites;
Action.ListAll = ListAll;
Action.Modify = Modify;
Action.No = No;
Action.Submit = Submit;
Action.Subscribe = Subscribe;
Action.Yes = Yes;
Action.Unsubscribe = Unsubscribe;

export default Action;
