'use client'

import { Suspense, useState } from 'react'
import type { FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function GateForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const res = await fetch('/api/gate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      const next = params.get('next')
      router.replace(next && next.startsWith('/') ? next : '/')
      router.refresh()
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ECEEF2',
        fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
        padding: 24,
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: '100%',
          maxWidth: 380,
          background: '#fff',
          borderRadius: 14,
          boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
          overflow: 'hidden',
        }}
      >
        <div style={{ background: '#0D0D0D', padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 4, height: 34, background: '#00A3E0', borderRadius: 2 }} />
          <div>
            <div style={{ color: '#fff', fontSize: 15, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Monday Sales Report
            </div>
            <div style={{ color: '#888', fontSize: 10, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 2 }}>
              Sonance
            </div>
          </div>
        </div>

        <div style={{ padding: 28 }}>
          <label htmlFor="pw" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#333F48', marginBottom: 8 }}>
            Enter the access password to continue
          </label>
          <input
            id="pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              padding: '11px 13px',
              fontSize: 14,
              border: `1px solid ${error ? '#d33' : '#cfd4dc'}`,
              borderRadius: 8,
              outline: 'none',
            }}
          />
          {error && (
            <div style={{ color: '#d33', fontSize: 12, marginTop: 8 }}>Incorrect password. Please try again.</div>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: '100%',
              marginTop: 16,
              padding: '11px 13px',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#fff',
              background: loading || !password ? '#7fb9d6' : '#00A3E0',
              border: 'none',
              borderRadius: 8,
              cursor: loading || !password ? 'default' : 'pointer',
            }}
          >
            {loading ? 'Checking…' : 'Continue'}
          </button>
          <div style={{ marginTop: 16, fontSize: 11, color: '#9aa1ab', textAlign: 'center' }}>
            After this you'll sign in with your Sonance account.
          </div>
        </div>
      </form>
    </div>
  )
}

export default function GatePage() {
  return (
    <Suspense>
      <GateForm />
    </Suspense>
  )
}
