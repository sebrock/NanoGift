# NanoGift: Give Nano to Your Favorite Websites
## Download
NanoGift has been approved for download by [Mozilla](https://addons.mozilla.org/en-US/firefox/addon/nanogift/) and [Google](https://chrome.google.com/webstore/detail/nanogift/ilffhjableefemgfhlohhifpdjgkihlm).

For supported browsers and store links, visit [TetraLoom.com](https://tetraloom.com/nanogift/).

## Overview

NanoGift is an open source extension for Firefox, Chrome, Brave, and others that lets you support your favorite websites using nano by adding a simple donation button near your address bar. Click the button to get a special donation QR code and nano address for the website. Everything is done between your browser and the site, with no data sent anywhere else. It's commission free and fee-less, so you can donate freely to the sites you love.

NanoGift works by requesting a special nano donation address from the website you are on. Hence, site owners need only create a single txt file with their nano address at /nanogift.txt to receive donations. This also means that the extension creator and resource site, [TetraLoom.com](https://tetraloom.com/nanogift/), has no involvement in this process, nor any knowledge regarding donations. It really is 100% hands-off.

NanoGift profits solely from donations. Please consider sending some nano to support further development.

## Security

NanoGift uses minimal permissions, requiring only the following abilities:

1. To see the user's active tab's url

2. To send a single GET request to check for a donation link

3. To write - but not read - the clipboard

How each browser achieves the above determines the necessary permissions. This means that in Chrome, for example, slightly elevated permissions are required, like reading all tab data. This is because Chrome doesn't let an extension read just the active tab. Hence, more permissions will be required than strictly the above. However, NanoGift chooses to minimally use whatever powers are granted.

NanoGift does not execute any code whatsoever until after the button is pressed. Hence, it has no potential to even interact with sensitive pages, nor interfere with automated services, unless the button is pressed. Do note though, that since only a few users have installed NanoGift so far, clicking the button and triggering the GET request may be used to fingerprint you as a NanoGift user. This likely doesn't matter for most use cases, but those using Tor must keep this in mind.

NanoGift's source is open for public scrutiny, but isn't yet licensed under the GPL. This will change following the [Nano Buildoff's](https://nanobuildoff.com/) conclusion. The QR code library has its own license, which you should follow independently.
