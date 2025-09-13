# scripts/unload_guard.py
from modules import script_callbacks, shared

def on_ui_settings():
    section = ("unload_guard", "Unload Guard")

    shared.opts.add_option(
        "unload_guard_enabled",
        shared.OptionInfo(
            True,
            "Enable unload/close confirmation",
            section=section
        )
    )

    shared.opts.add_option(
        "unload_guard_only_when_busy",
        shared.OptionInfo(
            True,
            "Only warn when generation/queue is active",
            section=section
        )
    )

    shared.opts.add_option(
        "unload_guard_allow_forge_reload",
        shared.OptionInfo(
            True,
            "Do not warn during Forge’s own reload ('Reloading...' screen)",
            section=section
        )
    )

script_callbacks.on_ui_settings(on_ui_settings)
