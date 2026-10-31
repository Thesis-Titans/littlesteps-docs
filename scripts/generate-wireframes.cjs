const fs = require("fs");
const path = "/home/markc/projects/active/littlesteps/littlesteps-docs/docs/wireframes";

function frameBase(title, content) {
  return `<svg width="375" height="812" viewBox="0 0 375 812" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="375" height="812" fill="#FAFAF7"/>
<!-- Top Bar (60px) -->
<rect width="375" height="60" fill="#FFFFFF"/>
<line x1="0" y1="60" x2="375" y2="60" stroke="#E5E7EB" stroke-width="1"/>
<text x="16" y="38" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="#111827">${title}</text>
<!-- Body Content -->
${content}
<!-- Bottom Tab Bar (72px) -->
<rect y="740" width="375" height="72" fill="#FFFFFF"/>
<line x1="0" y1="740" x2="375" y2="740" stroke="#E5E7EB" stroke-width="1"/>
<g font-family="Inter, sans-serif" font-size="11" font-weight="500" text-anchor="middle" fill="#6B7280">
  <rect x="18" y="748" width="40" height="24" rx="12" fill="#F3F4F6"/>
  <text x="38" y="784" fill="#111827">Today</text>
  <text x="113" y="784">Explore</text>
  <text x="188" y="784">Milestones</text>
  <text x="263" y="784">Journal</text>
  <text x="338" y="784">This week</text>
</g>
</svg>`;
}

// 1. Sign In
const f1 = `<svg width="375" height="812" viewBox="0 0 375 812" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="375" height="812" fill="#FAFAF7"/>
<rect x="16" y="80" width="343" height="360" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
<text x="36" y="125" font-family="Inter, sans-serif" font-size="22" font-weight="700" fill="#111827">Sign in to LittleSteps</text>
<text x="36" y="150" font-family="Inter, sans-serif" font-size="14" fill="#6B7280">Support for early childhood play</text>

<!-- Email Field -->
<text x="36" y="185" font-family="Inter, sans-serif" font-size="14" font-weight="500" fill="#111827">Email</text>
<rect x="36" y="195" width="303" height="48" rx="10" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="1"/>
<text x="48" y="225" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF">you@example.com</text>

<!-- Password Field -->
<text x="36" y="265" font-family="Inter, sans-serif" font-size="14" font-weight="500" fill="#111827">Password</text>
<rect x="36" y="275" width="303" height="48" rx="10" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="1"/>
<text x="48" y="305" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF">••••••••</text>

<!-- Submit Button -->
<rect x="36" y="345" width="303" height="48" rx="10" fill="#1F2937"/>
<text x="187" y="375" font-family="Inter, sans-serif" font-size="15" font-weight="600" fill="#FFFFFF" text-anchor="middle">Sign in</text>

<text x="187" y="470" font-family="Inter, sans-serif" font-size="14" fill="#4B5563" text-anchor="middle">Don't have an account? Create account</text>
</svg>`;
fs.writeFileSync(path + "/01-lofi-auth-sign-in.svg", f1);

// 2. Add Child
const f2 = `<svg width="375" height="812" viewBox="0 0 375 812" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="375" height="812" fill="#FAFAF7"/>
<rect width="375" height="60" fill="#FFFFFF"/>
<line x1="0" y1="60" x2="375" y2="60" stroke="#E5E7EB" stroke-width="1"/>
<text x="16" y="38" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="#111827">Add your child</text>

<rect x="16" y="80" width="343" height="380" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
<text x="36" y="115" font-family="Inter, sans-serif" font-size="18" font-weight="700" fill="#111827">Child details</text>
<text x="36" y="135" font-family="Inter, sans-serif" font-size="13" fill="#6B7280">Only nickname and age band are saved</text>

<!-- Nickname Field -->
<text x="36" y="170" font-family="Inter, sans-serif" font-size="14" font-weight="500" fill="#111827">Nickname</text>
<rect x="36" y="180" width="303" height="48" rx="10" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="1"/>
<text x="48" y="210" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF">e.g. Maya</text>

<!-- Age Band Dropdown -->
<text x="36" y="250" font-family="Inter, sans-serif" font-size="14" font-weight="500" fill="#111827">Child age</text>
<rect x="36" y="260" width="303" height="48" rx="10" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="1"/>
<text x="48" y="290" font-family="Inter, sans-serif" font-size="14" fill="#111827">Young Toddlers (12–23 months)</text>

<!-- Save Profile Button -->
<rect x="36" y="340" width="303" height="48" rx="10" fill="#1F2937"/>
<text x="187" y="370" font-family="Inter, sans-serif" font-size="15" font-weight="600" fill="#FFFFFF" text-anchor="middle">Save child profile</text>
</svg>`;
fs.writeFileSync(path + "/02-lofi-onboarding-add-child.svg", f2);

// 3. Today Tab
const f3Content = `
<!-- Child Context Chip -->
<rect x="16" y="75" width="140" height="32" rx="16" fill="#E5E7EB"/>
<text x="86" y="96" font-family="Inter, sans-serif" font-size="13" font-weight="500" fill="#111827" text-anchor="middle">For Maya · 14m</text>

<!-- Advisory Banner -->
<rect x="16" y="120" width="343" height="88" rx="12" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="1"/>
<text x="32" y="145" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#111827">Not a diagnostic tool</text>
<text x="32" y="165" font-family="Inter, sans-serif" font-size="12" fill="#4B5563">LittleSteps shares play ideas. It is not a test.</text>
<text x="32" y="180" font-family="Inter, sans-serif" font-size="12" fill="#4B5563">Children develop at different rates.</text>

<!-- Idea Helper Card -->
<rect x="16" y="224" width="343" height="120" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
<text x="32" y="254" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="#111827">Idea helper</text>
<text x="32" y="274" font-family="Inter, sans-serif" font-size="13" fill="#6B7280">Quick play ideas based on what you have at home</text>
<rect x="32" y="290" width="130" height="38" rx="8" fill="#F3F4F6"/>
<text x="97" y="314" font-family="Inter, sans-serif" font-size="13" font-weight="500" fill="#111827" text-anchor="middle">Get an idea</text>

<!-- Planned Activity Card -->
<rect x="16" y="360" width="343" height="150" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
<rect x="16" y="360" width="343" height="50" rx="16" fill="#E5E7EB"/>
<text x="32" y="435" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="#111827">Cardboard Box Peek-a-boo</text>
<text x="32" y="455" font-family="Inter, sans-serif" font-size="13" fill="#6B7280">Thinking · Moving · Indoors</text>
<rect x="32" y="470" width="80" height="26" rx="6" fill="#F3F4F6"/>
<text x="72" y="487" font-family="Inter, sans-serif" font-size="11" font-weight="500" fill="#4B5563" text-anchor="middle">10 mins</text>
`;
fs.writeFileSync(path + "/03-lofi-today-dashboard.svg", frameBase("Today", f3Content));

// 4. Explore Catalog
const f4Content = `
<!-- Search Input -->
<rect x="16" y="75" width="343" height="44" rx="10" fill="#FFFFFF" stroke="#D1D5DB" stroke-width="1"/>
<text x="36" y="102" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF">Search play ideas or materials…</text>

<!-- Filter Chips -->
<rect x="16" y="130" width="76" height="32" rx="16" fill="#1F2937"/>
<text x="54" y="151" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#FFFFFF" text-anchor="middle">Thinking</text>
<rect x="98" y="130" width="72" height="32" rx="16" fill="#FFFFFF" stroke="#D1D5DB" stroke-width="1"/>
<text x="134" y="151" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#4B5563" text-anchor="middle">Moving</text>
<rect x="176" y="130" width="70" height="32" rx="16" fill="#FFFFFF" stroke="#D1D5DB" stroke-width="1"/>
<text x="211" y="151" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#4B5563" text-anchor="middle">Talking</text>
<rect x="252" y="130" width="74" height="32" rx="16" fill="#FFFFFF" stroke="#D1D5DB" stroke-width="1"/>
<text x="289" y="151" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#4B5563" text-anchor="middle">Feelings</text>

<!-- Activity List Item -->
<rect x="16" y="180" width="343" height="110" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
<text x="32" y="210" font-family="Inter, sans-serif" font-size="15" font-weight="600" fill="#111827">Water Cup Pouring</text>
<text x="32" y="230" font-family="Inter, sans-serif" font-size="13" fill="#6B7280">Moving · Hand-eye coordination</text>
<rect x="32" y="245" width="90" height="24" rx="6" fill="#F3F4F6"/>
<text x="77" y="261" font-family="Inter, sans-serif" font-size="11" fill="#4B5563" text-anchor="middle">Cups, Water</text>

<!-- Activity List Item 2 -->
<rect x="16" y="305" width="343" height="110" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
<text x="32" y="335" font-family="Inter, sans-serif" font-size="15" font-weight="600" fill="#111827">Animal Sounds Mimicry</text>
<text x="32" y="355" font-family="Inter, sans-serif" font-size="13" fill="#6B7280">Talking · Language building</text>
<rect x="32" y="370" width="80" height="24" rx="6" fill="#F3F4F6"/>
<text x="72" y="386" font-family="Inter, sans-serif" font-size="11" fill="#4B5563" text-anchor="middle">No materials</text>
`;
fs.writeFileSync(path + "/04-lofi-explore-catalog.svg", frameBase("Explore", f4Content));

// 5. Activity Detail
const f5Content = `
<!-- Cover Banner Placeholder -->
<rect x="16" y="75" width="343" height="120" rx="16" fill="#E5E7EB"/>
<text x="187" y="140" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF" text-anchor="middle">[Activity cover artwork]</text>

<text x="16" y="225" font-family="Inter, sans-serif" font-size="20" font-weight="700" fill="#111827">Water Cup Pouring</text>
<text x="16" y="245" font-family="Inter, sans-serif" font-size="13" fill="#6B7280">Moving · 12–23 months</text>

<!-- Materials Box -->
<rect x="16" y="265" width="343" height="80" rx="12" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
<text x="32" y="290" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#111827">Materials needed</text>
<text x="32" y="315" font-family="Inter, sans-serif" font-size="13" fill="#4B5563">• 2 plastic cups    • Water or dry rice</text>

<!-- Steps Box -->
<rect x="16" y="360" width="343" height="150" rx="12" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
<text x="32" y="385" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#111827">Steps to try</text>
<text x="32" y="410" font-family="Inter, sans-serif" font-size="13" fill="#4B5563">1. Sit with your child on the floor or mat.</text>
<text x="32" y="435" font-family="Inter, sans-serif" font-size="13" fill="#4B5563">2. Show them how you pour water into the cup.</text>
<text x="32" y="460" font-family="Inter, sans-serif" font-size="13" fill="#4B5563">3. Hand them the cup and let them try.</text>

<!-- Action Button -->
<rect x="16" y="525" width="343" height="48" rx="10" fill="#1F2937"/>
<text x="187" y="555" font-family="Inter, sans-serif" font-size="15" font-weight="600" fill="#FFFFFF" text-anchor="middle">Add to today's plan</text>
`;
fs.writeFileSync(path + "/05-lofi-activity-detail.svg", frameBase("Activity detail", f5Content));

// 6. Milestones Tracker
const f6Content = `
<!-- Age selector -->
<rect x="16" y="75" width="343" height="40" rx="10" fill="#FFFFFF" stroke="#D1D5DB" stroke-width="1"/>
<text x="32" y="100" font-family="Inter, sans-serif" font-size="14" fill="#111827">Young Toddlers (12–23 months)</text>

<text x="16" y="140" font-family="Inter, sans-serif" font-size="13" fill="#4B5563">Things children often start doing by 14 months</text>
<text x="16" y="160" font-family="Inter, sans-serif" font-size="13" font-weight="500" fill="#111827">Not a diagnostic tool ↗</text>

<!-- Milestone Row 1 -->
<rect x="16" y="180" width="343" height="85" rx="12" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
<text x="32" y="210" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#111827">Takes a few steps on their own</text>
<text x="32" y="230" font-family="Inter, sans-serif" font-size="12" fill="#6B7280">Moving milestone</text>
<rect x="245" y="200" width="98" height="34" rx="8" fill="#F3F4F6"/>
<text x="294" y="222" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#111827" text-anchor="middle">Not seen yet</text>

<!-- Milestone Row 2 -->
<rect x="16" y="280" width="343" height="85" rx="12" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
<text x="32" y="310" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#111827">Points to show you something</text>
<text x="32" y="330" font-family="Inter, sans-serif" font-size="12" fill="#6B7280">Talking · Feelings</text>
<rect x="235" y="300" width="108" height="34" rx="8" fill="#E5E7EB"/>
<text x="289" y="322" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#111827" text-anchor="middle">Seen on Oct 21</text>
`;
fs.writeFileSync(path + "/06-lofi-milestones-tracker.svg", frameBase("Milestones", f6Content));

// 7. Private Journal
const f7Content = `
<!-- Privacy Lock Box -->
<rect x="16" y="75" width="343" height="44" rx="10" fill="#F3F4F6"/>
<text x="32" y="102" font-family="Inter, sans-serif" font-size="13" font-weight="500" fill="#111827">🔒 Private notes — only you can see these</text>

<!-- Add Note Button -->
<rect x="16" y="130" width="343" height="44" rx="10" fill="#FFFFFF" stroke="#111827" stroke-width="1"/>
<text x="187" y="157" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#111827" text-anchor="middle">+ New note</text>

<!-- Note Card 1 -->
<rect x="16" y="190" width="343" height="110" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
<text x="32" y="215" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#6B7280">Oct 28, 2026</text>
<text x="32" y="240" font-family="Inter, sans-serif" font-size="14" fill="#111827">Maya stacked three wooden blocks before they fell!</text>
<text x="32" y="260" font-family="Inter, sans-serif" font-size="14" fill="#111827">She laughed and clapped her hands.</text>

<!-- Note Card 2 -->
<rect x="16" y="315" width="343" height="90" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
<text x="32" y="340" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#6B7280">Oct 24, 2026</text>
<text x="32" y="365" font-family="Inter, sans-serif" font-size="14" fill="#111827">Tried the water cup pouring outdoors. Loved it.</text>
`;
fs.writeFileSync(path + "/07-lofi-journal-notes.svg", frameBase("Journal", f7Content));

// 8. This Week Reflection
const f8Content = `
<!-- Week Heading -->
<text x="16" y="95" font-family="Inter, sans-serif" font-size="18" font-weight="700" fill="#111827">This week with Maya</text>
<text x="16" y="115" font-family="Inter, sans-serif" font-size="13" fill="#6B7280">Oct 26 – Nov 1, 2026</text>

<!-- Summary Cards -->
<rect x="16" y="135" width="343" height="100" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
<text x="32" y="165" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#111827">4 play moments noticed</text>
<rect x="32" y="180" width="311" height="12" rx="6" fill="#E5E7EB"/>
<rect x="32" y="180" width="180" height="12" rx="6" fill="#9CA3AF"/>
<text x="32" y="215" font-family="Inter, sans-serif" font-size="12" fill="#6B7280">Thinking (2) · Moving (1) · Talking (1)</text>

<!-- Reflection Prompt Box -->
<rect x="16" y="250" width="343" height="180" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
<text x="32" y="280" font-family="Inter, sans-serif" font-size="15" font-weight="600" fill="#111827">What was a fun moment together?</text>
<rect x="32" y="295" width="311" height="80" rx="10" fill="#FAFAF7" stroke="#D1D5DB" stroke-width="1"/>
<text x="44" y="325" font-family="Inter, sans-serif" font-size="13" fill="#9CA3AF">Write a quick thought…</text>
<rect x="32" y="390" width="120" height="32" rx="8" fill="#1F2937"/>
<text x="92" y="411" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF" text-anchor="middle">Save reflection</text>
`;
fs.writeFileSync(path + "/08-lofi-reflection-weekly.svg", frameBase("This week", f8Content));

// 9. Account Modal Sheet
const f9Content = `<svg width="375" height="812" viewBox="0 0 375 812" fill="none" xmlns="http://www.w3.org/2000/svg">
<!-- Background overlay -->
<rect width="375" height="812" fill="#000000" fill-opacity="0.4"/>
<!-- Modal Sheet (bottom aligned) -->
<rect y="430" width="375" height="382" rx="20" fill="#FFFFFF"/>
<rect x="167" y="442" width="40" height="4" rx="2" fill="#D1D5DB"/>
<text x="24" y="475" font-family="Inter, sans-serif" font-size="18" font-weight="700" fill="#111827">Account & children</text>

<!-- Children list -->
<rect x="24" y="495" width="327" height="52" rx="12" fill="#F3F4F6"/>
<text x="40" y="526" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#111827">Maya (14 months)</text>
<text x="310" y="526" font-family="Inter, sans-serif" font-size="13" fill="#111827">Active ✓</text>

<!-- Menu Actions -->
<text x="24" y="580" font-family="Inter, sans-serif" font-size="15" fill="#111827">+ Add another child</text>
<line x1="24" y1="595" x2="351" y2="595" stroke="#E5E7EB" stroke-width="1"/>
<text x="24" y="625" font-family="Inter, sans-serif" font-size="15" fill="#111827">Export a copy of your data</text>
<line x1="24" y1="640" x2="351" y2="640" stroke="#E5E7EB" stroke-width="1"/>
<text x="24" y="670" font-family="Inter, sans-serif" font-size="15" fill="#111827">Help and support</text>
<line x1="24" y1="685" x2="351" y2="685" stroke="#E5E7EB" stroke-width="1"/>
<text x="24" y="715" font-family="Inter, sans-serif" font-size="15" font-weight="500" fill="#991B1B">Sign out</text>
</svg>`;
fs.writeFileSync(path + "/09-lofi-account-menu.svg", f9Content);

console.log("Successfully generated all 9 low-fidelity wireframe SVGs.");
