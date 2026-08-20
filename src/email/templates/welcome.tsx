import * as React from 'react'

interface WelcomeEmailProps {
  firstName?: string
  loginUrl?: string
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  firstName = 'there',
  loginUrl = 'https://example.com/login',
}) => {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Welcome to Gezairi!</h1>

      <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.5' }}>
        Hi {firstName},
      </p>

      <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.5' }}>
        Thank you for joining us. We&apos;re excited to have you on board!
      </p>

      <div style={{ margin: '30px 0' }}>
        <a
          href={loginUrl}
          style={{
            backgroundColor: '#000',
            color: '#fff',
            padding: '12px 24px',
            textDecoration: 'none',
            borderRadius: '6px',
            display: 'inline-block',
          }}
        >
          Get Started
        </a>
      </div>

      <p style={{ color: '#999', fontSize: '14px', marginTop: '30px' }}>
        If you have any questions, feel free to reply to this email.
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '30px 0' }} />

      <p style={{ color: '#999', fontSize: '12px' }}>
        This email was sent by Gezairi. If you didn&apos;t sign up, you can safely ignore this
        email.
      </p>
    </div>
  )
}

export default WelcomeEmail
