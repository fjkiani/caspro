'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, FileText, Database, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

interface ResponseCardProps {
  response: string;
  type: 'crispro' | 'gpt';
  isLoading?: boolean;
  error?: string;
}

// Extract key highlights from CrisPRO response
function extractHighlights(text: string): {
  summary: string;
  keyPoints: Array<{ label: string; value: string }>;
  structured: Array<{ title: string; items: string[] }>;
  details: string;
} {
  const lines = text.split('\n').filter(l => l.trim());
  
  // Extract summary (first line before first ** or section header)
  const summaryMatch = text.match(/^([^*\n]+?)(?:\n\*\*|\n\*\*|$)/);
  const summary = summaryMatch ? summaryMatch[1].trim() : lines[0] || '';
  
  const keyPoints: Array<{ label: string; value: string }> = [];
  const structured: Array<{ title: string; items: string[] }> = [];
  
  // Extract structured sections (Recommended Supplements, Evidence, etc.)
  let currentSection: { title: string; items: string[] } | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Section headers (Recommended Supplements, Evidence, etc.)
    if (line.match(/^\*\*[^*]+\*\*:/)) {
      if (currentSection) {
        structured.push(currentSection);
      }
      const title = line.replace(/\*\*/g, '').replace(':', '').trim();
      currentSection = { title, items: [] };
    }
    // Numbered items (supplements, recommendations)
    else if (line.match(/^\d+\./)) {
      const item = line.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '').trim();
      if (currentSection) {
        currentSection.items.push(item);
      } else {
        // Extract key-value pairs from numbered items
        const match = item.match(/^([^:]+):\s*(.+)/);
        if (match) {
          keyPoints.push({ label: match[1].trim(), value: match[2].trim() });
        }
      }
    }
    // Sub-items (dash bullets)
    else if (line.match(/^[-•]/) && currentSection) {
      const item = line.replace(/^[-•]\s*/, '').replace(/\*\*/g, '').trim();
      if (item.length > 5) {
        currentSection.items.push(item);
      }
    }
    // Key-value pairs (Risk Score, Resolution Path, etc.)
    else if (line.match(/^[^*\d][^:]+:\s*.+/)) {
      const match = line.match(/^([^:]+):\s*(.+)/);
      if (match && !line.startsWith('**')) {
        const label = match[1].trim();
        const value = match[2].trim();
        if (label.length < 50 && value.length > 0) {
          keyPoints.push({ label, value });
        }
      }
    }
  }
  
  if (currentSection) {
    structured.push(currentSection);
  }
  
  return {
    summary,
    keyPoints: keyPoints.slice(0, 4), // Top 4 key points
    structured: structured.slice(0, 2), // Top 2 structured sections
    details: text
  };
}

export default function ResponseCard({ response, type, isLoading, error }: ResponseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const highlights = extractHighlights(response || '');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 text-slate-600">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3">Loading response...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-sm p-4 bg-red-50 rounded-lg">
        Error: {error}
      </div>
    );
  }

  if (!response) {
    return (
      <div className="text-slate-500 text-sm p-4 italic">
        Response will appear here...
      </div>
    );
  }

  const isCrispro = type === 'crispro';
  
  // Parse structured sections from CrisPRO responses
  const sections: { title: string; content: string; icon?: React.ReactNode }[] = [];
  
  if (isCrispro) {
    // Extract Risk Score
    const riskMatch = response.match(/Risk Score:?\s*([0-9.]+)\s*\(([^)]+)\)/i);
    if (riskMatch) {
      sections.push({
        title: `Risk Score: ${riskMatch[1]} (${riskMatch[2]})`,
        content: '',
        icon: <Sparkles className="w-4 h-4" />
      });
    }
    
    // Extract Resolution Path (for VUS)
    const resolutionMatch = response.match(/Resolution Path:?\s*([^\n]+)/i);
    if (resolutionMatch) {
      sections.push({
        title: `Resolution: ${resolutionMatch[1].trim()}`,
        content: '',
        icon: <CheckCircle2 className="w-4 h-4" />
      });
    }
    
    // Extract Pathway Impact
    const pathwayMatch = response.match(/\*\*Pathway Impact\*\*:\s*([^\n]+)/i);
    if (pathwayMatch) {
      sections.push({
        title: 'Pathway Analysis',
        content: pathwayMatch[1].trim(),
        icon: <Database className="w-4 h-4" />
      });
    }
  }

  return (
    <div className="space-y-3">
      {/* Summary Section */}
      <div>
        {highlights.summary && (
          <div className="text-sm font-medium text-slate-900 mb-3">
            {highlights.summary}
          </div>
        )}
        
        {/* Key Points */}
        {highlights.keyPoints.length > 0 && (
          <div className="space-y-2 mb-4">
            {highlights.keyPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                {isCrispro ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 border-2 border-yellow-500 rounded-full mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <span className="font-semibold text-slate-900">{point.label}:</span>
                  <span className="text-slate-700 ml-1">{point.value}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Structured Sections (e.g., Recommended Supplements, Evidence) */}
        {highlights.structured.length > 0 && (
          <div className="space-y-3 mb-4">
            {highlights.structured.map((section, idx) => (
              <div key={idx} className="bg-slate-50 rounded-lg p-3">
                <div className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-2">
                  {isCrispro && <Sparkles className="w-3 h-3 text-blue-600" />}
                  {section.title}
                </div>
                <div className="space-y-1.5">
                  {section.items.slice(0, 3).map((item, itemIdx) => (
                    <div key={itemIdx} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="flex-1">{item}</span>
                    </div>
                  ))}
                  {section.items.length > 3 && (
                    <div className="text-xs text-slate-500 italic pt-1">
                      +{section.items.length - 3} more {section.title.toLowerCase()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Structured Sections (CrisPRO only) */}
      {sections.length > 0 && (
        <div className="space-y-2">
          {sections.map((section, idx) => (
            <div key={idx} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
              {section.icon && <div className="text-blue-600 mt-0.5">{section.icon}</div>}
              <div className="flex-1">
                <div className="text-xs font-semibold text-slate-900">{section.title}</div>
                {section.content && (
                  <div className="text-xs text-slate-600 mt-1">{section.content}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Expandable Details */}
      {response.length > 300 && (
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <span>{isExpanded ? 'Show Less' : 'Show Full Details'}</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {response}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* If no details section, show full response (collapsed) */}
      {(!highlights.details || highlights.details.length <= 50) && response.length > 200 && (
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <span>{isExpanded ? 'Show Less' : 'Show Full Response'}</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {response}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

