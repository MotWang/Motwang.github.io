---
title: "Reading Log: Multimodal Video Papers, Q2 2026"
date: 2026-06-05
topics: [Reading, Industry]
summary: "Three papers I actually returned to more than once this quarter — a compression note, a long-context conditioning trick, and one honest failure analysis."
reading_time: "3 min read"
---

## The three

1. A compression-side paper that argues for spatial-temporal factorization ahead of the diffusion loop rather than after it. The training-cost argument was more convincing than the sample-quality argument.
2. A long-context conditioning piece that quietly moves the goalposts on what counts as "controllable" generation. The failure modes at 60+ seconds are the interesting part.
3. A failure-analysis paper — rarer than it should be — comparing three open-source stacks on the same evaluation harness. Useful for calibrating what a demo reel is actually hiding.

## What I'm carrying forward

- Factorization before the loop is probably the right default for anything that needs to run at scale.
- Long-context conditioning papers should be judged on failure cases, not cherry-picked clips.
- Open harness comparisons are underrated as DD inputs for foundation-model bets.
