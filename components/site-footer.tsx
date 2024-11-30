'use client'

import React from 'react'

export function SiteFooter() {
  const [time, setTime] = React.useState(
    new Date().toLocaleTimeString('en-AU', { timeZone: 'Australia/Hobart', hour: '2-digit', minute: '2-digit' })
  );

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-AU', { timeZone: 'Australia/Hobart', hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="content-container space-y-6">
      <h2 className="text-base font-semibold mb-6">Let&apos;s chat</h2>
      
      <div className="flex flex-col">
        <p className="text-base">
          ✉️ <a href="mailto:jason@jchang.cc">jason@jchang.cc</a>
        </p>
        <p className="text-base">
          ☎️ <a href="tel:+19496208830">+1 949 620 8830</a>
        </p>
      </div>

      <div>
        <p className="text-base">
          🕒 Local time is {time}
        </p>
        <p className="text-base">
          🌏 Based in {' '}
          <a href="https://maps.app.goo.gl/YwRzZKtWMD7SivreA" target="_blank" rel="noopener noreferrer">
            Tasmania, Australia
          </a>
          , but prone to board planes
        </p>
      </div>

      <div>
        <p className="text-base">
            <a href="https://x.com/jchang_26" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
        </p>
        <p className="text-base">
          <a href="https://read.cv/jchang26" target="_blank" rel="noopener noreferrer">Read.cv</a>
        </p>
        <p className="text-base">
          <a href="https://www.linkedin.com/in/jason-c-a35a52126/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </p>
      </div>
      <p className="text-base">J/CHANG © 2024</p>
    </footer>
  )
}