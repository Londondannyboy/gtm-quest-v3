"""Tools for the GTM agent - search agencies, fetch market data, recognize tools."""

import os
import httpx
from typing import Optional
from models import AgencyMatch, IndustryData, ToolInfo

# Known tools/brands database
KNOWN_TOOLS = {
    # CRM
    "hubspot": ToolInfo(name="HubSpot", category="CRM", description="All-in-one CRM, marketing, sales platform"),
    "salesforce": ToolInfo(name="Salesforce", category="CRM", description="Enterprise CRM and sales cloud"),
    "pipedrive": ToolInfo(name="Pipedrive", category="CRM", description="Sales-focused CRM for small teams"),

    # Sales Tools
    "clay": ToolInfo(name="Clay", category="Sales Intelligence", description="Data enrichment and outbound automation"),
    "apollo": ToolInfo(name="Apollo.io", category="Sales Intelligence", description="B2B database and engagement platform"),
    "zoominfo": ToolInfo(name="ZoomInfo", category="Sales Intelligence", description="B2B contact and company data"),
    "linkedin": ToolInfo(name="LinkedIn Sales Navigator", category="Sales Intelligence", description="LinkedIn's premium sales tool"),

    # Outbound
    "instantly": ToolInfo(name="Instantly", category="Email Outreach", description="Cold email automation at scale"),
    "lemlist": ToolInfo(name="Lemlist", category="Email Outreach", description="Personalized cold outreach"),
    "outreach": ToolInfo(name="Outreach", category="Sales Engagement", description="Enterprise sales engagement platform"),
    "salesloft": ToolInfo(name="SalesLoft", category="Sales Engagement", description="Revenue workflow platform"),

    # Marketing
    "mailchimp": ToolInfo(name="Mailchimp", category="Email Marketing", description="Email marketing and automation"),
    "klaviyo": ToolInfo(name="Klaviyo", category="Email Marketing", description="E-commerce email and SMS"),
    "marketo": ToolInfo(name="Marketo", category="Marketing Automation", description="Enterprise marketing automation"),
    "pardot": ToolInfo(name="Pardot", category="Marketing Automation", description="Salesforce B2B marketing automation"),

    # Analytics
    "mixpanel": ToolInfo(name="Mixpanel", category="Product Analytics", description="Product and user analytics"),
    "amplitude": ToolInfo(name="Amplitude", category="Product Analytics", description="Digital analytics platform"),
    "segment": ToolInfo(name="Segment", category="CDP", description="Customer data platform"),
    "heap": ToolInfo(name="Heap", category="Product Analytics", description="Auto-capture product analytics"),

    # ABM
    "6sense": ToolInfo(name="6sense", category="ABM", description="Account-based marketing platform"),
    "demandbase": ToolInfo(name="Demandbase", category="ABM", description="ABM and B2B advertising"),
    "terminus": ToolInfo(name="Terminus", category="ABM", description="ABM platform for B2B"),
}

# Industry market data (could be enhanced with real API calls)
INDUSTRY_DATA = {
    "gaming": IndustryData(
        industry="Gaming",
        market_size="$200B+ globally",
        growth_rate="8.4% CAGR",
        key_segments=["Mobile Gaming", "Console", "PC", "Cloud Gaming"],
        top_players=["Tencent", "Sony", "Microsoft", "Nintendo", "Activision"]
    ),
    "games": IndustryData(  # Alias
        industry="Gaming",
        market_size="$200B+ globally",
        growth_rate="8.4% CAGR",
        key_segments=["Mobile Gaming", "Console", "PC", "Cloud Gaming"],
        top_players=["Tencent", "Sony", "Microsoft", "Nintendo", "Activision"]
    ),
    "fintech": IndustryData(
        industry="FinTech",
        market_size="$310B globally",
        growth_rate="25% CAGR",
        key_segments=["Payments", "Lending", "InsurTech", "WealthTech", "RegTech"],
        top_players=["Stripe", "Square", "PayPal", "Plaid", "Revolut"]
    ),
    "healthcare": IndustryData(
        industry="Healthcare Tech",
        market_size="$350B globally",
        growth_rate="15% CAGR",
        key_segments=["Telehealth", "EHR", "Medical Devices", "Digital Therapeutics"],
        top_players=["Epic", "Cerner", "Teladoc", "Veeva", "Doximity"]
    ),
    "healthtech": IndustryData(
        industry="Healthcare Tech",
        market_size="$350B globally",
        growth_rate="15% CAGR",
        key_segments=["Telehealth", "EHR", "Medical Devices", "Digital Therapeutics"],
        top_players=["Epic", "Cerner", "Teladoc", "Veeva", "Doximity"]
    ),
    "edtech": IndustryData(
        industry="EdTech",
        market_size="$250B globally",
        growth_rate="16% CAGR",
        key_segments=["K-12", "Higher Ed", "Corporate Training", "Language Learning"],
        top_players=["Coursera", "Duolingo", "Byju's", "2U", "Udemy"]
    ),
    "saas": IndustryData(
        industry="SaaS",
        market_size="$200B globally",
        growth_rate="18% CAGR",
        key_segments=["Horizontal SaaS", "Vertical SaaS", "Infrastructure", "Security"],
        top_players=["Salesforce", "Microsoft", "Adobe", "ServiceNow", "Workday"]
    ),
    "b2b saas": IndustryData(
        industry="B2B SaaS",
        market_size="$150B globally",
        growth_rate="18% CAGR",
        key_segments=["Sales Tech", "Marketing Tech", "HR Tech", "FinOps"],
        top_players=["Salesforce", "HubSpot", "Slack", "Zoom", "Atlassian"]
    ),
    "ecommerce": IndustryData(
        industry="E-commerce",
        market_size="$6T globally",
        growth_rate="10% CAGR",
        key_segments=["B2C", "B2B", "D2C", "Marketplaces"],
        top_players=["Amazon", "Alibaba", "Shopify", "eBay", "Etsy"]
    ),
    "ai": IndustryData(
        industry="Artificial Intelligence",
        market_size="$150B globally",
        growth_rate="38% CAGR",
        key_segments=["GenAI", "ML Ops", "Computer Vision", "NLP", "Robotics"],
        top_players=["OpenAI", "Google", "Microsoft", "Anthropic", "NVIDIA"]
    ),
}


def recognize_tools(text: str) -> list[ToolInfo]:
    """Recognize tools/brands mentioned in text."""
    text_lower = text.lower()
    found = []
    for key, tool in KNOWN_TOOLS.items():
        if key in text_lower or tool.name.lower() in text_lower:
            found.append(tool)
    return found


def get_industry_data(industry: str) -> Optional[IndustryData]:
    """Get market data for an industry."""
    industry_lower = industry.lower().strip()
    return INDUSTRY_DATA.get(industry_lower)


async def search_agencies(
    specializations: list[str],
    category_tags: list[str] = None,
    service_areas: list[str] = None,
    max_budget: int = None,
    limit: int = 5
) -> list[AgencyMatch]:
    """Search agencies from the Next.js API."""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://localhost:3001/api/agencies/search",
                json={
                    "specializations": specializations,
                    "category_tags": category_tags or [],
                    "service_areas": service_areas or [],
                    "max_budget": max_budget,
                    "limit": limit,
                },
                timeout=10.0
            )
            if response.status_code == 200:
                data = response.json()
                return [AgencyMatch(**a) for a in data]
    except Exception as e:
        print(f"Agency search error: {e}")
    return []
