# Lantube: #
## MEAN youtube video player from LAN, just for fun! ##
* Converts any computer into a Youtube video player, controlled from a browser or command line tools (optional, requires Python, cURL and/or SSH)
* Uses local media player software, like MPV (tested, default), VLC (tested) and maybe omxplayer (not tested yet)
* Runs as a service in a media center computer, like a [Raspberry Pi](https://www.raspberrypi.org/), with very few configs
* Users in the same LAN area can add and play (and stop) any Youtube video
* Use of Lantube in untrusted LANs or over the Internet is possible but **not recommended** at all

### Requirements and Notices: ###
* Lantube is tested only on Debian-based systems
* This installation works out of the box if [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) are installed (and running)
* Requires a local media player like MPV, VLC, etc. to work. If no player is set (or if `.env` file is missing), it will try to use MPV as default player
* If your player fails to play Youtube streams, you can search for answers online for your particular case, as players, systems and distros can have different configurations
* DB connection can be a remote MongoDB, like [mLab](https://mlab.com/) or [Openshift](https://www.openshift.com/) (only DB service)

### Supported players ###
* MPV
* VLC (fails? see [Updating the VLC YouTube parser](http://askubuntu.com/a/197766/280008))
* Chromecast

### Installation ###
* Clone this repo with: 
```
$ git clone https://github.com/andrrrl/lantube
```
* Install Lantube:
```
$ npm install
```
* Will auto-run `bower install`
* Also will run `node ./tools/install.js`, a tiny tool that creates a default `.env` file (see below)

### Default .env config file: ###

```
# Server host name
HOST_NAME=hostname
# Nodejs server port, default 3000
NODE_PORT=3000

# [DEV] MongoDB Connection
MONGO_HOST=localhost
MONGO_PORT=
MONGO_DB=lantube
MONGO_AUTH=no
MONGO_USER=admin
MONGO_PASS=

# [PROD] MongoDB Connection
# MONGO_HOST=example.com
# MONGO_PORT=27001
# MONGO_DB=lantube
# MONGO_AUTH=yes
# MONGO_USER=admin
# MONGO_PASS=shhhh

# MongoDB Collections
MONGO_VIDEOS_COLL=videos
MONGO_STATS_COLL=serverStats

## Players:

# Volume step (Alsa only)
PLAYER_VOLUME_STEP=4

## *** MPV ***
## Command that opens the player
PLAYER=mpv

## Player video modes (windowed:default|fullscreen|audio-only|chromecast):
PLAYER_MODE="fullscreen"
PLAYER_MODE_FULLSCREEN_ARG="--fs"
PLAYER_MODE_AUDIO_ONLY_ARG="--no-video"

## Argument for passing a playlist:
PLAYER_PLAYLIST="--playlist"
PLAYER_NO_PLAYLIST="--terminal"

## *** VLC/CVLC ***
## Command that opens the player:
# PLAYER=vlc
# 
## Player video modes (windowed:default|fullscreen|audio-only|chromecast):
# PLAYER_MODE="fullscreen"
# PLAYER_MODE_FULLSCREEN_ARG="--fullscreen"
# PLAYER_MODE_AUDIO_ONLY_ARG="--no-video"
# 
## Argument for passing a playlist:
# PLAYER_PLAYLIST"=--playlist"
# PLAYER_NO_PLAYLIST=--play-and-exit
```

### Server: ###

Just run one of the following commands:

#### Livereload mode (default, better for dev): ####
```
 $ gulp 
```
It will run tasks like sass, uglify and start node server with [nodemon](http://nodemon.io/) + [livereload](http://livereload.com/)

#### Non-livereload mode (better for user experience): ####
```
$ gulp lantube
```
It will also run sass and uglify but will start node server with regular `node` command.  
`nodemon` is disabled, so server won't auto-restart (and playback won't stop, important bit!).

### Client (Browser): ###
* Local: Navigate to http://localhost:3000 in any modern browser
* LAN: Get your server's IP number and navigate to http://YOUR_SERVER_IP:3000 from any modern browser
* Select playback mode (fullscreen, windowed or audio-only). Deafults to what's defined in the `.env` file.

### Client (CLI): ###
* Python CLI (full featured):
  1. `$ cd cli/python`
  2. `$ python lantube-cli.py help`
* Node.js CLI (for quick tests): 
  1. `$ cd cli/node/`
  2. `$ node lantube-cli.js help`

### Security: ###
* Use it only on trusted LAN networks
* Lantube is limited to LAN, any external IP will not be allowed
* Lantube is just for fun, don't rely too much on it for serious matters

### TODOs: ###
* [x] Volume controls (Alsa only)
* [ ] Firefox/Chromium extension
* [ ] API auth with passport?
* [ ] Make it work use outside LAN?
