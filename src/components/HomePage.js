import { useEffect } from 'react'
import { Outlet } from "react-router-dom";
// import MainHero from './MainHero'

const HomePage = props => {

  useEffect(() => {
    console.log(props);
  })

  return (
    <div className="container mx-auto max-w-full">
      {/* <MainHero /> */}
      <Outlet />
    </div>
  )
}

export default HomePage