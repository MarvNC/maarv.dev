# win-to-mac-ahk
- GitHub: https://github.com/MarvNC/win-to-mac-ahk
- Status: active
- Last pushed: 2025-11-12T09:24:38Z
- Last updated: 2025-11-12T09:24:09Z
- Homepage: none
- Role: owner
- Repo type: tool
- Primary language: AutoHotkey
- Language breakdown: AutoHotkey (100%)
- Suggested tags: autohotkey, keyboard-remap, macos, windows, remote-desktop, rustdesk, parsec
- Tier suggestion: list_item

## One-liner
Small AutoHotkey v2 utility that swaps Alt/Win to mimic Mac Option/Command when remoting from Windows into macOS. It targets RustDesk and Parsec and ships prebuilt executables through GitHub Actions releases.

## Evidence
- `gh api repos/MarvNC/win-to-mac-ahk` shows `archived: false`, `default_branch: main`, `language: AutoHotkey`, `pushed_at: 2025-11-12T09:24:38Z`, and `updated_at: 2025-11-12T09:24:09Z`.
- `gh api repos/MarvNC/win-to-mac-ahk/languages` returns only `{"AutoHotkey":328}`, indicating a single-language codebase.
- `gh api repos/MarvNC/win-to-mac-ahk/git/trees/main?recursive=1` lists a minimal utility structure: `winToMacSwapOptCmd.ahk`, `README.md`, and one workflow `.github/workflows/build-ahk.yml`.
- `README.md` states the script is for swapping Win/Alt while using RustDesk or Parsec to remote into macOS.
- `winToMacSwapOptCmd.ahk` contains focused hotkeys (`LAlt::LWin`, `LWin::LAlt`, `RAlt::RWin`, `RWin::RAlt`) gated by active app checks for `rustdesk.exe` and `parsecd.exe`.
- `build-ahk.yml` builds AutoHotkey v2 x64/x86 binaries and publishes release artifacts, supporting the repo classification as a packaged end-user tool.
