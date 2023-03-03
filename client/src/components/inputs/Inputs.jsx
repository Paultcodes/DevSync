export const InputOne = (props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      name={props.name}
      onChange={props.onChange}
      style={{
        backgroundColor: '#fff',
        border: '2px solid #2D2D2D',
        color: '#2D2D2D',
        padding: '12px 16px',
        fontSize: '16px',
        borderRadius: '4px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        width: '100%',
        boxSizing: 'border-box',
      }}
    />
  );
};

export const InputTwo = (props) => {
  return (
    <input
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      style={{
        backgroundColor: '#F5F5F5',
        border: 'none',
        color: '#2D2D2D',
        padding: '14px 16px',
        fontSize: '18px',
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        width: '400px',
        boxSizing: 'border-box',
      }}
    />
  );
};
