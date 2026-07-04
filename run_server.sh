#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

RUBY_VERSION=$(ruby -e 'print RUBY_VERSION' 2>/dev/null || echo "0")
RUBY_MAJOR=$(echo "$RUBY_VERSION" | cut -d. -f1)

if [ "$RUBY_MAJOR" -lt 3 ]; then
  echo ""
  echo "❌ 当前 Ruby 版本: $RUBY_VERSION（需要 >= 3.0）"
  echo ""
  echo "macOS 自带 Ruby 2.6 无法运行本项目。请先安装 Ruby 3.1+："
  echo ""
  echo "  # 1. 安装 Homebrew（若尚未安装）"
  echo "  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
  echo ""
  echo "  # 2. 安装 Ruby"
  echo "  brew install ruby"
  echo ""
  echo "  # 3. 将 Homebrew Ruby 加入 PATH（Apple Silicon Mac）"
  echo "  echo 'export PATH=\"/opt/homebrew/opt/ruby/bin:\$PATH\"' >> ~/.zshrc"
  echo "  echo 'export PATH=\"\$(gem environment gemdir)/bin:\$PATH\"' >> ~/.zshrc"
  echo "  source ~/.zshrc"
  echo ""
  echo "  # 4. 回到项目目录，重新安装依赖并启动"
  echo "  cd $(pwd)"
  echo "  gem install bundler"
  echo "  bundle install"
  echo "  bash run_server.sh"
  echo ""
  echo "启动成功后浏览器打开: http://127.0.0.1:4000"
  echo ""
  echo "若不想配置本地环境，可先 push 到 GitHub，在 https://motwang.github.io 查看线上版本。"
  exit 1
fi

if ! command -v bundle >/dev/null 2>&1; then
  echo "正在安装 bundler..."
  gem install bundler
fi

if [ ! -d "vendor/bundle" ] && [ ! -f ".bundle/config" ]; then
  echo "首次运行，正在 bundle install（可能需要几分钟）..."
  bundle install
fi

echo ""
echo "✅ 启动本地服务器..."
echo "   浏览器打开: http://127.0.0.1:4000"
echo "   按 Ctrl+C 停止"
echo ""

bundle exec jekyll serve --livereload --host 127.0.0.1
