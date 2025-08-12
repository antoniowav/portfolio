import type { Metadata } from 'next'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with me for collaborations, job opportunities, or just to say hello.',
  openGraph: {
    title: 'Antonio Piattelli - Contact',
    description:
      'Get in touch with me for collaborations, job opportunities, or just to say hello.',
  },
}

export default function ContactPage(): JSX.Element {
  return <ContactForm />
}
