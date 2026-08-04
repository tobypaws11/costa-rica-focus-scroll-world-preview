# Veo clip handoff

This folder receives the approved Google Flow exports.

The approved three-chapter continuous-forward sequence is:

1. `montanoa-into-farm-scrub.mp4`
2. `montanoa-farm-to-craft-scrub.mp4`
3. `montanoa-craft-to-stay-scrub.mp4`

Each desktop clip has a `-mobile.mp4` sibling. Desktop keeps the native 1280×720 Veo frame, H.264, CRF 20 and GOP 8. Mobile uses 960×540, CRF 23 and GOP 4. All website files strip audio and use `+faststart`.

Chapter 2 starts on the exact final frame of Chapter 1; Chapter 3 starts on the exact final frame of Chapter 2. The paired PNG posters preserve those seams while each video loads.
