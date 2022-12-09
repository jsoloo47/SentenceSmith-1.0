import React, { useState, useEffect } from 'react';
import './styles.scss';

export default function Typewriter({ text }) {
  const [currentText, setCurrentText] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  useEffect(() => {
    let index = 0;
    const type = () => {
      if (index < text.length) {
        setCurrentText(text.substring(0, index + 1));
        index++;
        setTimeout(type, 25);
      } else {
        setIsAnimating(false);
      }
    };
    type();
  }, [text]);

  return (
    <div className="typewriter">
      {currentText}
      {isAnimating && <span className="cursor"></span>}
    </div>
  );
}
