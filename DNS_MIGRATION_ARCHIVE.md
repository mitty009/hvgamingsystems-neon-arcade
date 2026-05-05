# DNS Migration Archive

Date: 2026-05-05

Domain: hvgamingsystems.com.au

This file records the old cPanel mail DNS records that were removed during the migration to GoDaddy Email Essentials / Microsoft mail hosting. Do not restore these records unless rolling back mail delivery to the previous cPanel Linux server.

## Old cPanel Mail Records

These records were associated with the previous cPanel mail service on the Linux box at `110.232.143.140`.

| Type | Host | Priority | Value | Status |
| --- | --- | ---: | --- | --- |
| A | `mail.hvgamingsystems.com.au` |  | `110.232.143.140` | Removed from Netlify DNS |
| MX | `hvgamingsystems.com.au` | 0 | `mail.hvgamingsystems.com.au` | Removed from Netlify DNS |
| TXT | `hvgamingsystems.com.au` |  | `v=spf1 a mx include:spf.hostingplatform.net.au ~all` | Removed from Netlify DNS |
| TXT | `hvgamingsystems.com.au` |  | `v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvaead5MotP9J8ShnxlTjlX6DmhgRNbUKyzYT0nocpOABsqUO5dYP3O64BDALsC2hl05BWHQyCYOEXWQGEczXSZO5WiuO1kCT+YCTG2G0aF5guxNwlo0O/vFmISfH4xZwhywYKwSY080AZzWUk3otFBaUv/joomAMOoiMjezgzB/9L8jyFwUktYJLVYpCB+qW5 /b32JsdZdwAemOOfrz3xwgAwnNoAUaMjEth4rUIc2adW/0b8p9Xa/wZArGBEv9pWF4PwqCNKs+Ijc1475rklUk4yeBXQgqHzggwEB7cLCLfdPvjYztuU4esJ3cG3qrwNqUKib0G3qDwDBxY+xLNQwIDAQAB;` | Removed from Netlify DNS |

## Current GoDaddy Email Essentials Records

These records were supplied by GoDaddy for `info@hvgamingsystems.com.au` and are the active root-domain email records after migration.

| Type | Host | Priority | Value |
| --- | --- | ---: | --- |
| MX | `hvgamingsystems.com.au` | 0 | `hvgamingsystems-com-au.mail.protection.outlook.com` |
| CNAME | `autodiscover.hvgamingsystems.com.au` |  | `autodiscover.outlook.com` |
| CNAME | `email.hvgamingsystems.com.au` |  | `email.secureserver.net` |
| TXT | `hvgamingsystems.com.au` |  | `MS=ms94289952` |
| TXT | `hvgamingsystems.com.au` |  | `v=spf1 include:secureserver.net -all` |

## Records Intentionally Retained

These are not part of the old cPanel mailbox service and should remain unless replaced by newer provider-specific values.

| Purpose | Host | Notes |
| --- | --- | --- |
| Website hosting | `hvgamingsystems.com.au`, `www.hvgamingsystems.com.au` | Netlify managed records |
| Google Search Console | `hvgamingsystems.com.au` | `google-site-verification=0sZhVz3XfaaZzhY3Py2va9oKjHgaZDKQimzXBTdjTAw` |
| DMARC | `_dmarc.hvgamingsystems.com.au` | Monitoring policy for root-domain mail |
| Mailgun CTA/contact form | `mg.hvgamingsystems.com.au` and subrecords | Used by the website contact form sending domain |
