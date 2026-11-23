#!/usr/bin/env bash
# Xuất bản toàn bộ website GeGe Team lên GitHub Pages:
#   1. Build lại AION 2 nếu mã nguồn thay đổi
#   2. Commit + push trang chủ và 4 repo game
#   3. Kích hoạt workflow "Deploy site" và theo dõi kết quả
# Dùng: bash scripts/publish.sh ["thông điệp commit"]
set -uo pipefail

ROOT="/home/gege/Documents/Default Project"
NODE_BIN="/tmp/opencode/node-v20.19.0-linux-x64/bin"
COMMIT_MSG="${1:-Xuất bản tự động $(date '+%d/%m %H:%M')}"
GIT_NAME="TanHoang2002"
GIT_EMAIL="TanHoang2002@users.noreply.github.com"

cd "$ROOT" || { echo "Không tìm thấy thư mục dự án"; exit 1; }

say() { printf '\n\033[1;33m== %s\033[0m\n' "$1"; }

# ---------- 1. Build AION 2 nếu có thay đổi ----------
AION="$ROOT/games/aion-2-src"
if [ -d "$AION" ] && [ -n "$(git -C "$AION" status --porcelain)" ]; then
  say "Build AION 2"
  if [ -d "$NODE_BIN" ]; then export PATH="$NODE_BIN:$PATH"; fi
  ( cd "$AION" && npm run build ) || { echo "Build AION 2 thất bại"; exit 1; }
fi

# ---------- 2. Commit + push từng repo ----------
publish_repo() {
  local dir="$1"
  cd "$dir" || return 1
  if [ -n "$(git status --porcelain)" ]; then
    git add -A
    git -c user.name="$GIT_NAME" -c user.email="$GIT_EMAIL" \
        commit -q -m "$COMMIT_MSG" || true
  fi
  if git rev-parse --abbrev-ref --symbolic-full-name '@{u}' >/dev/null 2>&1; then
    if ! git push origin HEAD >/dev/null 2>&1; then
      git pull --rebase -q origin "$(git branch --show-current)" >/dev/null 2>&1
      git push origin HEAD >/dev/null 2>&1
    fi
  fi
  printf '  · %-28s %s\n' "$(basename "$dir")" "$(git log --oneline -1)"
}

say "Push trang chủ + 4 repo game"
publish_repo "$ROOT"
publish_repo "$ROOT/games/aion-2-src"
publish_repo "$ROOT/games/poe-1"
publish_repo "$ROOT/games/wow-forever"
publish_repo "$ROOT/games/blox-fruits"

# ---------- 3. Kích hoạt deploy ----------
cd "$ROOT"
if command -v gh >/dev/null 2>&1; then
  say "Kích hoạt Deploy site"
  gh workflow run deploy.yml --repo "$GIT_NAME/gegeteam-home" >/dev/null 2>&1 \
    && echo "  · Đã gửi yêu cầu deploy" \
    || echo "  · Không gửi được (kiểm tra 'gh auth status')"
  sleep 4
  gh run list --repo "$GIT_NAME/gegeteam-home" --workflow deploy.yml --limit 1 \
    --json databaseId,status,conclusion,createdAt,url \
    | python3 -c 'import sys,json;
d=json.load(sys.stdin)
print("  ·", d[0]["status"], d[0]["conclusion"] or "", d[0]["url"]) if d else print("  · chưa có run")' 2>/dev/null
fi

say "Xong"
