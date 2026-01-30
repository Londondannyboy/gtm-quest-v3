/**
 * Generate Climatise "Get to Yes" Sales Deck via Gamma API
 *
 * Usage: npx ts-node scripts/generate-gamma-deck.ts
 */

const GAMMA_API_KEY = 'sk-gamma-tp4fbws9Ic7tLz0bjp2ZoNEe5fyYDyqOwU1EAVGbYgc';
const GAMMA_API_URL = 'https://public-api.gamma.app/v1.0/generations';

// The 7-slide "Get to Yes" content
const slideContent = `
# Climatise GTM Proposal
## Get to Yes: The 5-Minute Pitch

Prepared for Lennon Harding-Wade, CEO

---

# Slide 1: The Market Opportunity

## The UK carbon accounting market is massive and underserved

- **76%** of UK businesses prefer domestic carbon solutions (Octopus Investments Survey, 2024)
- **<50%** of UK businesses have sustainability targets (Grant Thornton)
- Only **42%** can accurately define what carbon credits are
- **Knowledge gap = opportunity** for Climatise

The market is ready. Education is the key to conversion.

---

# Slide 2: Your Target ICPs

## 5 ICP Clusters | 15,200+ Tier 1 Targets

**Regulatory-Driven** (~12 sub-segments)
- SECR, NHS Suppliers, PPN 006, PAS 2080

**Supply Chain Pressure** (~6 sub-segments)
- Tesco, Sainsburys, FMCG supply chains

**Voluntary/Values-Driven** (~3 sub-segments)
- B Corp, SBTi, CDP reporters

**Sector-Specific** (~12 sub-segments)
- Multi-Academy Trusts, Universities, Manufacturing

**Emerging** (~4 sub-segments)
- Insurance, Franchises, Recruitment agencies

All with hard compliance deadlines driving urgency.

---

# Slide 3: The System

## Signal-Triggered Outbound

**Clay** (Data Enrichment)
  |
  v
**Signals** (Tender wins, SECR deadlines, LinkedIn activity)
  |
  v
**Outreach** (LaGrowthMachine + Instantly)
  |
  v
**Pipeline** (HubSpot)

Right message. Right time. Right prospect.

---

# Slide 4: The Intelligence Layer

## Three Signal Sources

**1. Tender Intelligence**
- Daily scraping: Find a Tender, bidstats.uk, Contracts Finder
- AI filtering for carbon-relevant contracts
- Instant enrichment of contract winners

**2. LinkedIn Signals**
- Trigify for competitor tracking
- ICP post monitoring
- Influencer engagement tracking

**3. Compliance Signals**
- Companies House year-end dates
- SECR deadline countdown sequences
- NHS Scope 3 timeline tracking

---

# Slide 5: The Timeline

## 8-12 Week Implementation

**Phase 1: Foundation** (Weeks 1-2)
- Clay workspace setup
- Tender scrapers configured
- Trigify monitoring live

**Phase 2: Campaign Infrastructure** (Weeks 2-3)
- LaGrowthMachine + Instantly setup
- LinkedIn safety protocols
- HubSpot integration

**Phase 3: Launch Tier 1 ICPs** (Week 4+)
- Government Contract Bidders live
- SECR sequences active
- Signal monitoring in Slack

**Phase 4: Training & Handover** (Ongoing)
- Clay training sessions
- Full documentation
- System handover

---

# Slide 6: The Investment

## Transparent, Flexible Pricing

| Item | Value |
|------|-------|
| Day Rate | £500/day |
| Commitment | 2-3 days/week |
| Duration | 8-12 weeks |
| Break Clause | Weekly |

**Total Flexibility:**
- Scale up or down based on project phase
- No penalties, no lock-in
- Everything documented and transferable

We've never had a client leave mid-pilot. The flexibility means they don't need to.

---

# Slide 7: Next Step

## Book a 30-Minute Discovery Call

We'll discuss:
- Your current conversion metrics
- Target outcomes for the engagement
- Timeline and resource requirements

**Expected Outcomes (TBD based on your metrics):**
- Pipeline value
- Qualified leads per month
- Cost per lead
- Payback period

We don't promise vanity metrics. We agree targets together and track what matters.

**Book now:** calendly.com/my-first-quest

---

## Powered by GTM Quest
dan@gtm.quest | gtm.quest
`;

async function generateGammaDeck() {
  console.log('Generating Climatise "Get to Yes" deck via Gamma API...\n');

  const requestBody = {
    inputText: slideContent,
    textMode: 'preserve', // Keep our exact content
    format: 'presentation',
    numCards: 8, // 7 slides + title
    additionalInstructions: `
      This is a professional B2B sales deck for a GTM consultancy pitching to a carbon accounting software company.
      Use a clean, modern, dark theme with blue and green accent colors.
      Keep the content exactly as provided - this is carefully crafted sales copy.
      Use professional business imagery related to sustainability, carbon, and technology.
      Make sure statistics are prominently displayed.
      The deck should feel premium and trustworthy.
    `,
    imageOptions: {
      source: 'webFreeToUse',
    },
    textOptions: {
      tone: 'professional and confident',
      audience: 'B2B SaaS CEO',
    },
  };

  try {
    const response = await fetch(GAMMA_API_URL, {
      method: 'POST',
      headers: {
        'X-Gamma-Api-Key': GAMMA_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gamma API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();

    console.log('Success! Gamma deck created.\n');
    console.log('Deck URL:', result.url || result.gammaUrl || 'Check your Gamma dashboard');
    console.log('\nFull response:', JSON.stringify(result, null, 2));

    return result;
  } catch (error) {
    console.error('Error generating Gamma deck:', error);
    throw error;
  }
}

// Run the script
generateGammaDeck();
