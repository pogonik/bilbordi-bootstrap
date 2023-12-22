import { useEffect } from 'react'
import { Outlet } from "react-router-dom";

const HomePage = props => {

  useEffect(() => {
    // console.log(props);
  })

  return (
    <div className="container mx-auto max-w-full">
      <p>Stranica je u izradi...</p>
      <Outlet />
    </div>
  )
}

export default HomePage