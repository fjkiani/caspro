'use client';

import React from 'react';

interface MarkdownTextProps {
  text: string;
  className?: string;
}

export default function MarkdownText({ text, className = "" }: MarkdownTextProps) {
  return (
    <div className={className}>
      {text.split('**').map((part, partIndex) => {
        if (partIndex % 2 === 1) {
          return <strong key={partIndex} className="text-slate-800 font-semibold">{part}</strong>;
        }
        return part;
      })}
    </div>
  );
}
