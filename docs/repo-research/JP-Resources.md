# JP-Resources
- GitHub: https://github.com/MarvNC/JP-Resources
- Status: active
- Last pushed: 2025-06-01T09:31:22Z
- Last updated: 2026-02-17T16:01:47Z
- Homepage: none
- Role: owner
- Repo type: dataset
- Primary language: Python
- Language breakdown: Python (100% by GitHub linguist)
- Suggested tags: japanese-learning, anki, yomichan, frequency-dictionaries, anki-tooling, python
- Tier suggestion: feature

## One-liner
Curated Japanese-learning resources centered on Anki and Yomichan workflows, with large frequency-list datasets and Python scripts for frequency backfilling/automation.
It functions as both a practical guide repository and a data source for mining-note workflows.

## Evidence
- `gh api repos/MarvNC/JP-Resources` shows owner repo (`fork: false`), MIT license, topics (`anki`, `anki-addon`, `japanese-learning`, `yomichan`), `archived: false`, and recent maintenance metadata.
- `gh api repos/MarvNC/JP-Resources/languages` returns Python only; scripting files include `frequency/backfill.py` and `frequency/frequenciesstylized/backfill-stylized.py`.
- `gh api repos/MarvNC/JP-Resources/git/trees/main?recursive=1` shows many large `.txt` assets (e.g., `frequency/JPDB.txt`, `frequency/cc100.txt`, stylized frequency lists), indicating strong dataset characteristics.
- Raw `readme.md` content documents Anki/Yomichan setup guides, frequency sorting/backfilling, and template scripts, confirming practical resource/tooling focus rather than a deployable app.
