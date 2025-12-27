import { useState, useEffect } from 'react';
import './InstallPrompt.css';

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Check if app is installed (running in standalone mode)
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    
    // Check if user has dismissed the prompt before
    const dismissed = localStorage.getItem('install-prompt-dismissed');
    
    // Show prompt if not installed and not dismissed
    if (!isInstalled && !dismissed) {
      setShowPrompt(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('install-prompt-dismissed', 'true');
    setShowPrompt(false);
  };

  const handleShowInstructions = () => {
    setShowInstructions(true);
  };

  if (!showPrompt) return null;

  return (
    <>
      {!showInstructions ? (
        <div className="install-prompt">
          <div className="install-prompt-content">
            <p>📱 Vill du installera Min Rutin som en app?</p>
            <div className="install-prompt-buttons">
              <button className="btn-install" onClick={handleShowInstructions}>
                Visa hur
              </button>
              <button className="btn-dismiss" onClick={handleDismiss}>
                Inte nu
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="install-instructions-overlay" onClick={() => setShowInstructions(false)}>
          <div className="install-instructions" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close" onClick={() => setShowInstructions(false)}>✕</button>
            <h2>Installera Min Rutin</h2>
            <p className="install-step-header">Testa detta först:</p>
            <ol>
              <li>Tryck på <strong>delnings-ikonen</strong> 📤 (fyrkantig med pil upp) i iOS/iPadOS</li>
              <li>Scrolla ner och välj <strong>"Lägg till på hemskärmen"</strong></li>
              <li>Tryck <strong>"Lägg till"</strong></li>
            </ol>
            
            <p className="install-step-header">Om det inte fungerar:</p>
            <ol>
              <li>I Safari: tryck på menyvalet (⋯ eller ≡)</li>
              <li>Välj <strong>"Gömda bokmärken" → "Lägg till på hemskärmen"</strong></li>
              <li>Bekräfta med <strong>"Lägg till"</strong></li>
            </ol>
            
            <p className="install-note">Nu kan du öppna appen direkt från hemskärmen! 🎉</p>
            <button className="btn-got-it" onClick={() => {
              setShowInstructions(false);
              handleDismiss();
            }}>
              Jag förstår!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
