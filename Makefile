PLAYWRIGHT_VERSION := $(shell grep "@playwright/test" package.json | sed -E 's/[^:]*: *"([^"]*)".*/\1/')
export PLAYWRIGHT_VERSION

UNAME := $(shell uname -s)
ifeq ($(UNAME),Darwin)
OPEN := open
else
OPEN := xdg-open
endif

DC := docker compose
APP := $(DC) run --rm app

.DEFAULT_GOAL := help
.PHONY: help setup dev shell build preview lint typecheck test test-watch test-e2e check clean

help:
	@printf '%s\n' \
	  'make setup       check docker, build images, pull the Playwright image' \
	  'make dev         start the dev server at http://localhost:5173' \
	  'make shell       bash inside the app container' \
	  'make build       production build into dist/' \
	  'make preview     build and serve dist/ at http://localhost:4173' \
	  'make lint        oxlint' \
	  'make typecheck   tsc' \
	  'make test        vitest run' \
	  'make test-watch  vitest in watch mode' \
	  'make test-e2e    Playwright against the preview service' \
	  'make check       lint, typecheck, test, test-e2e' \
	  'make clean       stop containers, drop volumes, remove dist and reports'

setup:
	@command -v docker >/dev/null 2>&1 || { echo "docker not found on PATH" >&2; exit 1; }
	@docker compose version >/dev/null 2>&1 || { echo "docker compose plugin not found" >&2; exit 1; }
	$(DC) build
	$(DC) pull e2e

dev:
	@echo "http://localhost:5173"
	@if command -v $(OPEN) >/dev/null 2>&1; then (sleep 3; $(OPEN) http://localhost:5173 >/dev/null 2>&1) & fi
	$(DC) up app

shell:
	$(APP) bash

build:
	$(APP) npm run build

preview:
	@echo "http://localhost:4173"
	$(DC) up preview

lint:
	$(APP) npm run lint

typecheck:
	$(APP) npm run typecheck

test:
	$(APP) npm test

test-watch:
	$(APP) npm run test:watch

test-e2e:
	$(DC) run --rm e2e; status=$$?; $(DC) stop preview; exit $$status

check: lint typecheck test test-e2e

clean:
	$(APP) rm -rf dist playwright-report test-results
	$(DC) down -v --remove-orphans
