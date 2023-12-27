import PropTypes from "prop-types"

const MembersInput = (props) => {
  return (
    <div className="m-auto flex w-min flex-col">
      <label htmlFor={props.id}>{props.label}</label>
      <textarea
        className="m-3 rounded-lg border-2 border-gray-500 bg-stone-600 p-2 transition-colors focus:border-gray-300 focus:outline-none"
        cols={50}
        rows={10}
        id={props.id}
        name={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      ></textarea>
    </div>
  )
}

MembersInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default MembersInput
