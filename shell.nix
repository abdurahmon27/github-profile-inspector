{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "github-profile-inspector-dev";
  
  buildInputs = with pkgs; [
    nodejs_20
    nodePackages.npm
    nodePackages.typescript
    nodePackages.typescript-language-server
    nodePackages.eslint
    nodePackages.prettier
  ];

  shellHook = ''
    echo "GitHub Profile Inspector Development Environment"
    echo "Node version: $(node --version)"
    echo "NPM version: $(npm --version)"
    echo ""
    echo "Available commands:"
    echo "  npm run dev     - Start development server"
    echo "  npm run build   - Build for production"
    echo "  npm run preview - Preview production build"
    echo "  npm run lint    - Run ESLint"
    echo "  npm run format  - Run Prettier"
    echo ""
    
    # Load .env file if it exists
    if [ -f .env ]; then
      export $(cat .env | grep -v '^#' | xargs)
      echo "Environment variables loaded from .env"
      echo ""
    fi
  '';
}
