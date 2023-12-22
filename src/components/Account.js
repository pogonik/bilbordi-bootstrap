import { useState, useEffect } from 'react'
import { supabase, supabaseKey, supabaseUrl } from '../utils/api'

import { Button, Form, Image } from 'react-bootstrap';

export default function Account({ session }) {

  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    async function getProfile() {
      setLoading(true)
      const { user } = session

      let { data, error } = await supabase
        .from('bilbordi')
        .select('*', { count: 'exact', head: true })
        .is('status', true)
      
      console.log(data);

      // const { aa } = await supabase.auth.signOut()





      // fetch(`${supabaseRestUrl}/users`, {
      //   headers: {
      //     Authorization: `Bearer ${session.access_token}`,
      //     'apikey': supabaseAnonKey
      //   }
      // })
      //   .then(res => res.json())
      //   .then(json => console.log(JSON.stringify(json)))


      // let { data, error } = await supabase
      //   .from('profiles')
      //   .select(`username, website, avatar_url`)
      //   .eq('id', user.id)
      //   .single()

      // if (error) {
      //   console.warn(error)
      // } else if (data) {
      //   setUsername(data.username)
      //   setWebsite(data.website)
      //   setAvatarUrl(data.avatar_url)
      // }

      setLoading(false)
    }

    getProfile()
  }, [session])

  async function updateProfile(event, avatarUrl) {
    event.preventDefault()

    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      username,
      website,
      avatarUrl,
      updated_at: new Date(),
    }

    let { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } else {
      setAvatarUrl(avatarUrl)
    }
    setLoading(false)
  }

  return (
    <Form onSubmit={updateProfile} className="form-widget">
      <Image
        url={avatar_url}
        size={150}
        onUpload={(e,url) => updateProfile(e,url) }
      />
      <div>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" id="email" value={session.user.email} disabled />
      </div>
      <div>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          id="username"
          required
          value={username || ''}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className='mb-2.5'>
        <Form.Label>Website</Form.Label>
        <Form.Control
          id="website"
          type="url"
          value={website || ''}
          onChange={e => setWebsite(e.target.value)}
        />
      </div>

      <div className='flex items-center gap-4'>
        <Button color="primary" type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </Button>
        <Button color="primary" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </Button>
      </div>
    </Form>
  )
}