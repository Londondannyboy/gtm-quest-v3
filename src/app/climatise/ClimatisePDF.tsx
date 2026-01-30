'use client';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  pdf,
} from '@react-pdf/renderer';

// Register fonts (using system fonts fallback)
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiJ-Ek-_EeA.woff2', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiJ-Ek-_EeA.woff2', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Inter',
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
  },
  lightPage: {
    padding: 50,
    fontFamily: 'Inter',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  badge: {
    backgroundColor: '#fef3c7',
    color: '#d97706',
    fontSize: 10,
    fontWeight: 600,
    padding: '6 12',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 16,
    marginTop: 30,
    color: '#3b82f6',
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
    paddingBottom: 8,
  },
  sectionTitleGreen: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 16,
    marginTop: 30,
    color: '#22c55e',
    borderBottomWidth: 2,
    borderBottomColor: '#22c55e',
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    width: 20,
    fontSize: 12,
  },
  bulletText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 1.5,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  statLabel: {
    fontSize: 11,
    color: '#666666',
  },
  statValue: {
    fontSize: 12,
    fontWeight: 600,
  },
  highlight: {
    color: '#3b82f6',
    fontWeight: 600,
  },
  highlightGreen: {
    color: '#22c55e',
    fontWeight: 600,
  },
  highlightAmber: {
    color: '#f59e0b',
    fontWeight: 600,
  },
  box: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  boxDark: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  twoColumn: {
    flexDirection: 'row',
    gap: 20,
  },
  column: {
    flex: 1,
  },
  pageBreak: {
    marginTop: 40,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: 'center',
    fontSize: 9,
    color: '#888888',
  },
  smallText: {
    fontSize: 10,
    color: '#666666',
    marginTop: 4,
  },
  checkmark: {
    color: '#22c55e',
    marginRight: 8,
  },
  icpGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  icpTag: {
    backgroundColor: '#eff6ff',
    color: '#3b82f6',
    fontSize: 9,
    padding: '4 8',
    borderRadius: 4,
  },
  timeline: {
    marginTop: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelinePhase: {
    width: 60,
    fontSize: 10,
    fontWeight: 600,
    color: '#3b82f6',
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#e5e5e5',
  },
  timelineTitle: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 4,
  },
  timelineWeeks: {
    fontSize: 9,
    color: '#888888',
    marginBottom: 6,
  },
});

const ClimatiseProposalPDF = () => (
  <Document>
    {/* Page 1: TL;DR / Executive Summary */}
    <Page size="A4" style={styles.lightPage}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text>TL;DR</Text>
        </View>
        <Text style={styles.title}>GTM Proposal</Text>
        <Text style={styles.subtitle}>Prepared for Lennon Harding-Wade, CEO</Text>
        <Text style={styles.subtitle}>Climatise</Text>
      </View>

      <View style={styles.twoColumn}>
        <View style={styles.column}>
          <Text style={styles.sectionTitle}>The Opportunity</Text>
          <View style={styles.row}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.highlight}>£2.1B+</Text> UK carbon accounting market
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.highlightGreen}>76%</Text> prefer UK-based solutions
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.highlightAmber}>15,200+</Text> Tier 1 targets with hard deadlines
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={{ color: '#ef4444', fontWeight: 600 }}>&lt;50%</Text> UK businesses have sustainability targets
            </Text>
          </View>
        </View>

        <View style={styles.column}>
          <Text style={styles.sectionTitleGreen}>The Ask</Text>
          <View style={styles.row}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.bulletText}>
              <Text style={{ fontWeight: 600 }}>2-3 days/week</Text> for 8-12 weeks
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.bulletText}>
              <Text style={{ fontWeight: 600 }}>Weekly break clause</Text> — zero lock-in
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.bulletText}>
              <Text style={{ fontWeight: 600 }}>£500/day</Text> — transparent pricing
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.bulletText}>
              <Text style={{ fontWeight: 600 }}>Full handover</Text> — no dependency
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Risks & Mitigations</Text>
      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.bulletText}><Text style={{ fontWeight: 600 }}>Zero lock-in:</Text> Weekly break clause</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.bulletText}><Text style={{ fontWeight: 600 }}>No dependency:</Text> Full system handover</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.bulletText}><Text style={{ fontWeight: 600 }}>Transparent:</Text> Day rate pricing</Text>
        </View>
      </View>

      <Text style={styles.footer}>GTM Quest × Climatise | Confidential</Text>
    </Page>

    {/* Page 2: Market & ICPs */}
    <Page size="A4" style={styles.lightPage}>
      <Text style={styles.sectionTitle}>The Market Opportunity</Text>

      <View style={styles.box}>
        <Text style={{ fontSize: 12, marginBottom: 12 }}>UK firms prefer domestic solutions for carbon compliance:</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Prefer UK-based carbon solutions</Text>
          <Text style={[styles.statValue, styles.highlightGreen]}>76%</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Have net-zero targets established</Text>
          <Text style={styles.statValue}>86%</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Plan to offset via carbon credits</Text>
          <Text style={styles.statValue}>73%</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Can accurately define carbon credits</Text>
          <Text style={[styles.statValue, styles.highlightAmber]}>Only 42%</Text>
        </View>
        <Text style={styles.smallText}>Source: Octopus Investments Survey, 300 UK Business Leaders</Text>
      </View>

      <Text style={styles.sectionTitle}>Your Target ICPs</Text>
      <Text style={{ fontSize: 11, marginBottom: 12 }}>5 ICP Clusters | 15,200+ Tier 1 Targets</Text>

      <View style={styles.icpGrid}>
        <View style={styles.icpTag}><Text>Regulatory-Driven (~12)</Text></View>
        <View style={styles.icpTag}><Text>Supply Chain Pressure (~6)</Text></View>
        <View style={styles.icpTag}><Text>Voluntary/Values-Driven (~3)</Text></View>
        <View style={styles.icpTag}><Text>Sector-Specific (~12)</Text></View>
        <View style={styles.icpTag}><Text>Emerging (~4)</Text></View>
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Tier 1 Targets (Provisional)</Text>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Government Contract Bidders (PPN 006)</Text>
        <Text style={styles.statValue}>5,000+</Text>
      </View>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>SECR December Year-End</Text>
        <Text style={styles.statValue}>3,300</Text>
      </View>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>SECR March Year-End</Text>
        <Text style={styles.statValue}>4,400</Text>
      </View>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>NHS Suppliers Tier 1</Text>
        <Text style={styles.statValue}>2,000</Text>
      </View>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>National Highways Suppliers (PAS 2080)</Text>
        <Text style={styles.statValue}>500</Text>
      </View>

      <Text style={styles.footer}>GTM Quest × Climatise | Confidential</Text>
    </Page>

    {/* Page 3: The System */}
    <Page size="A4" style={styles.lightPage}>
      <Text style={styles.sectionTitle}>The System: Signal-Triggered Outbound</Text>

      <View style={styles.box}>
        <Text style={{ fontSize: 12, textAlign: 'center', marginBottom: 16 }}>
          <Text style={styles.highlight}>Clay</Text> → <Text style={{ color: '#06b6d4', fontWeight: 600 }}>Signals</Text> → <Text style={{ color: '#a855f7', fontWeight: 600 }}>Outreach</Text> → <Text style={styles.highlightGreen}>Pipeline</Text>
        </Text>
        <Text style={{ fontSize: 10, textAlign: 'center', color: '#666666' }}>
          Right message. Right time. Right prospect.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Signal Intelligence</Text>

      <Text style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>1. Tender Intelligence</Text>
      <View style={styles.row}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>Daily scraping: Find a Tender, bidstats.uk, Contracts Finder</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>AI filtering for carbon-relevant contracts</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>Instant enrichment of contract winners via Clay</Text>
      </View>

      <Text style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, marginTop: 16 }}>2. LinkedIn Signals (Trigify)</Text>
      <View style={styles.row}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>Competitor social signal tracking</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>ICP post monitoring and engagement tracking</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>Industry influencer audience building</Text>
      </View>

      <Text style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, marginTop: 16 }}>3. Compliance Signals</Text>
      <View style={styles.row}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>Companies House year-end date extraction</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>SECR deadline countdown sequences</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>NHS Scope 3 timeline tracking</Text>
      </View>

      <Text style={styles.footer}>GTM Quest × Climatise | Confidential</Text>
    </Page>

    {/* Page 4: Timeline & Investment */}
    <Page size="A4" style={styles.lightPage}>
      <Text style={styles.sectionTitle}>Implementation Timeline</Text>

      <View style={styles.timeline}>
        <View style={styles.timelineItem}>
          <Text style={styles.timelinePhase}>Phase 1</Text>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>Foundation</Text>
            <Text style={styles.timelineWeeks}>Weeks 1-2</Text>
            <Text style={styles.bulletText}>Clay workspace setup, tender scrapers, Trigify monitoring</Text>
          </View>
        </View>
        <View style={styles.timelineItem}>
          <Text style={styles.timelinePhase}>Phase 2</Text>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>Campaign Infrastructure</Text>
            <Text style={styles.timelineWeeks}>Weeks 2-3</Text>
            <Text style={styles.bulletText}>LaGrowthMachine + Instantly setup, LinkedIn safety, HubSpot</Text>
          </View>
        </View>
        <View style={styles.timelineItem}>
          <Text style={styles.timelinePhase}>Phase 3</Text>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>Launch Tier 1 ICPs</Text>
            <Text style={styles.timelineWeeks}>Week 4+</Text>
            <Text style={styles.bulletText}>Government bidders live, SECR sequences active</Text>
          </View>
        </View>
        <View style={styles.timelineItem}>
          <Text style={styles.timelinePhase}>Phase 4</Text>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>Training & Handover</Text>
            <Text style={styles.timelineWeeks}>Ongoing</Text>
            <Text style={styles.bulletText}>Clay training, documentation, full system handover</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitleGreen}>Investment</Text>

      <View style={styles.box}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Day Rate</Text>
          <Text style={[styles.statValue, styles.highlightGreen]}>£500/day</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Commitment</Text>
          <Text style={styles.statValue}>2-3 days/week</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Duration</Text>
          <Text style={styles.statValue}>8-12 weeks</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Break Clause</Text>
          <Text style={[styles.statValue, styles.highlightGreen]}>Weekly</Text>
        </View>
      </View>

      <View style={[styles.box, { backgroundColor: '#f0fdf4', borderWidth: 1, borderColor: '#22c55e' }]}>
        <Text style={{ fontSize: 11, textAlign: 'center' }}>
          Total flexibility: Scale up or down based on project phase. No penalties, no lock-in.
        </Text>
      </View>

      <Text style={styles.footer}>GTM Quest × Climatise | Confidential</Text>
    </Page>

    {/* Page 5: Next Steps */}
    <Page size="A4" style={styles.lightPage}>
      <Text style={styles.sectionTitle}>Next Steps</Text>

      <View style={[styles.box, { backgroundColor: '#eff6ff', borderWidth: 1, borderColor: '#3b82f6' }]}>
        <Text style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, textAlign: 'center' }}>
          Book a 30-Minute Discovery Call
        </Text>
        <Text style={{ fontSize: 11, textAlign: 'center', marginBottom: 16 }}>
          calendly.com/my-first-quest
        </Text>
        <Text style={{ fontSize: 10, color: '#666666', textAlign: 'center' }}>
          We&apos;ll discuss your current metrics, target outcomes, and timeline.
        </Text>
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Expected Outcomes (TBD)</Text>
      <Text style={{ fontSize: 11, marginBottom: 16, color: '#666666' }}>
        Final targets calibrated during discovery based on your conversion rates, deal size, and sales cycle.
      </Text>

      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Pipeline Value</Text>
        <Text style={styles.statValue}>TBD</Text>
      </View>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Qualified Leads/Month</Text>
        <Text style={styles.statValue}>TBD</Text>
      </View>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Cost Per Lead</Text>
        <Text style={styles.statValue}>TBD</Text>
      </View>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Payback Period</Text>
        <Text style={styles.statValue}>TBD</Text>
      </View>

      <View style={{ marginTop: 40, padding: 20, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
        <Text style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Contact</Text>
        <Text style={{ fontSize: 11 }}>Dan Keegan</Text>
        <Text style={{ fontSize: 11, color: '#3b82f6' }}>dan@gtm.quest</Text>
        <Text style={{ fontSize: 11, color: '#666666', marginTop: 8 }}>gtm.quest</Text>
      </View>

      <Text style={styles.footer}>GTM Quest × Climatise | Confidential</Text>
    </Page>
  </Document>
);

export async function generateClimatisePDF(): Promise<Blob> {
  const blob = await pdf(<ClimatiseProposalPDF />).toBlob();
  return blob;
}

export default ClimatiseProposalPDF;
