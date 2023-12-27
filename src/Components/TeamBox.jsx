import PropTypes from "prop-types"

const TeamBox = (props) => {
  return (
    <div className="w-full rounded-lg border-2 border-gray-400 p-2 ">
      <h2 className="mb-3 border-b border-dashed border-gray-400 pb-2 font-bold">
        Team {props.id}
      </h2>
      {props.team.map((member, index) => (
        <p key={index}>{member}</p>
      ))}
    </div>
  )
}

TeamBox.propTypes = {
  id: PropTypes.number.isRequired,
  team: PropTypes.array.isRequired,
}

export default TeamBox
