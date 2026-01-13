"""Pydantic models for GTM requirements validation."""

from typing import Optional, Literal
from pydantic import BaseModel, Field


class GTMRequirements(BaseModel):
    """Validated GTM requirements - the structured state we're building."""

    # Company Profile
    company_name: Optional[str] = Field(None, description="Company or product name")
    company_size: Optional[Literal["solo", "small", "medium", "large", "enterprise"]] = None
    industry: Optional[str] = Field(None, description="Industry vertical (e.g., gaming, fintech, healthcare)")
    category: Optional[Literal["b2b_saas", "dtc", "enterprise", "marketplace", "consumer"]] = None
    maturity: Optional[Literal["idea", "pre_launch", "early", "growth", "scale"]] = None

    # GTM Specifics
    target_market: Optional[str] = Field(None, description="Target customer description")
    target_regions: Optional[list[str]] = Field(default_factory=list, description="Target geographic regions")
    strategy_type: Optional[Literal["plg", "sales_led", "hybrid"]] = None
    budget: Optional[int] = Field(None, description="Monthly marketing budget in USD")

    # Ambition & KPIs
    primary_goal: Optional[Literal["awareness", "leads", "revenue", "expansion"]] = None
    target_kpis: Optional[list[str]] = Field(default_factory=list, description="Key metrics to track")
    timeline_urgency: Optional[Literal["immediate", "quarter", "year", "flexible"]] = None

    # Resources
    has_marketing_team: Optional[bool] = None
    willing_to_outsource: Optional[bool] = None
    needed_specializations: Optional[list[str]] = Field(default_factory=list)
    challenges: Optional[list[str]] = Field(default_factory=list)

    # Tech Stack (recognized tools)
    tech_stack: Optional[list[str]] = Field(default_factory=list, description="Tools they use: HubSpot, Clay, etc.")


class IndustryData(BaseModel):
    """Market data for an industry."""
    industry: str
    market_size: str
    growth_rate: str
    key_segments: list[str]
    top_players: list[str]


class ToolInfo(BaseModel):
    """Information about a recognized tool/brand."""
    name: str
    category: str  # CRM, Sales, Marketing, etc.
    description: str
    logo_url: Optional[str] = None


class AgencyMatch(BaseModel):
    """A matched agency from our database."""
    id: int
    name: str
    slug: str
    description: str
    headquarters: str
    specializations: list[str]
    min_budget: Optional[int] = None
    match_score: int
    match_reasons: list[str]
    website: Optional[str] = None


class ConfirmationRequest(BaseModel):
    """HITL confirmation request for the user."""
    field: str
    value: str
    display_label: str
    confidence: float = 1.0  # How confident we are (for soft confirmations)


class GTMState(BaseModel):
    """Full state including requirements, matches, and pending confirmations."""
    requirements: GTMRequirements = Field(default_factory=GTMRequirements)
    pending_confirmations: list[ConfirmationRequest] = Field(default_factory=list)
    confirmed_fields: list[str] = Field(default_factory=list)
    matched_agencies: list[AgencyMatch] = Field(default_factory=list)
    industry_data: Optional[IndustryData] = None
    recognized_tools: list[ToolInfo] = Field(default_factory=list)
    progress_percent: int = 0
