import "./button.styles.scss";

function Button({ children, ...otherProps }) {
  return (
    <button className="button-82-pushable" {...otherProps}>
      <span className="button-82-shadow"></span>
      <span className="button-82-edge"></span>
      <span className="button-82-front text">{children}</span>
    </button>
  );
}

export default Button;
