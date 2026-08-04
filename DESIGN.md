<!-- SEED: established with the user before implementation; re-run $impeccable document once there's code to capture the actual tokens and components. -->
---
name: Montanoa — The Living Coffee Lens
description: A cinematic field journal that carries visitors from coffee cherry to Monteverde farm.
---

# Design System: Montanoa — The Living Coffee Lens

## Overview

**Creative North Star: "The Living Coffee Lens"**

The interface feels like documentary footage observed through a precise field camera: expansive photographic space, restrained information at the frame edges, and moments of near-black quiet that let the farm's light become the dominant material. It refuses both the category-standard café menu and the soft beige coffee editorial.

The reusable signature is a pair of fine sight lines and a chapter rail that measure progress through the landscape without turning the experience into a dashboard. Motion is one continuous forward camera journey; interface elements settle and release around it rather than arriving as repeated effects.

**Key Characteristics:**

- Full-bleed, center-safe documentary imagery.
- Near-black volcanic surfaces with leaf, cherry, and golden-bean color roles.
- High-contrast editorial serif statements paired with calm humanist body copy.
- Hairline sight marks, clipped corners, and transparent controls instead of rounded cards.
- One authored scroll journey with ordinary document flow as its fallback.

## Colors

Use a full palette derived from the farm at dawn: volcanic black for the camera frame, cloud white for reading, leaf green for living systems, coffee-cherry wine for emphasis, and golden bean for decisive actions.

**The Living Color Rule.** Saturated color appears only where it names a real material, chapter, or action; never scatter accent color as decoration.

## Typography

Display typography uses self-hosted Newsreader for a refined editorial voice that still feels organic and grounded. Body, navigation, labels, and controls use self-hosted Manrope for quiet clarity and strong Spanish and English support. The Montanoa wordmark stays in the restrained sans-serif role so the serif never competes with the brand name.

Display lines are short, sentence-cased or deliberately uppercase, and never exceed 6rem. Body copy stays between 55 and 72 characters per line. Labels use the body family at a smaller size rather than dressing the interface in monospace.

**The One Breath Rule.** A chapter headline must be readable in one breath and may not compete with more than one supporting sentence.

## Layout

The primary experience is a viewport-height sticky stage inside normal document flow. Text occupies edge-safe zones while the center remains available to the photographic subject and mobile crop. Desktop uses an asymmetric frame with navigation high left, story copy low left, and the chapter rail on the right. Mobile collapses these into a top brand strip, bottom copy sheet, and compact progress marks inside safe-area insets.

Sections after the cinematic sequence alternate broad photographic fields with concise text passages. Spacing is generous between chapters and tight within each copy cluster. The footer remains reachable and releases cleanly from the sticky stage.

## Elevation & Depth

Depth comes from photography, tonal overlays, and occlusion rather than cards or floating glass panels. Text receives a localized directional scrim only where footage would compromise contrast. Controls remain flat and gain a small physical offset on interaction.

**The Lens Before Layer Rule.** Add contrast by grading the image behind content before adding a new container.

## Shapes

Frames use squared or lightly clipped corners, fine one-pixel lines, and occasional right-angle sight marks. Pills are reserved for compact tags or language controls. Large content containers are not rounded cards.

## Do's and Don'ts

### Do:

- **Do** keep the primary subject centered with generous headroom for portrait cropping.
- **Do** place the Montanoa name, logo, and copy in semantic React layers.
- **Do** let the six chapters vary in pace while preserving the same camera direction.
- **Do** keep a poster visible until video has painted a real frame.

### Don't:

- **Don't** bake the Montanoa logo, captions, or interface text into Veo footage.
- **Don't** use generic coffee-shop icons, beige card grids, fake reviews, or resort-language claims.
- **Don't** reverse camera direction at clip boundaries.
- **Don't** require video or precise scrolling to understand the offer or reach the calls to action.
