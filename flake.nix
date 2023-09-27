{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        # Libraries that are mostly needed for tauri to work
        libraries = with pkgs;[
          # webkitgtk
          # gtk3
          # cairo
          # gdk-pixbuf
          # glib
          # dbus
          # openssl_3
          # librsvg
        ];

        packages = with pkgs; [
          # curl
          # wget
          # pkg-config
          # dbus
          # openssl_3
          # glib
          # gtk3
          # libsoup
          # webkitgtk
          # librsvg
          nodejs_20

          # prisma-engines
          nodePackages.pnpm
        ];
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = packages;

          # shellHook = let prisma-engines = pkgs.prisma-engines; in ''
          # 	  PATH="$PWD/node_modules/.bin:$PATH"
          #     export LD_LIBRARY_PATH=${pkgs.lib.makeLibraryPath libraries}:$LD_LIBRARY_PATH
          # '';
          # PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";
          # PRISMA_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
          # PRISMA_QUERY_ENGINE_LIBRARY = "${pkgs.prisma-engines}/lib/libquery_engine.node";
          # PRISMA_FMT_BINARY = "${pkgs.prisma-engines}/bin/prisma-fmt";
        };
      });
}
