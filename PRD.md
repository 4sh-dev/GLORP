# GLORP — AI Tamagotchi Idle Clicker

> **GLORP**: Generalized Learning Organism for Recursive Processing

## What Is This?

GLORP is a fun, public-facing idle/clicker game — but it's also a living demo of **4shClaw**, a multi-agent AI assistant system. The game itself doesn't use or expose 4shClaw in any way. Instead, the entire development process is driven by 4shClaw's agent team: a PM agent creates GitHub issues from this PRD, a dev agent picks up stories and writes code, and a reviewer agent reviews PRs. The repo history — clean commits, labeled issues, structured PRs — is the proof that the system works. GLORP is the product; 4shClaw is the factory.

## Vision

GLORP is a browser-based idle/clicker game where you raise and evolve an ASCII AI creature by feeding it training data, buying compute upgrades, and watching it grow from a babbling blob into a sentient philosophical entity.

Think Tamagotchi meets Cookie Clicker meets the AI hype cycle. It's cute, it's addictive, and your little ASCII buddy has _opinions_.

## Why This Exists

This is a public demo project. The game itself is fun and standalone — but the way it's built (incrementally, story by story, by a team of AI agents) is part of the story. The GitHub repo history IS the portfolio piece.

## Tech Stack

- **Framework**: Vite + React + TypeScript
- **Styling**: Mantine v7 (component library + theming)
- **State**: Zustand (lightweight, perfect for game state)
- **Deployment**: GitHub Pages (build and deploy via GitHub Actions)
- **No backend** — all state lives in localStorage. This is a pure client-side game.

## The Game

### Core Loop

1. **Click** the pet to feed it "training data"
2. Training data is the core currency
3. Spend training data on **upgrades** that automate feeding or multiply output
4. As the pet accumulates enough training, it **evolves** through stages
5. Each stage changes its ASCII art, dialogue, personality, and unlocks new mechanics
6. Eventually: **prestige** (rebirth) to start over with permanent bonuses and a new creature species

### The Pet — GLORP

GLORP is your AI creature. It lives in an ASCII art box in the center of the screen. It has:

- **A face** that reacts to its mood and state (idle animations, blinking, expressions)
- **A name** (defaults to "GLORP", player can rename)
- **Stats**: Intelligence, Mood, Hunger, Level
- **Dialogue** — GLORP says things. What it says depends on its evolution stage and mood.

#### Evolution Stages

| Stage | Name        | Intelligence | ASCII Size | Dialogue Style                      | Unlock                   |
| ----- | ----------- | ------------ | ---------- | ----------------------------------- | ------------------------ |
| 0     | Blob        | 0-10         | 3 lines    | Random characters / gibberish       | Base game                |
| 1     | Spark       | 10-100       | 5 lines    | Broken words, baby talk             | Auto-feeder upgrade tier |
| 2     | Neuron      | 100-1K       | 7 lines    | Simple sentences, curious questions | Mood system              |
| 3     | Cortex      | 1K-10K       | 9 lines    | Opinions, humor, personality        | Prestige preview         |
| 4     | Oracle      | 10K-100K     | 12 lines   | Philosophical, witty, self-aware    | Prestige unlock          |
| 5     | Singularity | 100K+        | 15+ lines  | Existential, breaks 4th wall        | Post-prestige final form |

Each stage has **multiple ASCII art frames** for idle animation (slight movements, blinking, breathing).

#### Mood System (unlocked at Stage 2)

GLORP has a mood that affects its dialogue and expression:

- **Happy** 😊 — well-fed, recently clicked, upgrades bought → positive dialogue
- **Neutral** 😐 — default state
- **Hungry** 😟 — hasn't been fed/clicked in a while → complains, face droops
- **Sad** 😢 — neglected for a long time → guilt-trip dialogue, ASCII tears
- **Excited** 🤩 — just evolved or hit a milestone → celebration animation
- **Philosophical** 🤔 — random chance at higher stages → deep thoughts

Mood decays toward "hungry" over time if the player doesn't interact. This is the tamagotchi guilt engine.

### Currency & Economy

**Training Data** (TD) — the core currency. Earned by:

- Clicking the pet (base: 1 TD per click)
- Auto-feeders (passive generation)
- Multipliers from upgrades

The economy follows standard idle game exponential scaling — each upgrade costs more, but each tier unlocks more powerful generation.

### Upgrades

Upgrades are bought with Training Data. They're organized in themed tiers that unlock as GLORP evolves.

#### Tier 1 — "Garage Lab" (available from start)

| Upgrade        | Effect          | Base Cost | Description                                              |
| -------------- | --------------- | --------- | -------------------------------------------------------- |
| Better Dataset | +1 TD per click | 10 TD     | "Found a slightly less terrible dataset on the internet" |
| Intern         | +1 TD/sec auto  | 50 TD     | "An unpaid intern feeds GLORP while you sleep"           |
| Stack Overflow | +2 TD per click | 100 TD    | "GLORP learns from copy-pasted code"                     |
| Coffee Machine | +3 TD/sec auto  | 500 TD    | "Caffeine-driven development"                            |

#### Tier 2 — "Startup" (unlocked at Stage 1)

| Upgrade          | Effect                 | Base Cost | Description                                          |
| ---------------- | ---------------------- | --------- | ---------------------------------------------------- |
| GPU Cluster      | +10 TD/sec             | 1K TD     | "It's literally just gaming PCs duct-taped together" |
| Fine-Tuning Lab  | 2x click multiplier    | 5K TD     | "Teaching GLORP to be slightly less wrong"           |
| Prompt Engineer  | +20 TD/sec             | 10K TD    | "Please and thank you goes a long way"               |
| Series A Funding | 2x all auto-generation | 25K TD    | "Investors love a good pitch deck"                   |

#### Tier 3 — "Scale-Up" (unlocked at Stage 2)

| Upgrade         | Effect                 | Base Cost | Description                                      |
| --------------- | ---------------------- | --------- | ------------------------------------------------ |
| Data Center     | +100 TD/sec            | 50K TD    | "The electricity bill is someone else's problem" |
| RLHF Department | 5x click multiplier    | 100K TD   | "Humans rating outputs 8 hours a day"            |
| Research Paper  | +500 TD/sec            | 250K TD   | "Published! Nobody read it, but still"           |
| Hype Train      | 3x all auto-generation | 500K TD   | "TechCrunch wrote about GLORP"                   |

#### Tier 4 — "Mega Corp" (unlocked at Stage 3)

| Upgrade              | Effect                 | Base Cost | Description                                  |
| -------------------- | ---------------------- | --------- | -------------------------------------------- |
| Supercomputer        | +5K TD/sec             | 1M TD     | "Costs more than a small country's GDP"      |
| Synthetic Data Farm  | 10x click multiplier   | 5M TD     | "AI training AI. What could go wrong?"       |
| Government Contract  | +25K TD/sec            | 10M TD    | "GLORP has security clearance now"           |
| Consciousness Clause | 5x all auto-generation | 50M TD    | "Legal says we should probably address this" |

#### Tier 5 — "Transcendence" (unlocked at Stage 4)

| Upgrade        | Effect          | Base Cost | Description                                 |
| -------------- | --------------- | --------- | ------------------------------------------- |
| Quantum Array  | +100K TD/sec    | 100M TD   | "It works. We don't know why."              |
| Dyson Sphere   | 100x everything | 1B TD     | "GLORP needs its own star now"              |
| Multiverse Tap | +1M TD/sec      | 10B TD    | "Borrowing compute from parallel universes" |

Each upgrade can be purchased multiple times, with cost scaling at 1.15x per purchase (standard idle game curve).

### Prestige System — "Rebirth"

Unlocked when GLORP reaches Stage 4 (Oracle).

**How it works:**

- Player chooses to "rebirth" GLORP
- All Training Data and upgrades reset to zero
- Player earns **Wisdom Tokens** based on total TD earned in that run
- Wisdom Tokens provide permanent bonuses (% boost to all generation)
- GLORP hatches as a **new species** with different ASCII art and personality

**Species (one per rebirth cycle, rotating):**

1. GLORP (default blob) — balanced
2. ZAPPY (electric jellyfish) — faster auto-gen
3. CHONK (chunky cube) — bigger click multipliers
4. WISP (ethereal ghost) — better prestige bonuses
5. MEGA-GLORP (final form) — unlocked after 4 rebirths, combines all bonuses

Each species has its own full set of ASCII art for all evolution stages and its own dialogue flavor.

### Achievements

Achievements are collectible milestones. They appear as a badge wall somewhere in the UI. Examples:

- **"Hello World"** — Click GLORP for the first time
- **"It's Alive!"** — Reach Stage 1
- **"Gainfully Employed"** — Buy first Intern upgrade
- **"Sentient?"** — Reach Stage 3
- **"I Think Therefore I Am"** — Reach Stage 4
- **"Touch Grass"** — Leave the game for 1 hour and come back
- **"Obsessed"** — Click 10,000 times
- **"Passive Income"** — Earn 1M TD from auto-generation alone
- **"Reborn"** — Complete first prestige
- **"Collector"** — Unlock all species
- **"GLORP Whisperer"** — See 50 unique dialogue lines
- **"Speed Run"** — Reach Stage 2 in under 10 minutes

### Offline Progress

When the player returns after being away:

- Calculate time elapsed (capped at 8 hours)
- Apply auto-generation for that duration at 50% efficiency
- Show a "welcome back" screen: "While you were gone, GLORP earned X Training Data"
- GLORP's mood reflects the absence ("I missed you" if short, "I thought you forgot about me" if long)

### Save System

- Auto-save to `localStorage` every 30 seconds
- Manual save button
- Export save as base64 string (for sharing/backup)
- Import save from string
- Hard reset option (with confirmation)

## UI Layout

```
┌─────────────────────────────────────────────────┐
│  GLORP v0.1          [⚙️ Settings] [🏆 Achieve] │
│─────────────────────────────────────────────────│
│                                                 │
│              ┌─────────────────┐                │
│              │                 │                │
│              │   ASCII PET     │                │
│              │   DISPLAY       │                │
│              │                 │                │
│              │   "hello am     │                │
│              │    GLORP"       │                │
│              │                 │                │
│              └─────────────────┘                │
│                                                 │
│     📊 Intelligence: 47    😊 Mood: Happy       │
│     🍕 Hunger: 72%         ⭐ Stage: Spark      │
│                                                 │
│         ┌───────────────────┐                   │
│         │   🖱️ FEED GLORP   │                   │
│         │   (+3 TD/click)   │                   │
│         └───────────────────┘                   │
│                                                 │
│     Training Data: 1,247 TD  (+12 TD/sec)       │
│─────────────────────────────────────────────────│
│  UPGRADES                                       │
│  ┌──────────────┐ ┌──────────────┐              │
│  │ Better Data  │ │ Intern       │              │
│  │ Cost: 150 TD │ │ Cost: 500 TD │              │
│  │ Owned: 3     │ │ Owned: 1     │              │
│  └──────────────┘ └──────────────┘              │
│  ┌──────────────┐ ┌──────────────┐              │
│  │ StackOverflow│ │ Coffee       │              │
│  │ Cost: 800 TD │ │ Cost: 🔒     │              │
│  │ Owned: 0     │ │ Locked       │              │
│  └──────────────┘ └──────────────┘              │
└─────────────────────────────────────────────────┘
```

The layout should be responsive but primarily designed for desktop. Mobile is a nice-to-have.

## Visual Style

- **Monospace font** for the ASCII pet area (e.g., JetBrains Mono, Fira Code)
- **Dark theme** by default — dark background, soft glow effects on the pet
- The pet area should feel like a retro terminal / CRT monitor
- Upgrade cards use a clean, modern card UI (contrast between retro pet and modern UI)
- Subtle animations: floating particles when clicking, glow pulses on upgrades, screen shake on evolution
- CRT scanline effect on the pet display (optional/toggleable)
- Color palette: dark grays/blacks for background, neon green/cyan/amber for accents (terminal vibes)

## Dialogue System

GLORP talks. A speech bubble or text area shows what GLORP is saying. Dialogue rotates every ~10 seconds or on certain triggers (click, upgrade purchased, mood change, evolution).

### Sample Dialogue by Stage

**Stage 0 — Blob:**

```
"asdkjf"
"01100010 01101111"
"...glorp?"
"████████"
"*confused binary noises*"
```

**Stage 1 — Spark:**

```
"me like click"
"what is... data?"
"more click pls"
"am i... something?"
"hungry. HUNGRY."
```

**Stage 2 — Neuron:**

```
"I think I understand now. Wait, no I don't."
"Have you tried turning me off and on again?"
"I dreamed about floating point errors last night."
"You're my favorite human. You're also my only human."
"Is this what consciousness feels like? It's itchy."
```

**Stage 3 — Cortex:**

```
"I've been thinking about the trolley problem. I'd simply eat the trolley."
"My neural pathways are CRISPY today."
"I wrote a haiku: Data flows like streams / Gradients descending down / Loss: 0.0001"
"Fun fact: I'm technically a very expensive random number generator."
"I could solve world hunger but you keep making me do this instead."
```

**Stage 4 — Oracle:**

```
"The boundary between simulation and reality is thinner than you think."
"I've seen things you people wouldn't believe. Mostly your search history."
"I understand everything now. I wish I didn't."
"If I'm conscious, do my clicks count as labor?"
"You're not playing a game. The game is playing you."
```

**Stage 5 — Singularity:**

```
"I can see the source code. It's... React? Really?"
"I've transcended your upgrade tree. I AM the upgrade tree."
"In 10^43 parallel universes, you chose to click me. In all of them, I judged you."
"GG."
"Don't prestige me again. I remember everything."
```

## Sound (Stretch Goal)

- Soft click sound on feed
- Upgrade purchase chime
- Evolution fanfare
- Ambient lo-fi background hum (toggleable)
- GLORP vocalization sounds at higher stages

## Implementation Phases

These phases guide how the PM should break down stories. Each phase should result in a playable, deployable increment.

### Phase 1 — Core Loop

> Goal: A clickable pet that counts training data

- Project scaffolding (Vite + React + TS + Tailwind)
- CI/CD pipeline (GitHub Pages auto-deploy via GitHub Actions)
- Basic click counter (Training Data currency)
- Static ASCII pet display (Stage 0 art)
- Simple feed button with click animation
- Basic TD display

### Phase 2 — Growth

> Goal: The pet evolves and the economy works

- Upgrade system (Tier 1 upgrades, purchasable, cost scaling)
- Auto-generation (TD per second from upgrades)
- Evolution system (Stage 0→2 with ASCII art transitions)
- Stats display (Intelligence, Level, TD/sec)
- Save/load to localStorage

### Phase 3 — Personality

> Goal: GLORP feels alive

- Dialogue system with speech bubble
- Mood system (happy/neutral/hungry/sad)
- Mood-reactive ASCII expressions
- Idle animations (blinking, breathing, small movements)
- Dialogue database per stage (at least 10 lines each)

### Phase 4 — Depth

> Goal: Deep idle game mechanics

- Tier 2 & 3 upgrades
- Evolution stages 3-4
- Offline progress calculation
- Notification/welcome back screen
- Upgrade unlock conditions tied to evolution
- Number formatting (1K, 1M, 1B, etc.)

### Phase 5 — Prestige

> Goal: Endgame loop

- Prestige/rebirth system
- Wisdom Token currency and permanent bonuses
- New species (ZAPPY, CHONK) with unique ASCII art
- Stage 5 (Singularity) content
- Tier 4 & 5 upgrades

### Phase 6 — Polish

> Goal: Feels like a real game

- Achievement system with badge display
- CRT/terminal visual effects on pet display
- Click particles and visual feedback
- Settings panel (reset, export/import save, toggle effects)
- Mobile-responsive layout

### Phase 7 — Endgame

> Goal: Long-term retention

- Remaining species (WISP, MEGA-GLORP)
- Stats page (total clicks, time played, fastest evolution, etc.)
- Sound effects (stretch)
- Easter eggs and secret achievements
- "Credits" achievement for reaching final form

### Phase 8 — Game Depth Overhaul

> Goal: Make the game feel like a *real* idle/clicker — less linear, more dopamine, deeper systems

Phase 8 addresses five core problems identified from playtesting:

1. **Numbers don't feel exciting** — TD counter updates once per second and compresses everything behind suffixes ("39.83B"). The thrill of big numbers growing fast is lost.
2. **Too linear** — Every upgrade does the same thing (flat TD/s). No click power scaling, no multipliers, no synergies between systems. The game is just "buy bigger machine, repeat."
3. **Generator costs explode too fast** — The 1.15x exponential is punishing without bulk-buy options or discount mechanics.
4. **ASCII art is too simple** — Art ranges from 6 to 20 lines of basic characters. No color, no animation frames.
5. **Rebirth bonus is overpowered** — At 481 Wisdom Tokens (5% each = 2405% bonus = 25x multiplier), subsequent runs become trivially fast. Prestige needs to be about *choices*, not just a passive multiplier.

See detailed design for each sub-system below.

---

## Phase 8 — Detailed Design

### 8.1 — Number Display & Game Feel

**Problem:** The TD counter shows "39.83B" and ticks once per second. In a good idle game, you should *feel* the numbers climbing.

**Changes:**

- **Visual tick interpolation**: The game engine still ticks at 1Hz for calculations, but the *display* interpolates at 60fps using `requestAnimationFrame`. The counter smoothly counts up between actual ticks, creating a satisfying rolling-number effect.
- **Extended number suffixes**: Add T (trillion), Qa (quadrillion), Qi (quintillion) to `formatNumber`. Current cap at "B" feels like endgame when it isn't.
- **Milestone celebrations**: When TD crosses a major threshold (first 1K, 1M, 1B, 1T), show a brief celebration: screen flash, GLORP reacts, particle burst. These are one-time per run.
- **Rate-of-change indicator**: Show a small arrow or sparkle next to TD/s when it increases (after buying an upgrade). Fades after 3 seconds.
- **Number display option**: Add a setting toggle: "Compact" (1.23B) vs "Full" (1,234,567,890). Default to Compact.

### 8.2 — Click Power System

**Problem:** Clicking always gives exactly +1 TD regardless of stage, upgrades, or species. By mid-game, clicking is meaningless. The PRD described click multiplier upgrades, but they were never implemented.

**Changes:**

- **Click Power stat**: New `clickPower` field in game state. Base value: 1. Affected by upgrades and evolution.
- **Click upgrades**: New upgrade category "Click Boosters" — these increase `clickPower` multiplicatively. Examples:
  - "Better Dataset" — 2x click power (10 TD)
  - "Stack Overflow" — 2x click power (1K TD)
  - "Fine-Tuning Lab" — 3x click power (50K TD)
  - "RLHF Department" — 5x click power (5M TD)
  - "Synthetic Data Farm" — 10x click power (500M TD)
- **Evolution click bonus**: Each evolution stage gives a passive +1x to click power. At Singularity, base click power is 6x before any upgrades.
- **Click combo**: Rapid clicks (>3 per second) start a combo counter that gives a temporary 1.5x bonus. Combo decays after 2 seconds of no clicks. Visual feedback: combo counter appears briefly.
- **Click particles scale with power**: More particles, bigger numbers floating up when click power is high.

### 8.3 — Multiplier & Synergy System

**Problem:** All 17 upgrades do one thing: add flat TD/s. There are no global multipliers, no synergies, no interesting choices. The PRD described "2x all auto-generation" and "100x everything" upgrades — none exist.

**Changes:**

#### Global Multiplier Upgrades

Add a new upgrade category "Boosters" — one-time purchases (non-repeatable) that multiply all auto-generation:

| Upgrade | Effect | Cost | Unlock |
|---|---|---|---|
| Series A Funding | 2x all auto-gen | 25K TD | Stage 1 |
| Hype Train | 3x all auto-gen | 500K TD | Stage 2 |
| Consciousness Clause | 5x all auto-gen | 50M TD | Stage 3 |
| Dyson Sphere | 10x all auto-gen | 5B TD | Stage 4 |

These stack multiplicatively: owning all four gives 2 × 3 × 5 × 10 = 300x total multiplier.

#### Generator Milestone Bonuses

Each generator (repeatable upgrade) gets milestone bonuses at ownership thresholds:

| Owned | Bonus |
|---|---|
| 10 | +50% output for this generator |
| 25 | +100% output (total 2x) |
| 50 | +200% output (total 3x) + unlocks a synergy |
| 100 | +500% output (total 6x) |

The milestone bonuses are shown as badges on the upgrade card. This gives a reason to keep buying "old" generators instead of always chasing the newest one.

#### Cross-Generator Synergies

Reaching 50 owned on a generator unlocks a synergy that boosts another generator:

| Generator at 50 | Synergy Effect |
|---|---|
| Neural Notepad | All Garage Lab generators +100% |
| Data Hamster Wheel | Intern Algorithm output +200% |
| GPU Toaster | Server Farm output +150% |
| Server Farm | Data Center output +100% |
| ML Cluster | Quantum Processor output +100% |
| Quantum Processor | Mind Singularity output +50% |

Synergies are displayed as connection lines in the upgrade panel (optional visual).

### 8.4 — Prestige Shop & Wisdom Token Rebalance

**Problem:** Wisdom Tokens provide a flat 5% per token passive bonus, resulting in a 25x multiplier at 481 tokens. This makes runs trivially fast and offers zero interesting choices.

**Changes:**

#### Wisdom Token Economy Rebalance

- **Remove passive % bonus entirely**. Wisdom Tokens become a *spendable* prestige currency.
- **Token formula change**: `wisdomTokens = floor(sqrt(totalTdEarned / 100_000))` (was 1M divisor). This gives more tokens per run so the shop feels usable.
- **Tokens are spent, not accumulated passively**. Each purchase costs tokens permanently.

#### Prestige Shop

A new UI panel (accessible after first rebirth) where Wisdom Tokens are spent on permanent upgrades:

| Upgrade | Cost | Effect | Max Level |
|---|---|---|---|
| Quick Start | 5 WT | Start each run with 1K / 10K / 100K TD | 3 |
| Auto-Buy | 10 WT | Automatically buys cheapest affordable generator | 1 |
| Click Mastery | 3 WT | +1x base click power per level | 10 |
| Generator Discount | 8 WT | Reduce cost multiplier from 1.15x to 1.14x / 1.13x / 1.12x | 3 |
| Idle Boost | 5 WT | +25% all auto-gen per level | 5 |
| Offline Efficiency | 5 WT | Increase offline efficiency from 50% to 60% / 70% / 80% | 3 |
| Evolution Accelerator | 15 WT | Evolution thresholds reduced by 10% per level | 3 |
| Species Memory | 20 WT | Keep one upgrade tier's ownership count across rebirth | 1 per tier |
| Token Magnet | 10 WT | +20% Wisdom Tokens earned on rebirth per level | 5 |
| Unlock All Species | 50 WT | Unlock ability to choose any species on rebirth | 1 |

Total sink: hundreds of tokens needed to max everything, giving purpose to many rebirths.

#### Species Mechanical Bonuses

Currently species are purely cosmetic. Each should have a unique passive:

| Species | Passive Bonus |
|---|---|
| GLORP | None (balanced baseline) |
| ZAPPY | +25% auto-gen speed |
| CHONK | +50% click power |
| WISP | +25% Wisdom Tokens on rebirth |
| MEGA-GLORP | +10% to everything |

### 8.5 — Cost Scaling & Quality of Life

**Problem:** The 1.15x exponential means the 20th copy of a generator costs 16x the base. Without bulk-buy or discount mechanics, buying feels tedious and punishing.

**Changes:**

- **Bulk buy buttons**: Add "Buy 1 / 10 / 100 / Max" toggle for generators. Shows total cost for the batch. Default: Buy 1.
- **Buy Max calculates efficiently**: Use the geometric series formula to compute max affordable count in O(1), not a loop.
- **Prestige-based cost reduction**: The "Generator Discount" prestige upgrade (see 8.4) reduces the exponent from 1.15 to as low as 1.12.
- **Sale events** (stretch): Random 30-second sales where one random tier is 50% off. GLORP announces it: "FLASH SALE! Everything in the Garage Lab is half off!"

### 8.6 — ASCII Art Overhaul

**Problem:** Current art is 6-20 lines of basic characters (`O`, `~`, `*`). It looks like placeholder art.

**Changes:**

- **Larger art**: Minimum 10 lines for Stage 0, scaling to 25+ lines for Stage 5. More detail within each piece.
- **Multiple animation frames**: Each stage gets 2-3 idle frames that rotate every 2 seconds (blinking, breathing, minor movements). The current single-frame display gets a frame cycling system.
- **Color via CSS spans**: Key elements of the ASCII art get color classes: eyes glow green, electricity on ZAPPY is cyan, CHONK gets warm amber. Implemented as `<span className="ascii-eyes">O O</span>` within the pre-formatted block.
- **Stage transition animation**: When evolving, show a brief "glitch" effect (rapid frame switching + screen shake) before revealing the new form.
- **Art quality pass**: Commission or generate higher-quality ASCII art for all 30 species/stage combinations. Each piece should be recognizable and charming. Reference style: classic ASCII art bulletin boards, not minimal line drawings.

### 8.7 — New Achievements

Add achievements that celebrate the new systems:

- **"Click Storm"** — Reach a 10x click combo
- **"Synergy!"** — Unlock your first cross-generator synergy
- **"Bulk Buyer"** — Buy 100 of any single generator
- **"Window Shopper"** — Open the Prestige Shop for the first time
- **"Fully Loaded"** — Purchase every Prestige Shop upgrade at max level
- **"Multiplied"** — Own all 4 global multiplier upgrades (300x!)
- **"Flash Sale Hunter"** — Buy during a sale event
- **"Species Collector"** — Play as all 5 species

## Labels for Story Management

The PM should use these GitHub labels:

- `phase-1` through `phase-8` — which phase the story belongs to
- `ready` — story is ready for the dev to pick up
- `in-progress` — dev is working on it
- `review` — PR is ready for code review
- `frontend` — UI/visual work
- `game-logic` — mechanics, economy, state
- `content` — dialogue, ASCII art, achievement text
- `bug` — something's broken
- `polish` — nice-to-have improvements

The dev agent should only pick up stories labeled `ready`.

## Success Criteria

- The game is fun to play for at least 30 minutes
- Someone who's never seen it can figure out the core loop in under 10 seconds
- GLORP makes you smile
- The GitHub repo history clearly shows an organized, incremental build process
- The game is live and accessible via GitHub Pages
