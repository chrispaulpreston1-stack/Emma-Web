"""Responsive check for the Emma Hazeldine site.

Uses Playwright to take accurate mobile / tablet / desktop screenshots
with real viewport CSS metrics (unlike Chrome headless --window-size,
which doesn't reliably update the CSS viewport).

Usage:
    python scripts/responsive-check.py                    # defaults to live site
    python scripts/responsive-check.py http://localhost:8080

Writes PNGs to ./scripts/.screenshots/ (gitignored).
"""
from __future__ import annotations
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "https://emmahazeldine.com"
OUT = Path(__file__).parent / ".screenshots"
OUT.mkdir(exist_ok=True)

PAGES = [
    ("home", ""),
    ("about", "about.html"),
    ("what-i-do", "what-i-do.html"),
    ("mulling-list", "mulling/"),
    ("mulling-article", "mulling/pain-isnt-damage.html"),
    ("contact", "contact.html"),
]

# Keep DEVICES small — one phone, one tablet, one desktop — enough to catch breakpoint regressions.
DEVICES = [
    ("iphone-12", {"viewport": {"width": 390, "height": 844}, "device_scale_factor": 3, "is_mobile": True, "has_touch": True}),
    ("ipad-mini", {"viewport": {"width": 768, "height": 1024}, "device_scale_factor": 2, "is_mobile": True, "has_touch": True}),
    ("desktop-1440", {"viewport": {"width": 1440, "height": 900}, "device_scale_factor": 1, "is_mobile": False, "has_touch": False}),
]

def main() -> None:
    print(f"Base URL: {BASE}")
    print(f"Output:   {OUT}\n")

    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        try:
            for device_name, ctx_opts in DEVICES:
                ctx = browser.new_context(**ctx_opts)
                for page_name, path in PAGES:
                    page = ctx.new_page()
                    url = f"{BASE.rstrip('/')}/{path}"
                    page.goto(url, wait_until="networkidle", timeout=15000)
                    out = OUT / f"{device_name}-{page_name}.png"
                    # Full-page=False gives us first-screen only (viewport-sized).
                    page.screenshot(path=str(out), full_page=False)
                    print(f"  {device_name:<14}  {page_name:<16}  {out.name}")
                    page.close()
                ctx.close()
        finally:
            browser.close()
    print("\nDone.")

if __name__ == "__main__":
    main()
