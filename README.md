# Deck Lightning

Make lightning talks for the cli

## Install

`npm install deck-lightning -g`

## Usage

`deck-lightning 90 one.md two.md "https://gist.github.com/path_to_some_gist" four.md > talk.html`

This will create a four slide presentation where one.md is the first slide, the gist at the above URL is the 3rd slide,  four.md is the last content slide and each slide is on the screen for 90 seconds.  After the last content slide, a static "Thanks" slide is presented.

