'use client'
import { useState } from 'react'

// To activate this form:
// 1. Go to https://formspree.io and create a free account
// 2. Create a new form, enter your email address
// 3. Copy the form endpoint ID (e.g. "xabc1234")
// 4. Replace REPLACE_WITH_FORMSPREE_ID below with your actual ID
const FORMSPREE_ID = 'REPLACE_WITH_FORMSPREE_ID'

export default function QuoteForm() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    const data = new FormData(e.target)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        e.target.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="quotePanel quoteSuccess">
        <div className="successIcon">✓</div>
        <h3>Request received!</h3>
        <p>We will respond within 24 hours with a technical recommendation and quotation. You can also WhatsApp us directly for faster response.</p>
      </div>
    )
  }

  return (
    <div className="quotePanel">
      <p className="eyebrow red">FREE QUOTE &amp; ASSESSMENT</p>
      <form onSubmit={handleSubmit} className="quoteForm">
        <div className="formRow">
          <div className="formField">
            <label>Factory Name *</label>
            <input name="factory_name" required placeholder="Your factory or company name" />
          </div>
          <div className="formField">
            <label>Current Boiler Fuel *</label>
            <select name="current_fuel" required>
              <option value="">Select current fuel type</option>
              <option>Natural Gas</option>
              <option>Diesel / Furnace Oil</option>
              <option>Coal</option>
              <option>Biomass / Rice Husk</option>
              <option>No boiler yet</option>
            </select>
          </div>
        </div>
        <div className="formRow">
          <div className="formField">
            <label>Capacity Required *</label>
            <select name="capacity" required>
              <option value="">Select steam capacity</option>
              <option>0.5 ton/hr</option>
              <option>1 ton/hr</option>
              <option>2 ton/hr</option>
              <option>3 ton/hr</option>
              <option>5 ton/hr</option>
              <option>8 ton/hr</option>
              <option>10 ton/hr</option>
              <option>15 ton/hr</option>
              <option>20 ton/hr or above</option>
            </select>
          </div>
          <div className="formField">
            <label>Industry / Application *</label>
            <select name="industry" required>
              <option value="">Select your industry</option>
              <option>RMG / Garment</option>
              <option>Textile / Dyeing</option>
              <option>Printing &amp; Finishing</option>
              <option>Rice Mill</option>
              <option>Jute Mill</option>
              <option>Food Processing</option>
              <option>Pharmaceutical</option>
              <option>Paper &amp; Packaging</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div className="formRow">
          <div className="formField">
            <label>Contact Name *</label>
            <input name="contact_name" required placeholder="Your full name" />
          </div>
          <div className="formField">
            <label>Phone / WhatsApp *</label>
            <input name="phone" required placeholder="+880 ..." />
          </div>
        </div>
        <div className="formField">
          <label>Email</label>
          <input name="email" type="email" placeholder="your@email.com" />
        </div>
        <div className="formField">
          <label>Additional Information</label>
          <textarea name="message" rows={3} placeholder="Factory location, existing boiler age, fuel cost concerns, compliance issues..." />
        </div>
        {status === 'error' && (
          <p className="formError">Submission failed. Please WhatsApp us directly at +880 1941-646278.</p>
        )}
        <button type="submit" className="btn full" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : 'Request Free Quote & Assessment →'}
        </button>
      </form>
    </div>
  )
}
