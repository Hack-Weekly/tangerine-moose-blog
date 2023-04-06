import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      className={styles.input}
      style={{ width: props.width }}
    />
  );
};

export default Input;
