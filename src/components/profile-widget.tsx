'use client';

import { useState } from 'react';
import { useUser, SignOutButton } from '@danainnovations/sonance-auth';

export function ProfileWidget() {
  const user = useUser();
  const [open, setOpen] = useState(false);
  if (!user) return null;

  const name = user.name || user.email || 'User';
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <div
      style={{
        position: 'fixed',
        top: 12,
        right: 16,
        zIndex: 99999,
        fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(13,13,13,0.85)',
          color: '#fff',
          border: '1px solid #333',
          borderRadius: 999,
          padding: '4px 12px 4px 4px',
          cursor: 'pointer',
          fontSize: 12,
        }}
      >
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#00A3E0',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          {initial}
        </span>
        <span style={{ fontWeight: 600 }}>{name}</span>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 44,
            right: 0,
            minWidth: 200,
            background: '#fff',
            color: '#333F48',
            border: '1px solid #e2e5ea',
            borderRadius: 10,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            padding: 12,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{name}</div>
          {user.email && (
            <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 10, wordBreak: 'break-all' }}>
              {user.email}
            </div>
          )}
          <SignOutButton />
        </div>
      )}
    </div>
  );
}

export default ProfileWidget;
