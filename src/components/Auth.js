import { useState } from 'react'
import { supabase } from '../utils/api'

import { Button, Form } from 'react-bootstrap';

export default function Auth() {

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')

  const handleLogin = async e => {
    e.preventDefault()

    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h3 className="header">Login</h3>
        <p className="description">Sign in via magic link with your email below</p>
        <Form className="form-widget" onSubmit={handleLogin}>
          <Form.Control
            type="email"
            placeholder="Your email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            type="password"
            placeholder="Your password"
            value={password}
            required
            onChange={e => setPass(e.target.value)}
          />
          <div>
            <Button className={'button block'} color='primary' disabled={loading}>
              {loading ? <span>Loading</span> : <span>Send magic link</span>}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}