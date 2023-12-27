import { useEffect, useState } from "react"
import MembersInput from "../Components/MembersInput"
import axios from "axios"
import Button from "../Components/Button"
import TeamBox from "../Components/TeamBox"
import ChampionBox from "../Components/ChampionBox"

const MainView = () => {
  const [members, setMembers] = useState("")
  const [champions, setChampions] = useState([])
  const [teams, setTeams] = useState([])
  const [error, setError] = useState("")
  const [championsSets, setChampionsSets] = useState([])

  useEffect(() => {
    if (!members) return setTeams([])
  }, [members])

  useEffect(() => {
    axios
      .get(
        "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion.json",
      )
      .then((res) => {
        const data = res.data.data
        const champList = []
        for (const champ in data) {
          champList.push(data[champ].name)
        }
        setChampions(champList)
      })
  }, [])

  const validateMembers = (members) => {
    const memebrLength = members.trim().split("\n").length

    if (!members) {
      setError("Please enter team members")
      return false
    }

    if (memebrLength < 3) {
      setError("Please enter at least 3 team members")
      return false
    }

    if (memebrLength > 4 && memebrLength < 8) {
      setError("Please enter 3-4 team members or 8 team members")
      return false
    }
    if (memebrLength > 8) {
      setError("Please enter no more than 8 team members")
      return false
    }

    const membersArr = members.trim().split("\n")
    const uniqueMembers = [...new Set(membersArr)]
    if (uniqueMembers.length !== membersArr.length) {
      setError("Please enter unique team members")
      return false
    }
    if (membersArr.some((member) => !member)) {
      setError("Please enter valid team members")
      return false
    }
    return true
  }

  const randomizeChampions = () => {
    const isTeamValid = validateMembers(members)
    if (!isTeamValid) return
    if (!champions.length)
      return setError("Please wait for champions to load or refresh the page")

    if (teams.length < championsSets.length) randomizeTeams()

    setError("")
    const teamsArr = [...teams]
    const championsArr = [...champions]
    const championsSet = []
    for (let i = 0; i < teamsArr.length; i++) {
      const champions = []
      for (let j = 0; j < 2; j++) {
        const randomIndex = Math.floor(Math.random() * championsArr.length)
        champions.push(championsArr[randomIndex])
        championsArr.splice(randomIndex, 1)
      }
      championsSet.push(champions)
    }
    setChampionsSets([...championsSet])
  }

  const randomizeTeams = () => {
    const isTeamValid = validateMembers(members)
    if (!isTeamValid) return

    setError("")
    const membersArr = members.trim().split("\n")
    const shuffledMembers = membersArr.sort(() => Math.random() - 0.5)
    console.log(shuffledMembers)
    const teams = []
    for (let i = 0; i < shuffledMembers.length; i += 2) {
      teams.push([
        shuffledMembers[i] ? shuffledMembers[i] : "RANDOM PLAYER",
        shuffledMembers[i + 1] ? shuffledMembers[i + 1] : "RANDOM PLAYER",
      ])
    }
    setTeams(teams)
    setChampionsSets([])
  }

  return (
    <div className="m-auto text-center">
      <h1 className="p-5 text-3xl font-bold">
        League of Legensd Arena - Randomize Teams and Champions
      </h1>
      <MembersInput
        id="members"
        label="Enter Team Members (one per line, 3-4, 8)"
        value={members}
        onChange={(val) => setMembers(val)}
      />
      <div>
        <Button
          onClick={randomizeTeams}
          disabled={!members}
          text="Randomize Teams"
        />
        <Button
          onClick={randomizeChampions}
          disabled={!teams[0]}
          text="Randomize Champions"
        />
        <p className="mb-3 text-lg font-medium text-red-500">{error}</p>
      </div>
      <div className={`mx-10 flex justify-center gap-3`}>
        {teams.map((team, index) => (
          <div className="flex-1" key={index}>
            <TeamBox id={index + 1} team={team} />
          </div>
        ))}
      </div>
      <div className={`mx-10 mt-5 flex justify-center gap-3`}>
        {championsSets.map((champions, index) => (
          <div className="flex-1" key={index}>
            <ChampionBox id={index + 1} champions={champions} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainView
