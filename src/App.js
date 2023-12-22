import { useState, useEffect, Suspense } from 'react'
import { supabase, lokacije, lokacijaSifra, lokacijePoGradu, svePonude } from './utils/api'
import Auth from './components/Auth'
import Account from './components/Account'

import Layout from './components/Layout'
import Bilbordi from './components/Bilbordi'
import Ponude from './components/Ponude'
import HomePage from './components/HomePage'

import { Outlet, createBrowserRouter, createRoutesFromElements, RouterProvider, Routes, Route } from "react-router-dom";

function App() {
  const [session, setSession] = useState(null)



  const router = createBrowserRouter([
    {
      
      path: "/",
      element: <Layout />,
      children: [
        { index: true, Component: HomePage },
        { path: '/home', Component: HomePage },
        { path: "/bilbordi", Component: Bilbordi, children: [
          { path: "/bilbordi/strana/:strana", Component: Bilbordi },
          { path: "sifra", Component: HomePage, children: [
            { path: ":sifra", loader: lokacijaSifra, Component: Bilbordi }
          ]}
        ]},
        { path: "/ponude", Component: Ponude, children: [
          { path: "/ponude/strana/:strana", Component: Ponude },
          { path: ":id", Component: HomePage, children: [
            { path: ":sifra", loader: lokacijaSifra, Component: Bilbordi }
          ]}
        ]},
        {
          path: "/novi-bilbord", Component: HomePage
        },
        {
          path: "/nova-ponuda", Component: HomePage
        }
      ]
    }
  ]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <Suspense fallback={<div>loading</div>}>
      <RouterProvider router={router} fallbackElement={`...loading`}>
        <Layout />
        {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
      </RouterProvider>
    </Suspense>
      
  )
}

export default App