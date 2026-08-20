import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not set. Email functionality will not work.')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

export interface SendEmailOptions {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  react?: React.ReactElement
  from?: string
  replyTo?: string
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
  react,
  from = process.env.EMAIL_FROM || 'onboarding@resend.dev',
  replyTo,
}: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      react,
      replyTo,
    })

    if (error) {
      console.error('Failed to send email:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email sending error:', error)
    return { success: false, error }
  }
}
