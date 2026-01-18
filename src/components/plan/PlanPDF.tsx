'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#10b981',
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 5,
  },
  text: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.6,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 11,
    color: '#6b7280',
    width: 150,
  },
  value: {
    fontSize: 11,
    color: '#111827',
    fontWeight: 'bold',
    flex: 1,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bullet: {
    fontSize: 11,
    color: '#10b981',
    marginRight: 8,
  },
  bulletText: {
    fontSize: 11,
    color: '#374151',
    flex: 1,
  },
  agencyCard: {
    backgroundColor: '#f9fafb',
    padding: 12,
    marginBottom: 10,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#10b981',
  },
  agencyName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  agencyDetail: {
    fontSize: 10,
    color: '#6b7280',
  },
  timelinePhase: {
    marginBottom: 15,
  },
  phaseName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  phaseDuration: {
    fontSize: 10,
    color: '#10b981',
    marginBottom: 6,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
  },
});

interface GTMPlanData {
  company_name?: string;
  industry?: string;
  target_market?: string;
  strategy_type?: string;
  budget?: number;
  primary_goal?: string;
  timeline_phases: Array<{
    name: string;
    duration: string;
    activities: string[];
  }>;
  matched_agencies: Array<{
    name: string;
    headquarters: string;
    specializations: string[];
    match_score: number;
  }>;
  tech_stack?: string[];
  needed_specializations?: string[];
}

export function GTMPlanPDF({ data }: { data: GTMPlanData }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      {/* Page 1: Executive Summary & Company Profile */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Go-To-Market Strategy Plan</Text>
          <Text style={styles.subtitle}>
            {data.company_name || 'Your Company'} | Generated {currentDate}
          </Text>
        </View>

        {/* Executive Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <Text style={styles.text}>
            This comprehensive go-to-market strategy plan outlines the recommended approach for{' '}
            {data.company_name || 'your company'} to enter and scale in the{' '}
            {data.industry || 'target'} market. Based on your requirements, we recommend a{' '}
            {data.strategy_type?.replace('_', '-') || 'hybrid'} growth strategy with a focus on{' '}
            {data.primary_goal || 'revenue growth'}.
          </Text>
          <Text style={styles.text}>
            Key recommendations include partnering with specialized GTM agencies, implementing a
            structured timeline approach, and allocating resources effectively across marketing,
            sales, and product initiatives.
          </Text>
        </View>

        {/* Company Profile */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Profile</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Company Name:</Text>
            <Text style={styles.value}>{data.company_name || 'Not specified'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Industry:</Text>
            <Text style={styles.value}>{data.industry || 'Not specified'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Target Market:</Text>
            <Text style={styles.value}>{data.target_market || 'Not specified'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>GTM Strategy:</Text>
            <Text style={styles.value}>
              {data.strategy_type?.replace('_', '-').toUpperCase() || 'Not specified'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Monthly Budget:</Text>
            <Text style={styles.value}>
              {data.budget ? `$${data.budget.toLocaleString()}` : 'Not specified'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Primary Goal:</Text>
            <Text style={styles.value}>{data.primary_goal || 'Revenue growth'}</Text>
          </View>
        </View>

        {/* Needs & Requirements */}
        {data.needed_specializations && data.needed_specializations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Requirements</Text>
            {data.needed_specializations.map((spec, index) => (
              <View key={index} style={styles.bulletPoint}>
                <Text style={styles.bullet}>*</Text>
                <Text style={styles.bulletText}>{spec}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Tech Stack */}
        {data.tech_stack && data.tech_stack.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technology Stack</Text>
            {data.tech_stack.map((tool, index) => (
              <View key={index} style={styles.bulletPoint}>
                <Text style={styles.bullet}>*</Text>
                <Text style={styles.bulletText}>{tool}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.footer}>Generated by GTM Quest | www.gtm.quest</Text>
      </Page>

      {/* Page 2: Timeline & Strategy */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Implementation Timeline</Text>
          {data.timeline_phases.map((phase, index) => (
            <View key={index} style={styles.timelinePhase}>
              <Text style={styles.phaseName}>
                Phase {index + 1}: {phase.name}
              </Text>
              <Text style={styles.phaseDuration}>{phase.duration}</Text>
              {phase.activities.map((activity, actIndex) => (
                <View key={actIndex} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>-</Text>
                  <Text style={styles.bulletText}>{activity}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Budget Allocation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Budget Allocation</Text>
          <Text style={styles.text}>
            Based on your {data.strategy_type?.replace('_', '-') || 'hybrid'} strategy and{' '}
            {data.budget ? `$${data.budget.toLocaleString()}/mo` : 'available'} budget:
          </Text>
          {data.strategy_type === 'plg' ? (
            <>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>*</Text>
                <Text style={styles.bulletText}>Product Development: 30%</Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>*</Text>
                <Text style={styles.bulletText}>Content & SEO: 25%</Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>*</Text>
                <Text style={styles.bulletText}>Paid Acquisition: 20%</Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>*</Text>
                <Text style={styles.bulletText}>Community: 15%</Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>*</Text>
                <Text style={styles.bulletText}>Sales Support: 10%</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>*</Text>
                <Text style={styles.bulletText}>Sales Team: 35%</Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>*</Text>
                <Text style={styles.bulletText}>ABM & Outbound: 25%</Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>*</Text>
                <Text style={styles.bulletText}>Content & SEO: 20%</Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>*</Text>
                <Text style={styles.bulletText}>Events & Partnerships: 12%</Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>*</Text>
                <Text style={styles.bulletText}>Tools & Technology: 8%</Text>
              </View>
            </>
          )}
        </View>

        <Text style={styles.footer}>Generated by GTM Quest | www.gtm.quest</Text>
      </Page>

      {/* Page 3: Agency Recommendations */}
      {data.matched_agencies.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended Agency Partners</Text>
            <Text style={styles.text}>
              Based on your requirements, we have identified the following agencies as potential
              partners for your GTM execution:
            </Text>
            {data.matched_agencies.slice(0, 5).map((agency, index) => (
              <View key={index} style={styles.agencyCard}>
                <Text style={styles.agencyName}>
                  {index + 1}. {agency.name}
                </Text>
                <Text style={styles.agencyDetail}>Location: {agency.headquarters}</Text>
                <Text style={styles.agencyDetail}>
                  Specializations: {agency.specializations.slice(0, 3).join(', ')}
                </Text>
                <Text style={styles.agencyDetail}>Match Score: {agency.match_score}%</Text>
              </View>
            ))}
          </View>

          {/* Next Steps */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Next Steps</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>1.</Text>
              <Text style={styles.bulletText}>
                Review this plan with your leadership team
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>2.</Text>
              <Text style={styles.bulletText}>
                Reach out to 2-3 recommended agencies for initial consultations
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>3.</Text>
              <Text style={styles.bulletText}>
                Finalize budget allocation based on agency proposals
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>4.</Text>
              <Text style={styles.bulletText}>
                Begin Phase 1 implementation within 2 weeks
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>5.</Text>
              <Text style={styles.bulletText}>
                Set up monthly check-ins to track progress against KPIs
              </Text>
            </View>
          </View>

          <Text style={styles.footer}>Generated by GTM Quest | www.gtm.quest</Text>
        </Page>
      )}
    </Document>
  );
}
