'use client';

import React, { useState } from 'react';
import { scribeIntelligenceData } from '@/data/copilots/scribe-intelligence-data';
import { motion } from 'framer-motion';
import { MessageSquare, Layers, Users, Brain, ArrowRight, FileText, Send, User, Bot } from 'lucide-react';
import Link from 'next/link';

const ScribeIntelligencePage: React.FC = () => {
  const content = scribeIntelligenceData;
  const [chatMessages, setChatMessages] = useState<Array<{
    id: number;
    type: 'user' | 'bot';
    content: string;
    timestamp: Date;
  }>>([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your CrisPRO AI Co-Pilot. Ask me anything about genomic medicine, treatment options, or clinical trials. I can provide information for clinicians, patients, or researchers.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const sampleQueries = [
    "What drugs are recommended for BRCA1+ breast cancer?",
    "Can turmeric help with my ovarian cancer treatment?",
    "Why is PARP inhibitor recommended over platinum?",
    "What clinical trials are available for KRAS G12D lung cancer?",
    "Explain this genomic report to my patient"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user' as const,
      content: inputMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: chatMessages.length + 2,
        type: 'bot' as const,
        content: getBotResponse(inputMessage),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (query: string) => {
    if (query.toLowerCase().includes('brca1')) {
      return "For BRCA1+ breast cancer, I recommend considering PARP inhibitors like Olaparib as first-line therapy. This is based on the OlympiA trial showing 42% reduction in recurrence risk. Would you like me to explain the mechanism or find relevant clinical trials?";
    }
    if (query.toLowerCase().includes('turmeric')) {
      return "Turmeric (curcumin) shows preclinical activity against ovarian cancer cells, but clinical evidence is limited. It may help reduce inflammation during platinum-based chemotherapy. However, it can interact with CYP3A4-metabolized drugs. Would you like me to check for drug interactions or suggest evidence-based supplements?";
    }
    if (query.toLowerCase().includes('parp') && query.toLowerCase().includes('platinum')) {
      return "PARP inhibitors are preferred over platinum in BRCA1/2 mutated cancers because they exploit synthetic lethality - the cancer becomes dependent on PARP-mediated DNA repair. Platinum works for everyone but has more toxicity. The choice depends on prior platinum exposure and mutation status.";
    }
    return "That's an interesting question about genomic medicine. Let me help you explore this topic. Could you provide more details about your specific situation or what aspect you'd like to understand better?";
  };

  const audienceFeatures = [
    {
      title: "For Clinicians",
      description: "Medical terminology, mechanism of action, monitoring considerations, evidence citations",
      icon: Users,
      color: "text-blue-400",
      examples: ["PARP inhibition via synthetic lethality", "HRD score interpretation", "Treatment sequencing rationale"]
    },
    {
      title: "For Patients",
      description: "Simple analogies, 8th-grade reading level, reassuring but honest tone, no jargon",
      icon: User,
      color: "text-green-400",
      examples: ["DNA repair like fixing a zipper", "Cancer cells as cars with broken brakes", "Treatment as targeted missiles"]
    },
    {
      title: "For Researchers",
      description: "Molecular mechanisms, pathway details, resistance mechanisms, combination therapy rationale",
      icon: Brain,
      color: "text-purple-400",
      examples: ["Homologous recombination deficiency", "PARP trapping mechanism", "BRCA1/2 loss of function"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mb-4">
              Conversational AI Co-Pilot
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {content.pageTitle.split(':')[0]}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {content.heroSubtitle}
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors">
                Try Co-Pilot Demo
              </button>
              <button className="border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-lg font-semibold text-lg transition-colors">
                View Capabilities
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Chat Demo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Experience Natural Language Interaction
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Chat Interface */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
                CrisPRO AI Co-Pilot
              </h3>

              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}>
                      <div className="flex items-center mb-1">
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 mr-1" />
                        ) : (
                          <Bot className="w-4 h-4 mr-1" />
                        )}
                        <span className="text-xs opacity-75">
                          {message.type === 'user' ? 'You' : 'Co-Pilot'}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about genomic medicine..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sample Queries */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Try These Questions</h3>
              <div className="space-y-3">
                {sampleQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(query)}
                    className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                  >
                    <p className="text-sm text-gray-700">{query}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progressive Disclosure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Progressive Disclosure: Simple → Detailed
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Simple Answer</h3>
              <p className="text-gray-600">"PARP inhibitors are recommended for your BRCA1+ ovarian cancer."</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Drill Down</h3>
              <p className="text-gray-600">"Why? Because of synthetic lethality - your cancer can't repair DNA without BRCA1."</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Context</h3>
              <p className="text-gray-600">"This is supported by OlympiA trial data showing 42% reduction in recurrence risk."</p>
            </div>
          </div>
        </motion.div>

        {/* Audience-Appropriate Explanations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Audience-Appropriate Explanations
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {audienceFeatures.map((audience, index) => {
              const Icon = audience.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${audience.color.replace('text-', 'bg-').replace('-400', '-100')}`}>
                    <Icon className={`w-6 h-6 ${audience.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{audience.title}</h3>
                  <p className="text-gray-600 mb-4">{audience.description}</p>
                  <div className="space-y-2">
                    {audience.examples.map((example, i) => (
                      <div key={i} className="text-sm text-gray-500 flex items-center">
                        <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Key Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Key Capabilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Natural Language</h3>
              <p className="text-sm text-gray-600">Ask questions in plain English</p>
            </div>
            <div className="text-center p-4">
              <Layers className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Progressive Disclosure</h3>
              <p className="text-sm text-gray-600">Get the right level of detail</p>
            </div>
            <div className="text-center p-4">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Multi-Audience</h3>
              <p className="text-sm text-gray-600">Tailored for clinicians, patients, researchers</p>
            </div>
            <div className="text-center p-4">
              <Brain className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Context Aware</h3>
              <p className="text-sm text-gray-600">Understands clinical context</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Experience Conversational AI?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join clinicians, patients, and researchers using Scribe Intelligence for
            natural, contextual genomic medicine conversations.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/products/oracle">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors">
                Access Oracle Products
              </button>
            </Link>
            <button className="border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-lg font-semibold text-lg transition-colors">
              Schedule Demo
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScribeIntelligencePage;
