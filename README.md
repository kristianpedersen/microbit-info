# micro:bit serial data to WebMIDI

[https://kristianpedersen.github.io/microbit-info/](https://kristianpedersen.github.io/microbit-info/)

Accepts key:value messages from a micro:bit, and uses them to send MIDI messages.

Here's an example where the micro:bit's magnetometer is transformed to MIDI data:

Todos / ideas (december 4th 2020):
* Prevent bug that causes incomplete messages under high CPU loads or onfocused window. This causes multiple keys to be added, such as "ke" or "keykey".
* Support for multiple keys and multiple control change messages - only one key:value message supported now.
* Maybe expose more of the WebMIDI API, allowing users to create their own setups.
* Arduino support
* Nicer looks
* localStorage to persist settings between sessions
* Visualize incoming values on Canvas element.
* There is a small amount of smoothing applied to the output signal. This should have an input slider
* Testing on Windows and Linux, and with other MIDI interfaces.
* Clean up messy file structure and code.
