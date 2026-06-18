# SEO Migration Notes

## Search Console Properties

Two Google Search Console exports were reviewed on 2026-06-18:

- `hvgamingsystems.com.au` domain property.
- `https://hvgamingsystems.com.au/` URL-prefix property.

Keep both properties during migration checks, but use the domain property as the long-term master view because it can consolidate protocol and subdomain variants. The URL-prefix property currently shows more exported impressions and clicks, so keep it as a comparison view until the old WordPress URLs disappear from reports.

## Current Search Console Signals

- Most clicks and impressions are brand-led: `high voltage gaming systems`, `high voltage gaming`, and close variants.
- Old WordPress query URLs still appear in the Pages report:
  - `/?page_id=53`
  - `/?page_id=65`
  - `/?page_id=80`
  - `/?page_id=94`
- The static SEO page `/arcade-machine-maintenance-repairs/` has started appearing, which means Google can discover and evaluate generated landing pages.

## Migration Priorities

- Keep the canonical domain as `https://hvgamingsystems.com.au/`.
- Submit `https://hvgamingsystems.com.au/sitemap.xml` in both Search Console properties until the migration settles.
- Use the domain property as the reporting baseline after old `page_id` URLs drop out.
- Inspect old `page_id` URLs in Search Console after deployment and request validation once Google sees the 301/canonical cleanup.
- Avoid thin town pages. Use one strong service-area hub first, then add individual town pages only when there is real venue proof, service detail or regional content to support them.

## Phone Number Follow-Up

Research a virtual business number before publishing a phone CTA. Requirements to compare:

- Australian 1800, 1300 or Wodonga/Albury-style landline number.
- Scheduled call forwarding to the operator's mobile.
- After-hours voicemail.
- Email delivery of voicemail recordings/transcripts if available.
- Low monthly cost and low call volume suitability.
- Easy cancellation or number porting.
- Providers to compare later: Twilio, Crazytel, Telnyx, MaxoTel, Aussie Broadband, 1300 Australia and GoDaddy/Microsoft calling options if available.

No public phone number is currently published.

## Competitor Tracking

Track a focused competitor set rather than collecting every vaguely related result. Use:

- Direct local/regional competitors for Albury-Wodonga, Riverina and north-east Victoria.
- Wider Australian competitors ranking for commercial keywords like `arcade machine hire`, `amusement machine leasing`, `pool table hire`, `claw machine hire`, `profit share arcade machines`, and `arcade machine repairs`.
- Directory/listing pages only where they occupy first-page results for target terms.

More competitors are useful for keyword discovery, but only the strongest recurring competitors should shape the page strategy.
