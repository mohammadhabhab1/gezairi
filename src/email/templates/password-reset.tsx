import * as React from 'react'

interface PasswordResetEmailProps {
  firstName?: string
  resetUrl: string
  expiryHours?: number
}

export const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({
  firstName = 'there',
  resetUrl,
  expiryHours = 24,
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
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Reset Your Password</h1>

      <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.5' }}>
        Hi {firstName},
      </p>

      <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.5' }}>
        We received a request to reset your password. Click the button below to create a new
        password:
      </p>

      <div style={{ margin: '30px 0' }}>
        <a
          href={resetUrl}
          style={{
            backgroundColor: '#000',
            color: '#fff',
            padding: '12px 24px',
            textDecoration: 'none',
            borderRadius: '6px',
            display: 'inline-block',
          }}
        >
          Reset Password
        </a>
      </div>

      <p style={{ color: '#666', fontSize: '14px' }}>
        This link will expire in {expiryHours} hours.
      </p>

      <p style={{ color: '#999', fontSize: '14px', marginTop: '30px' }}>
        If you didn&apos;t request a password reset, you can safely ignore this email. Your
        password will remain unchanged.
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '30px 0' }} />

      <p style={{ color: '#999', fontSize: '12px' }}>
        This email was sent by Gezairi. For security, this request was received from your
        account.
      </p>
    </div>
  )
}

export default PasswordResetEmail
