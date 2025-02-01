/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { StateField } from "@codemirror/state";
import { EditorView, showTooltip } from "@codemirror/view";

export function tooltipField({ users }) {
    return StateField.define({
        create: () => getCursorTooltips(users),
        update(tooltips, tr) {
            if (!tr.docChanged && !tr.selection) return tooltips;
            return getCursorTooltips(users);
        },
        provide: (f) => showTooltip.computeN([f], (state) => state.field(f)),
    });
}

export function getCursorTooltips(users) {
    return users?.map((user) => {
        if (!user.typing) {
            return null;
        }
        let text = user.username;
        const pos = user.cursorPosition;

        return {
            pos,
            above: true,
            strictSide: true,
            arrow: true,
            create: () => {
                const dom = document.createElement("div");
                dom.className = "cm-tooltip-cursor";
                dom.textContent = text;
                return { dom };
            },
        };
    });
}

export const cursorTooltipBaseTheme = EditorView.baseTheme({
    ".cm-tooltip.cm-tooltip-cursor": {
        backgroundColor: "#67b",
        color: "white",
        border: "none",
        padding: "2px 7px",
        borderRadius: "4px",
        zIndex: "10",
        "& .cm-tooltip-arrow:before": {
            borderTopColor: "#66b",
        },
        "& .cm-tooltip-arrow:after": {
            borderTopColor: "transparent",
        },
    },
});

// Example usage in a component
const TooltipComponent = ({ users }) => {
    // Logic to use TooltipField and other functionalities can go here
    return (
        <div>
            {/* Render your editor or any other component that needs tooltips */}
        </div>
    );
};

export default TooltipComponent;
