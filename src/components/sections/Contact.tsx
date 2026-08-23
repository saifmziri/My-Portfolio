import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check, Send, Sparkles, Phone, AlertCircle } from 'lucide-react';

import { personalInfo } from '../../data/portfolioData';
import { SpotlightCard } from '../ui/SpotlightCard';
import { MagneticButton } from '../animations/MagneticButton';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../ui/Icons';

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    if (personalInfo.phone) {
      navigator.clipboard.writeText(personalInfo.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `Portfolio Message from ${formState.name}`
        })
      });

      const result = await response.json();
      if (result.success) {
        setFormSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        setFormError(result.message || 'Failed to send message. Please try again.');
      }
    } catch {
      setFormError('Network error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#3F4739]">
      <div className="flex items-center gap-3 mb-16">
        <span className="font-mono text-xs text-[#68705A] font-semibold tracking-widest uppercase">
          05 // GET IN TOUCH
        </span>
        <div className="h-px bg-[#3F4739] flex-grow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Direct Contact Details */}
        <div className="lg:col-span-6 space-y-8">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#E8EAE3] leading-none">
            Have a project <br />
            <span className="text-transparent bg-clip-text text-[#E8EAE3] italic underline decoration-[#68705A]">
              worth engineering?
            </span>
          </h2>

          <p className="text-[#969B91] text-base sm:text-lg font-light leading-relaxed max-w-lg">
            I’m available for full-stack web, backend API, database engineering, and desktop application projects. Feel free to reach out directly.
          </p>

          {/* Quick Contact Pills Container */}
          <div className="space-y-3 max-w-md">
            {/* Email Copy Pill */}
            <div className="p-3.5 rounded-xl border border-[#3F4739] bg-[#1B1E1A] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 rounded-lg bg-sky-500/10 text-[#B8F34A] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="block text-[10px] font-mono text-[#68705A] uppercase">Direct Email</span>
                  <span className="text-xs font-mono text-[#E8EAE3] truncate">{personalInfo.email}</span>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg border border-[#3F4739] bg-white/5 hover:bg-white/10 text-[#969B91] transition-colors flex items-center gap-1 shrink-0 text-xs font-mono"
                aria-label="Copy Email address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 hidden sm:inline">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Phone Copy Pill */}
            {personalInfo.phone && (
              <div className="p-3.5 rounded-xl border border-[#3F4739] bg-[#1B1E1A] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="block text-[10px] font-mono text-[#68705A] uppercase">Phone / WhatsApp</span>
                    <span className="text-xs font-mono text-[#E8EAE3] truncate">{personalInfo.phone}</span>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg border border-[#3F4739] bg-white/5 hover:bg-white/10 text-[#969B91] transition-colors flex items-center gap-1 shrink-0 text-xs font-mono"
                  aria-label="Copy Phone number"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 hidden sm:inline">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Social Links Row */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-mono uppercase text-[#68705A] tracking-wider block">
              Digital Profiles & Live Links
            </span>
            <div className="flex flex-wrap gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="badge-social-github"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="badge-social-linkedin"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              {personalInfo.instagram && (
                <a
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge-social-instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-6">
          <SpotlightCard className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#E8EAE3]">Message Sent Successfully!</h3>
                  <p className="text-sm text-[#969B91] font-light max-w-sm mx-auto">
                    Thank you for reaching out! Your message has been transmitted and I will get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormState({ name: '', email: '', message: '' });
                    }}
                    className="px-4 py-2 rounded-full border border-[#3F4739] text-xs font-mono text-[#969B91] hover:text-[#E8EAE3]"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#3F4739] pb-4">
                    <h3 className="text-lg font-bold text-[#E8EAE3]">Direct Dispatch</h3>
                    <span className="text-xs font-mono text-[#68705A]">SAIF.DEV // V2.0</span>
                  </div>

                  {formError && (
                    <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-950/30 text-rose-300 text-xs font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-[#969B91] mb-1.5 uppercase">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#3F4739] bg-[#111311] text-[#E8EAE3] text-sm focus:outline-none focus:border-[#C8F23D] transition-colors font-light"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#969B91] mb-1.5 uppercase">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#3F4739] bg-[#111311] text-[#E8EAE3] text-sm focus:outline-none focus:border-indigo-500 transition-colors font-light"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#969B91] mb-1.5 uppercase">
                        Project Details / Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#3F4739] bg-[#111311] text-[#E8EAE3] text-sm focus:outline-none focus:border-indigo-500 transition-colors font-light resize-none"
                      />
                    </div>
                  </div>

                  <MagneticButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 py-4 px-8 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-sky-600 hover:from-sky-500 hover:to-blue-500 text-[#E8EAE3] text-base font-semibold tracking-wide flex items-center justify-center gap-2.5 shadow-xl shadow-sky-600/20 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="font-mono text-sm animate-pulse">Sending...</span>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-4.5 h-4.5" />
                      </>
                    )}
                  </MagneticButton>
                </form>
              )}
            </AnimatePresence>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
