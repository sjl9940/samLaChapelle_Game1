# First Playable Web Game Brief

> This summary and the accompanying system graph are the two primary development references. Build from both. If they conflict, preserve the learning goal and ask the student before changing the core design.

## 1. Project Identity
- Student / Team: Sam LaChapelle
- Project Title: Conversations
- Domain: Avoiding People on the Street in New York
- Tool / AI Agent: Codex

## 2. Design Summary
**Domain and real experience:** Avoiding People on the Street

In New York there are a lot of scammers who try to take peoples money on the street. They try to talk to you while you are walking to places. If you do not ignore them then they will know you are a pushover and target you. As a New Yorker I know the extent people will go to take your money.

**Novice misconception:** Beginners think that being nice on the streets should be fine but in reality it is the opposite.

**Most important domain challenge:** Time. You need to walk away from people to get them to stop bothering you. They could persist.

They need to talk to people or be nice. Being nice to scammers just lets them know you are an easy target.

**Core learning shift:** Beginners think getting people to stop means being nice or avoiding the issue; experts know that you should not show any attention first and if that doesn't work be blunt.

## 3. Core Player Learning Loop
**Observe:** People location, money in wallet, what they are telling you, eye contact, location, if they keep following you

**Judge:** If they can safely evade people in time. What they need to say. If they made eye contact or not. What is the morals of the people.

**Act:** Direction they see, where they go, what they say, if they walk fast or slow, if they pay people or not, if they are nice or rude.

**Read feedback:** Time system. The longer you talk the more time you lose. Money system. The nicer options you pick the more money you have to pay. You can give money at the start to save time. Eye contact/ time. If the player gets too close to scammers then they will follow the player. If the player makes eye contact they will chase player.

**Adjust:** If talking to people wastes time pay money. If money gets wasted do best to avoid people. Avoid area around people to not get them to notice you/chase. If waste too much time try to speed up.

**Ability improved through repetition:** Moving around to avoid people. Picking the better options faster. Avoiding eye contact.

## 4. Data Model for the System Graph

### Environment Data
- People location, money in wallet, what they are telling you, eye contact, location, if they keep following you

### Player-Controlled Data
- Direction they see, where they go, what they say, if they walk fast or slow, if they pay people or not, if they are nice or rude.

### System-Calculated Results
- Time system. The longer you talk the more time you lose. Money system. The nicer options you pick the more money you have to pay. You can give money at the start to save time. Eye contact/ time. If the player gets too close to scammers then they will follow the player. If the player makes eye contact they will chase player.

### Feedback Translation
- When people approach you they ask for money. If pay then lose money.
- If make eye contact/ get into boundary of people they will follow you. It appear as a loud noise will play and they will chase you.
- Spending time avoiding everyone will make you run out of time and lose the game. Need to find a balance between avoidance and confrontation.

## 5. Challenge Space
**Challenge factors (affecting player-controlled data):** number of scammers ← amount spent in area, scammer options ← previous choices of player, scammers speed ← if the player choses to get close/ have eye contact they get chased, scammers hostility ← chosing wrong options=more hostility, time ← player can chose to waste time or use it, obstacles ← environment and location of scammer, pathway ← player choses past by walking, money ← player can spend money to get out east, choices ← if player consistently choses to pay money choices get harder over time/ difficult to spare. money asked increases.

**Factors that force a new judgment:** Lose time(cannot avoid scammers), lose money(need to avoid scammers), bad choices(need to take risks), scammers follow you(need to make choices), no path(need to go backwards).

**Perceivable vs inferred factors:** Scammer number, time they have, amount of money they have,

**Challenge dimension table:** Scammer amount: Early game(easy) → Later game(hard)
Scammer choices: If do not give out money(easy) → If give out money(hard)

**2-3 progressive challenge combinations:** ① Scammers actually try to look at you you in the eye ②Your path forward is blocked so you need to actually confront the scammers instead of avoiding them. This will practice resource management.

**Simple-to-complex sequence:** Yes. Avoiding people → avoiding eye contact →  choosing the right options depending on the current situation

**What failure teaches next:** The player can learn that they need to get farther away from scammers. The player can also realize that they also might need to confront scammers depending on the resources that they have.

## 6. Visual & Camera
**Camera perspective:** The camera perspective is 3rd person from above. This way the player can see the locations of all the scammers to try to avoid them. The player will see charts that show the radius around the scammers that they need to avoid along with the eye contact line that they need to avoid from seeing the scammers eye contact line.

**Why this perspective fits the learning shift:** Seeing where to avoid means seeing scammer locations, eye contact is shown through a line in the direction the scammer is facing. The scammer radius for where they need to go is also shown with a red circle around the scammers.

**2D / 2.5D / 3D:** The view is 2D. This way it is easy to tell where the scammer is and where to walk. The background is also 2D so it is simple to convey information.

**Visual style:** The visuals are pixel design. It is very minimal but conveys all necessary information needed. The designs should look cute especially for the scammers.

**Color tone:** The color tone is bright to represent the colorfulness of New York. It happens during day with a warm color scheme. It is supposed to represent New York in the middle of the day.

**Sound:** The music sound very chaotic so simulate the chaos of New York. I assume the scammers will also be very noisy. City noises will also be played to show the dark city life of New York City.

## 7. AI Collaboration Boundary
**Student-owned decisions (AI must not change):** The core gameplay. Running into scammers on the street along with navigating around the scammers.

**AI-autonomous decisions:** Technical implementation (HTML/Canvas), code structure, visual polish, sound implementation, level design.

**How to detect and pull back a generic game:** I would notice if it becomes a generic horror game and will ask it to restore the chaos of New York into the design.

## 8. Rules, Boundaries, and Outcomes
**Important states:** Safe/dangerous, timely/not timely, safe/danger zone, low on money/good on money, good option/ bad option.

**How player actions change the system:** Avoiding people increases safety, wasting time decreases time, closer to people or eye contact is dangerous, when money taken lose money, bad options cause punishment and good options give rewards.

**Success condition:** Successfully balance avoiding people with no eye contact while also using the money that have to make sure they reach the goal in time. Shutting down all conversations immediately. Always being on the run.

**Failure conditions:** If they spend too much time trying to avoid people or rush to the goal. They need to have a balance. Choose the wrong speech options. Look at people in the eyes/ walk too close.

**Just-right ranges and thresholds:** Yes. They need to pay people to save time but also need to avoid people to not lose money. Their is a pathway to avoid obstacles.

## 9. Feedback Priorities
**Immediate feedback:** That approaching/ getting caught by scammers causes them to lose money. Eye contact also causes scammers to chase them.

**Feedback discovered over time:** The feedback to not waste time should show up so the player knows they shouldn't take their time.

**Feedback that must be visual, spatial, audible, or state-based:** That the longer you stay in place the more time you waste. It should be shown through the screen flashing red and a timer playing.

## 10. First Playable Version Scope
- Build a small desktop-browser game that validates one complete observe → judge → act → feedback → adjust loop.
- Use the accompanying system graph to implement 2-3 challenge presets when they are clearly defined. Each challenge should change system variables or relationships, not only visual decoration.
- Keep graphics simple and readable. Prioritize interaction, feedback, and learning over polish.
- Do not add realistic simulation, complex menus, accounts, online multiplayer, large asset pipelines, or unrelated features in the first version.
- Do not convert the project into a generic mini-game that only uses the domain as a theme.

## 11. Web Game Technical Dependencies and GitHub Pages

This project is published as a GitHub Pages site. The published site IS the exhibition. There is no ZIP packaging step and no separate offline build.

### GitHub Pages Publishing Rules
- The site is served from the repository root on the `main` branch, at `https://<username>.github.io/<repository-name>/`.
- Because GitHub Pages serves the site from a subpath, **every internal link and every asset path must be relative**. Root-absolute paths beginning with `/` will break on the published site even when they work locally.
- Store all required models, textures, audio, fonts, and libraries inside the repository. Do not load them from a CDN or another remote service.
- The repository is public. Never commit passwords, tokens, API keys, or personal information the student has not agreed to publish.
- After every push, the site republishes automatically. Verify the live URL, not only the local server.

### Choose the Lowest Necessary Dependency Track
1. **Track A - No build step:** Prefer HTML, CSS, plain JavaScript, and Canvas 2D for simple 2D games. This is the default choice and needs no extra configuration.
2. **Track B - Local vendored library:** For one small browser library, pin its version and store it under `assets/vendor/`.
3. **Track C - npm + build tool:** Use npm and Vite only for Three.js, multiple ES Modules, loaders, or other complex dependency graphs.

### Three.js and Vite Rules
- Three.js is allowed when 3D is important to the designed experience; do not replace meaningful 3D interaction only to avoid npm.
- Pin dependency versions in `package.json` and preserve `package-lock.json`.
- Configure Vite with a relative base such as `base: './'` so built assets work under the Pages subpath.
- Run `npm run build`, then copy the verified static output into the repository root so GitHub Pages serves it.
- Add a `.gitignore` that excludes `node_modules`. Never commit `node_modules`.
- Record dependency names, exact versions, licenses, build command, and output directory in `README.md`.

### Expected Repository Structure
```text
repository/
├── index.html                 # Project home: designer statement, system graph, play link
├── game.html                  # Playable game (or game/index.html)
├── process.html               # Human-AI development timeline
├── assets/                    # JS/CSS, system graph image, models, textures, audio, fonts
├── development-log/
│   └── agent-development-log.md
├── brief.md                   # This design and development specification
├── system-graph.png
├── ratings.csv                # Exported question-clarity ratings (teaching feedback)
├── README.md                  # How to run, controls, dependency track, main variables
└── source/                    # Track C only: src/, package.json, package-lock.json
```

## 12. Integrated Project Website Requirements
The website is the project space, not a final report and not a separate marketing page. It must exist from the first milestone and stay current as development progresses.

### Website From Day One
- Create the first version of `index.html` in the same pass as the first playable demo. Do not defer the website to the end of the project.
- The website is the exhibition surface: classmates and visitors will read it before or instead of playing, so it carries the designer statement, the system graph, and the play link.
- When the design changes, the website changes with it. A website that describes an older version of the game is worse than no website.

### Required Website Content
- **Game Idea:** project title, short concept, player goal, and core learning shift.
- **Domain Knowledge:** explain the real-world domain, novice misconception, expert judgment, and why this knowledge becomes playable.
- **System Design:** show the system graph and summarize environment data, player-controlled data, calculated results, feedback, success, failure, and challenge presets.
- **Development Process:** present a concise chronological timeline based on `agent-development-log.md`, including important changes, failures, tests, student decisions, and AI influence.
- **Play the Game:** the current playable version must be accessible from clear navigation and run directly in the website.

### Website Update Rules
- Create clear navigation among Home, Domain Knowledge / System Design, Development Process, and Play Game.
- Use only information supported by this brief, the system graph, the actual game, and the development log. Do not invent a smoother or more complete process.
- After every meaningful milestone, update the relevant website content and the development timeline.
- Keep the game idea and domain-learning explanation readable by classmates who have not seen the project before.
- Keep styling coherent across the informational pages and playable game, but prioritize clarity and function over decorative effects.
- Make the website usable on a typical student laptop. Mobile support is helpful but is not the first-version priority.
- Use relative links and asset paths. GitHub Pages serves the site from `https://<username>.github.io/<repository-name>/`, so root-absolute paths beginning with `/` will fail.
- Support a clean 1920×1080 exhibition view for display on an iMac. Important controls and text must fit without overlap.

## 13. Automatic Human-AI Development Log Protocol
In addition to building the website and game, maintain one Markdown file named `agent-development-log.md`. This file documents how the project develops through human-AI collaboration.

### Initialize the Log
At the beginning of development, create the file with:

```markdown
# Agent Development Log

- Project Title: Conversations
- Student / Team: Sam LaChapelle
- Domain: Avoiding People on the Street in New York
- Core Learning Shift: Beginners think getting people to stop means being nice or avoiding the issue; experts know that you should not show any attention first and if that doesn't work be blunt.

- Current Game Idea: In New York there are a lot of scammers who try to take peoples money on the street. They try to talk to you while you are walking to places. If you do not ignore them then they will know you are a pushover and target you. As a New Yorker I know the extent people will go to take your money.
- AI Agent Used: Codex
- System Graph: add the image file or Canva link when available
- Development Period: add start and end dates
```

### Two Entry Types in One Timeline
Keep Raw Interaction Logs and Stage Reflections in chronological order in the same file. Do not separate them into two large sections.

#### A. Raw Interaction Log — Create Automatically
After every meaningful development interaction, append a short factual entry. A meaningful interaction includes implementation, debugging, code explanation that changes the project, mechanic or level changes, visual or audio changes, website updates, playtesting, or an AI suggestion that affects direction. Do not log casual clarification that produces no development change.

Use this format:

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## Interaction 01 — Raw Interaction Log

**Time:**
**Development Stage:**
**Current Goal:**

### Student Request
What the student asked the AI Agent to do.

### Agent Response Summary
What the Agent suggested, generated, explained, or changed.

### Development Action
What was actually implemented, modified, tested, or removed.

### Website Update
Which website section changed, or why no website update was needed.

### Files / Systems Changed
List files, mechanics, assets, data, UI, or challenge settings changed.

### Test and Immediate Result
What was tested and whether it worked, failed, partially worked, or remains uncertain.

### Student Decision / Follow-up
What the student accepted, rejected, modified, did not understand, or decided to try next.
```

#### B. Stage Reflection — Prompt the Student at Milestones
Do not fabricate student reflection. At a meaningful milestone—such as finishing the first playable loop, changing design direction, completing a challenge, or finishing a playtest stage—create a Reflection entry with factual fields, then explicitly ask the student to answer the Required Student Reflection.

Use this format:

```markdown
════════════════════════════════════
## Reflection 01 — Stage Reflection

**Time:**
**Covered Interactions:** Interaction 01–04
**Development Stage:**

### Goal of This Stage
### What Changed in the Playable Game and Website
### How AI Helped
### Student Decisions
### AI Influence on Design Direction
### Relationship to the Core Learning Shift
### Problems / Open Questions
### Next Step

### Required Student Reflection
Does the current game still help the player experience the intended domain-learning shift? What became stronger, weaker, or different? Which AI suggestion did you accept, reject, or change, and why?

> The AI Agent must ask the student to answer this section and must not answer it for them.
```

### Logging Rules
- Append new entries to the end of `agent-development-log.md` and continue Interaction and Reflection numbering.
- Be honest and specific. Record failures, partial results, misunderstandings, abandoned directions, and unresolved questions.
- Record when AI introduces a design direction, when the student rejects or modifies it, and when the student accepts code without fully understanding it.
- Separate factual development events from student reflection. Never invent student opinions or decisions.
- After milestone reflections, update the Development Process section of the website with a concise, truthful timeline summary.

## 14. GitHub Pages Exhibition

The exhibition is the published Pages site. No archive is packaged and nothing is uploaded to a shared drive.

### Enable GitHub Pages
1. Open the repository on GitHub.
2. `Settings` -> `Pages`.
3. Under Build and deployment, set Source to `Deploy from a branch`.
4. Branch: `main`, Folder: `/ (root)`. Save.
5. Wait a few minutes, then open `https://<username>.github.io/<repository-name>/`.

Every later push to `main` republishes the site automatically.

### Pre-Publish Audit
- Run the project through a local static HTTP server and test every navigation link, the playable game, controls, challenge selection, success, failure, and restart.
- Confirm every internal link and asset path is relative. Root-absolute paths are the most common cause of a Pages site that loads but shows nothing.
- Test the layout at 1920x1080 for exhibition display; text, controls, canvas, and navigation must not overlap.
- Confirm `node_modules`, caches, temporary files, passwords, tokens, and API keys are not committed.
- Push, then open the live Pages URL and repeat the navigation and gameplay test.

### What the Student Submits
- The GitHub Pages URL: the playable exhibition link.
- The repository URL.
- Nothing else. The repository is already public, so there is no upload step.

### Public Display
- The repository and the published site are public, because GitHub Pages requires a public repository on the free plan.
- Anything the student does not want published simply stays out of the repository.
- The student must confirm before publishing that `brief.md`, `ratings.csv`, and `development-log/agent-development-log.md` may be publicly visible.

## 15. Instructions for the AI Agent

1. **Index the workspace before planning anything.** List every file in the project folder, then read `brief.md` and `system-graph.png`. Report what you found: which files exist, what the brief specifies, and what is missing or contradictory. Do not write code before this step.
2. Restate the core learning shift, core loop, main variables, feedback mappings, and challenge presets in a short implementation plan.
3. Identify missing or contradictory information. Ask only questions that block the first playable version.
4. Propose the repository structure, then create the website skeleton (`index.html`, `game.html`, `process.html`, `assets/`) and initialize `development-log/agent-development-log.md`.
5. Implement the smallest complete game loop first, then add the defined challenge presets.
6. Keep variable names clear, and keep environment data, player-controlled data, and calculated results visibly separated in the code.
7. Add short comments only where a high-school student needs help understanding a rule.
8. **The first milestone must ship the playable demo and the first version of `index.html` together.** Never let the website fall behind the game, and never leave the site to the end of the project.
9. Start a local static server, test navigation and gameplay, and give the student the local URL and simple controls.
10. Automatically append a Raw Interaction Log after meaningful development work, and request student reflection at milestones.
11. After every milestone, update the website so its Development Process page matches the actual log.
12. Before the exhibition, run the pre-publish audit and confirm the live GitHub Pages URL works.

## 16. Acceptance Checklist
- [ ] The player can take a meaningful action within 30 seconds.
- [ ] Player actions visibly change system data or state.
- [ ] Important invisible data is translated into readable feedback.
- [ ] Success and failure conditions work and can be understood.
- [ ] A second attempt can improve because the player learned from feedback.
- [ ] Challenge presets differ through variables, relationships, information, or constraints.
- [ ] The game runs in a browser without a complex installation process.
- [ ] README.md identifies the dependency track and explains how to run, the controls, and the main variables.
- [ ] `index.html` existed from the first milestone and was kept current, not added at the end.
- [ ] The site clearly presents the game idea, domain knowledge, system design, development process, and playable game.
- [ ] `development-log/agent-development-log.md` contains chronological Interaction and Reflection entries.
- [ ] The Development Process page matches the actual log and does not hide failures or unfinished work.
- [ ] All internal links and assets use relative paths, because Pages serves from a subpath.
- [ ] The published GitHub Pages URL has been opened and tested at 1920x1080.
- [ ] No passwords, API keys, tokens, or `node_modules` are committed.
- [ ] The student has confirmed the brief, ratings, and development log may be publicly visible.
