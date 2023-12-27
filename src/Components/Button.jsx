import PropTypes from "prop-types"

const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className="m-2 rounded-lg bg-gray-500 p-2 text-white transition-colors hover:bg-gray-600 focus:bg-gray-600 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50"
    >
      {props.text}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default Button
