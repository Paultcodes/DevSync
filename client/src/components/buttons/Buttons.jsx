export const ButtonOne = (props) => {
  return (
    <button
      style={{
        backgroundColor: '#00008B',
        border: 'none',
        color: 'white',
        padding: '12px 24px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        borderRadius: '4px',
        cursor: 'pointer',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        transition: 'background-color 0.3s ease',
      }}
      onClick={props.onClick}
    >
      {props.buttonName}
      {props.children}
    </button>
  );
};

export const ButtonTwo = (props) => {
  return (
    <button
      style={{
        backgroundColor: '#fff',
        border: '2px solid #2D2D2D',
        color: '#2D2D2D',
        padding: '12px 24px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        fontWeight: 'bold',
        borderRadius: '4px',
        cursor: 'pointer',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        transition:
          'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
      }}
      onClick={props.onClick}
    >
      {props.buttonName}
    </button>
  );
};

export const ButtonThree = (props) => {
  return (
    <button
    name={props.name}
      style={{
        backgroundColor: '#D63447',
        border: 'none',
        color: '#fff',
        padding: '14px 24px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '18px',
        borderRadius: '40px',
        cursor: 'pointer',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.25)',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
      }}
      onClick={props.onClick}
    >
      {props.buttonName}
    </button>
  );
};

export const ButtonFour = (props) => {
  return (
    <button
      style={{
        backgroundColor: '#00008B',
        border: 'none',
        color: '#fff',
        padding: '9px 15px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        borderRadius: '50px',
        cursor: 'pointer',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
      }}
      onClick={props.onClick}
    >
      {props.buttonName}
    </button>
  );
};
