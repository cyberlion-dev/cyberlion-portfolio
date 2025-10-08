// Custom component - Contact section with GSAP scroll-triggered animations
// Includes EmailJS integration, honeypot spam protection, and creative captcha

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CaptchaChallenge } from '@/components/ui/captcha-challenge';
import { Mail, MapPin, Phone, Send, CheckCircle, XCircle, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// EmailJS Configuration - Replace these with your actual values
const EMAILJS_CONFIG = {
  SERVICE_ID: 'gmail2', // Replace with your EmailJS service ID
  TEMPLATE_ID: 'template_50j6eb6', // Replace with your EmailJS template ID
  PUBLIC_KEY: 'user_o4tEBCpcTsbstAtv5jsln', // Replace with your EmailJS public key
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '', // Honeypot field - should remain empty
  });
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [captchaResetKey, setCaptchaResetKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleCaptchaChange = (answer: string, isCorrect: boolean) => {
    setIsCaptchaValid(isCorrect);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-title', {
        scrollTrigger: {
          trigger: '.contact-title',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });

      gsap.from('.contact-info-card', {
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 80%',
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power4.out',
      });

      gsap.from('.contact-form', {
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 80%',
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - if 'website' field is filled, it's likely a bot
    if (formData.website) {
      console.log('Bot detected via honeypot');
      return;
    }

    // Captcha verification
    if (!isCaptchaValid) {
      setSubmitStatus('error');
      setStatusMessage('Please select the correct answer to verify you\'re human.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send email via EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Jordan Boyce',
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setStatusMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!');
        setFormData({ name: '', email: '', message: '', website: '' });
        setIsCaptchaValid(false);
        // Reset captcha with a new random question
        setCaptchaResetKey(prev => prev + 1);
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
      setStatusMessage('Oops! Something went wrong. Please try again or email me directly at hello@jordanboyce.com');
    } finally {
      setIsSubmitting(false);
      // Auto-hide status message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      details: 'jordan.boyce@cyberlion.dev',
      link: 'mailto:jordan.boyce@cyberlion.dev',
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      details: '+1 (208) 534-6069',
      link: 'tel:+12085346069',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      details: 'Chandler, AZ, USA',
    },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <h2 className="contact-title text-4xl md:text-5xl font-bold text-center mb-6">
          Let&apos;s Work Together
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Have a project in mind? I&apos;d love to hear about it. Drop me a message and let&apos;s create
          something amazing together.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="contact-info space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="contact-info-card">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary text-primary-foreground">
                      {info.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{info.title}</CardTitle>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.details}
                        </a>
                      ) : (
                        <CardDescription>{info.details}</CardDescription>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="contact-form lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">Send Me a Message</CardTitle>
              <CardDescription>Fill out the form below and I&apos;ll get back to you soon.</CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    rows={5}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none disabled:opacity-50"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Honeypot field - hidden from humans, but bots might fill it */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website (leave blank)</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Creative Captcha - Randomized */}
                <CaptchaChallenge
                  onAnswerChange={handleCaptchaChange}
                  disabled={isSubmitting}
                  reset={captchaResetKey > 0}
                />

                {/* Status Messages */}
                {submitStatus !== 'idle' && (
                  <div
                    className={`flex items-start gap-3 p-4 rounded-md ${
                      submitStatus === 'success'
                        ? 'bg-green-500/10 border border-green-500/20'
                        : 'bg-red-500/10 border border-red-500/20'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    )}
                    <p
                      className={`text-sm ${
                        submitStatus === 'success' ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                      }`}
                    >
                      {statusMessage}
                    </p>
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || !isCaptchaValid}>
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Jordan Boyce. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
