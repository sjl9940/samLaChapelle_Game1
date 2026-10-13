# Conversations — Conversations on the Street

A browser game based on the designer’s experience avoiding people asking for money on New York streets. Walk along a long, randomized city route, weave around buildings and traffic, and manage time and money across Brooklyn (Survival), Manhattan (Management), and Queens (Nightmare).

## Run it

Open `index.html` in a desktop browser and choose **Play**. If your browser restricts local files, run `python3 -m http.server 8000` in this folder and open `http://localhost:8000/`.

## Controls

- Walk continuously: hold `W A S D` or arrow keys. Buildings require you to move up and down to get around the blocks.
- Dialogue: read the scammer’s line and behavior clue, then choose an in-game response, pay, or walk away. Some encounters ask three questions and force payment after three wrong answers; this happens more often in Queens.
- Restart: **Restart level**; use **New street** to reshuffle the city.
- Sound: toggle **City groove**; browser audio starts after the first movement and changes arrangement by borough. A spotted warning sounds; wrong answers flash red for one second; low money triggers a red pulse and repeating alarm; traffic hits honk. Exits award $5, cheers, and show a win/next-level screen.

## Dependency track

**Track A — No build step.** Plain HTML/CSS/JavaScript and Canvas 2D. No external dependencies. Borough-specific building and scammer sprites, original browser-generated tracks for all three boroughs, cheers, traffic horns (cars stop briefly on impact, then resume rightward), pursuit warnings, and low-wallet alarms are drawn or generated locally in the game.

## Main variables

- Environment: borough palettes, visible construction barriers, sidewalk carts, scaffolding, hydrants, storefronts, moving pedestrians, traffic, and scammer behavior.
- Player-controlled: continuous position and facing, movement, dialogue, payment, and whether to walk away.
- Calculated state: time, money, visibility, detection, pursuit, collision costs, requested price, and level completion, exit bonuses, and win/loss screens.

Forty-four scammer opening lines pair with observable clues. Brooklyn clues align with the target response. In Manhattan, 20% of encounters use a different target from the clue style. Queens selects a random opening and independently randomizes the right action across Polite, Firm, Pay, and Walk away, so familiar dialogue can have a different answer. All character sprites use light-skin palettes; scammers and pedestrians remain visually distinguishable by their marker, movement, and role. A yellow question mark identifies a scammer; passersby do not initiate conversations. The unexplained carried-looking prop has been removed. A spotted warning combines a callout, alarm, and on-screen indicator. Wrong spoken responses cost money, flash the screen red for one second, show an X, and disappear from the current question. Some encounters force payment after three misses, with that pressure most common in Queens. Brooklyn has 12 scammers and Manhattan 18; the person you answered stays in the street after a correct response, and nearby scammers no longer scatter when a conversation begins. Brooklyn scammers only react when the player faces them on the same screen half, so keeping distance or moving to the opposite half avoids contact. Manhattan uses range and line of sight; Queens spots the player across the screen and pauses its swarm during a conversation. Pressure rises across the boroughs: Brooklyn has up to two pursuers, Manhattan three, and Queens five, with separation steering to reduce clumping. Queens scammers spot the player across the visible screen. Manhattan and Queens give a two-second no-contact window after a correct response; the crowd stays in the level. The road is linear. Buildings have a two-row street-facing under-awning passage; the player sprite disappears in that strip, and the rest of each building blocks movement. Each borough has a distinct generated funk arrangement, growing faster and more stressful through the levels. Exit clears grant a carried $5 bonus and a cheer. When money drops below a quarter of the starting wallet (or $6 minimum), the screen pulses red and a repeating siren plays.
