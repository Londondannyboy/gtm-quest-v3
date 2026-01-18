'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { GTMPlanPDF } from './PlanPDF';

interface Phase {
  name: string;
  duration: string;
  activities: string[];
}

interface AgencyMatch {
  id: number;
  name: string;
  headquarters: string;
  specializations: string[];
  match_score: number;
}

interface GTMRequirements {
  company_name?: string;
  industry?: string;
  category?: string;
  target_market?: string;
  strategy_type?: string;
  budget?: number;
  primary_goal?: string;
  tech_stack?: string[];
  needed_specializations?: string[];
}

interface PlanBuilderProps {
  requirements: GTMRequirements;
  timeline_phases: Phase[];
  matched_agencies: AgencyMatch[];
  onClose?: () => void;
}

export function PlanBuilder({
  requirements,
  timeline_phases,
  matched_agencies,
  onClose,
}: PlanBuilderProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const planData = {
    company_name: requirements.company_name,
    industry: requirements.industry || requirements.category,
    target_market: requirements.target_market,
    strategy_type: requirements.strategy_type,
    budget: requirements.budget,
    primary_goal: requirements.primary_goal,
    timeline_phases,
    matched_agencies: matched_agencies.map((a) => ({
      name: a.name,
      headquarters: a.headquarters,
      specializations: a.specializations,
      match_score: a.match_score,
    })),
    tech_stack: requirements.tech_stack,
    needed_specializations: requirements.needed_specializations,
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const blob = await pdf(<GTMPlanPDF data={planData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `GTM-Plan-${requirements.company_name || 'Strategy'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation error:', err);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendEmail = async () => {
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    setIsSending(true);
    setError(null);

    try {
      // Generate PDF blob
      const blob = await pdf(<GTMPlanPDF data={planData} />).toBlob();

      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = (reader.result as string).split(',')[1];

        // Send to API
        const response = await fetch('/api/plan/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            pdfBase64: base64data,
            planData,
          }),
        });

        if (response.ok) {
          setEmailSent(true);
        } else {
          const data = await response.json();
          setError(data.error || 'Failed to send email');
        }
        setIsSending(false);
      };
    } catch (err) {
      console.error('Email error:', err);
      setError('Failed to send email. Please try again.');
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-xl font-bold text-white">Your GTM Plan</h2>
            <p className="text-white/50 text-sm">Ready to download or share</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Plan Preview */}
          <div className="bg-zinc-800/50 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-white mb-4">Plan Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Company</span>
                <span className="text-white">{requirements.company_name || 'Not set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Industry</span>
                <span className="text-white">{requirements.industry || requirements.category || 'Not set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Strategy</span>
                <span className="text-emerald-400">
                  {requirements.strategy_type?.replace('_', '-').toUpperCase() || 'Hybrid'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Budget</span>
                <span className="text-white">
                  {requirements.budget ? `$${requirements.budget.toLocaleString()}/mo` : 'Not set'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Timeline Phases</span>
                <span className="text-white">{timeline_phases.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Matched Agencies</span>
                <span className="text-white">{matched_agencies.length}</span>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="mb-6">
            <h3 className="font-bold text-white mb-3">Included in your plan:</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Executive Summary',
                'Company Profile',
                'Implementation Timeline',
                'Budget Allocation',
                'Agency Recommendations',
                'Next Steps',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Email Input */}
          {!emailSent && (
            <div className="mb-6">
              <label className="block text-white/70 text-sm mb-2">
                Send to email (optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          )}

          {/* Success Message */}
          {emailSent && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <div className="text-emerald-400 font-medium">Email sent!</div>
                  <div className="text-white/60 text-sm">Check your inbox for the GTM plan.</div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div className="text-red-400">{error}</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 p-6 border-t border-white/10 bg-zinc-800/50">
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </>
            )}
          </button>

          {email && !emailSent && (
            <button
              onClick={handleSendEmail}
              disabled={isSending}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition flex items-center justify-center gap-2"
            >
              {isSending ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
